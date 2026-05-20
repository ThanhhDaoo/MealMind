package com.mealapp.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Google Gemini AI Service (Free Tier)
 * Uses Gemini 2.0 Flash model via REST API.
 * Get your free API key at: https://aistudio.google.com/apikey
 */
@Service
public class GeminiService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key:}")
    private String apiKey;

    public GeminiService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder
                .baseUrl("https://generativelanguage.googleapis.com/v1beta")
                .build();
        this.objectMapper = objectMapper;
    }

    public boolean isAvailable() {
        return apiKey != null && !apiKey.isEmpty() && !apiKey.startsWith("your-");
    }

    /**
     * Get food recommendations using Gemini AI.
     * Returns list of recommended food IDs from the available foods.
     */
    public List<Long> getRecommendedFoodIds(String ingredients, String dietaryRestrictions,
                                            String mealType, List<Map<String, Object>> availableFoods) {
        if (!isAvailable()) {
            return new ArrayList<>();
        }

        try {
            String prompt = buildRecommendationPrompt(ingredients, dietaryRestrictions, mealType, availableFoods);
            String response = callGemini(prompt);
            return parseFoodIds(response);
        } catch (Exception e) {
            System.err.println("Gemini API error: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Get nutrition advice for a meal plan.
     */
    public String getNutritionAdvice(String mealPlanSummary) {
        if (!isAvailable()) {
            return null;
        }

        try {
            String prompt = "Bạn là chuyên gia dinh dưỡng Việt Nam. Phân tích kế hoạch ăn sau và đưa ra 1-2 lời khuyên ngắn gọn (tối đa 100 từ) bằng tiếng Việt:\n\n" + mealPlanSummary;
            return callGemini(prompt);
        } catch (Exception e) {
            System.err.println("Gemini nutrition advice error: " + e.getMessage());
            return null;
        }
    }

    /**
     * Chat with AI about food/nutrition.
     */
    public String chat(String userMessage, String context) {
        if (!isAvailable()) {
            return "AI chưa được cấu hình. Vui lòng thêm GEMINI_API_KEY vào file .env";
        }

        try {
            String systemPrompt = "Bạn là trợ lý dinh dưỡng AI của MealMind. " +
                    "Trả lời ngắn gọn, hữu ích bằng tiếng Việt. " +
                    "Chỉ tư vấn về ẩm thực, dinh dưỡng, nấu ăn. " +
                    "Nếu câu hỏi không liên quan đến ẩm thực, từ chối lịch sự.";

            String fullPrompt = systemPrompt + "\n\n";
            if (context != null && !context.isEmpty()) {
                fullPrompt += "Ngữ cảnh: " + context + "\n\n";
            }
            fullPrompt += "Người dùng: " + userMessage;

            String reply = callGemini(fullPrompt);
            if (reply == null || reply.isBlank()) {
                return "Xin lỗi, tôi đang quá tải. Vui lòng thử lại sau 1 phút nhé! 🙏";
            }
            return reply;
        } catch (Exception e) {
            System.err.println("Gemini chat error: " + e.getMessage());
            return "Xin lỗi, tôi đang bận. Vui lòng thử lại sau ít phút. 🙏";
        }
    }

    // ─── Private helpers ─────────────────────────────────────────────────────────

    private String callGemini(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();

        // Build content structure
        List<Map<String, Object>> contents = new ArrayList<>();
        Map<String, Object> content = new HashMap<>();
        List<Map<String, String>> parts = new ArrayList<>();
        parts.add(Map.of("text", prompt));
        content.put("parts", parts);
        contents.add(content);
        requestBody.put("contents", contents);

        // Generation config
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("maxOutputTokens", 500);
        requestBody.put("generationConfig", generationConfig);

        // Try gemini-2.0-flash first, fallback to gemini-2.0-flash-lite on rate limit
        String[] models = {"gemini-2.0-flash", "gemini-2.0-flash-lite"};
        
        for (String model : models) {
            try {
                String response = webClient.post()
                        .uri("/models/" + model + ":generateContent?key=" + apiKey)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(String.class)
                        .block();

                String text = extractTextFromResponse(response);
                if (text != null && !text.isEmpty()) {
                    return text;
                }
            } catch (Exception e) {
                System.err.println("Gemini model " + model + " error: " + e.getMessage());
                // Try next model
            }
        }

        return "";
    }

    private String extractTextFromResponse(String response) {
        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode candidates = root.path("candidates");
            if (candidates.isArray() && candidates.size() > 0) {
                JsonNode parts = candidates.get(0).path("content").path("parts");
                if (parts.isArray() && parts.size() > 0) {
                    return parts.get(0).path("text").asText();
                }
            }
            return "";
        } catch (Exception e) {
            System.err.println("Error parsing Gemini response: " + e.getMessage());
            return "";
        }
    }

    private String buildRecommendationPrompt(String ingredients, String dietaryRestrictions,
                                             String mealType, List<Map<String, Object>> availableFoods) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Bạn là chuyên gia dinh dưỡng và đầu bếp chuyên nghiệp Việt Nam.\n\n");
        prompt.append("Người dùng có các nguyên liệu: ").append(ingredients).append("\n");

        if (dietaryRestrictions != null && !dietaryRestrictions.isEmpty()) {
            prompt.append("Yêu cầu đặc biệt: ").append(dietaryRestrictions).append("\n");
        }

        if (mealType != null && !mealType.isEmpty()) {
            prompt.append("Chế độ ăn: ").append(mealType).append("\n");
        }

        prompt.append("\nDanh sách món ăn có sẵn trong hệ thống:\n");
        for (Map<String, Object> food : availableFoods) {
            prompt.append("- ID:").append(food.get("id"))
                    .append(" | ").append(food.get("name"))
                    .append(" | Calories:").append(food.get("calories"))
                    .append(" | Thời gian:").append(food.get("totalTime")).append("phút")
                    .append(" | Chế độ:").append(food.get("dietType"))
                    .append("\n");
        }

        prompt.append("\nHãy chọn tối đa 3 món ăn PHÙ HỢP NHẤT với nguyên liệu và yêu cầu trên.");
        prompt.append("\nCHỈ trả về JSON array chứa ID các món, ví dụ: [1, 5, 12]");
        prompt.append("\nKHÔNG giải thích, KHÔNG thêm text khác. Chỉ JSON array.");

        return prompt.toString();
    }

    private List<Long> parseFoodIds(String response) {
        List<Long> ids = new ArrayList<>();
        if (response == null || response.isEmpty()) {
            return ids;
        }

        try {
            // Extract JSON array from response (might have extra text)
            String cleaned = response.trim();
            int start = cleaned.indexOf('[');
            int end = cleaned.lastIndexOf(']');

            if (start >= 0 && end > start) {
                String jsonArray = cleaned.substring(start, end + 1);
                JsonNode array = objectMapper.readTree(jsonArray);
                if (array.isArray()) {
                    for (JsonNode node : array) {
                        ids.add(node.asLong());
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error parsing food IDs from Gemini: " + e.getMessage());
        }

        return ids;
    }
}
