package com.mealapp.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAiService {
    
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    @Value("${openai.api.key:}")
    private String apiKey;
    
    public OpenAiService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder
            .baseUrl("https://api.openai.com/v1")
            .build();
        this.objectMapper = objectMapper;
    }
    
    public List<Long> getRecommendedFoodIds(String ingredients, String dietaryRestrictions, 
                                            String mealType, List<Map<String, Object>> availableFoods) {
        
        if (apiKey == null || apiKey.isEmpty()) {
            // Fallback to simple logic if no API key
            return getSimpleRecommendations(ingredients, availableFoods);
        }
        
        try {
            // Build prompt for OpenAI
            String prompt = buildPrompt(ingredients, dietaryRestrictions, mealType, availableFoods);
            
            // Call OpenAI API
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-3.5-turbo");
            
            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content", "Bạn là chuyên gia dinh dưỡng và đầu bếp chuyên nghiệp. Nhiệm vụ của bạn là gợi ý món ăn phù hợp nhất dựa trên nguyên liệu và yêu cầu của người dùng. Chỉ trả về danh sách ID món ăn (tối đa 3 món) dưới dạng JSON array, ví dụ: [1, 5, 12]");
            messages.add(systemMessage);
            
            Map<String, String> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", prompt);
            messages.add(userMessage);
            
            requestBody.put("messages", messages);
            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 100);
            
            String response = webClient.post()
                .uri("/chat/completions")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
            
            // Parse response
            return parseOpenAiResponse(response);
            
        } catch (Exception e) {
            System.err.println("Error calling OpenAI API: " + e.getMessage());
            // Fallback to simple logic
            return getSimpleRecommendations(ingredients, availableFoods);
        }
    }
    
    private String buildPrompt(String ingredients, String dietaryRestrictions, 
                               String mealType, List<Map<String, Object>> availableFoods) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Người dùng có các nguyên liệu: ").append(ingredients).append("\n");
        
        if (dietaryRestrictions != null && !dietaryRestrictions.isEmpty()) {
            prompt.append("Yêu cầu đặc biệt: ").append(dietaryRestrictions).append("\n");
        }
        
        prompt.append("Chế độ ăn ưa thích: ").append(mealType).append("\n\n");
        prompt.append("Danh sách món ăn có sẵn:\n");
        
        for (Map<String, Object> food : availableFoods) {
            prompt.append("ID: ").append(food.get("id"))
                  .append(" - ").append(food.get("name"))
                  .append(" (").append(food.get("description")).append(")")
                  .append(" - Calories: ").append(food.get("calories"))
                  .append(", Thời gian: ").append(food.get("totalTime")).append(" phút")
                  .append(", Chế độ: ").append(food.get("dietType"))
                  .append("\n");
        }
        
        prompt.append("\nHãy chọn 3 món ăn phù hợp nhất và chỉ trả về danh sách ID dưới dạng JSON array. Ví dụ: [1, 5, 12]");
        
        return prompt.toString();
    }
    
    private List<Long> parseOpenAiResponse(String response) {
        List<Long> foodIds = new ArrayList<>();
        
        try {
            JsonNode root = objectMapper.readTree(response);
            String content = root.path("choices").get(0).path("message").path("content").asText();
            
            // Extract JSON array from content
            content = content.trim();
            if (content.startsWith("[") && content.endsWith("]")) {
                JsonNode idsArray = objectMapper.readTree(content);
                for (JsonNode idNode : idsArray) {
                    foodIds.add(idNode.asLong());
                }
            }
        } catch (Exception e) {
            System.err.println("Error parsing OpenAI response: " + e.getMessage());
        }
        
        return foodIds;
    }
    
    private List<Long> getSimpleRecommendations(String ingredients, List<Map<String, Object>> availableFoods) {
        List<Long> foodIds = new ArrayList<>();
        
        if (availableFoods.isEmpty()) {
            return foodIds;
        }
        
        // Simple matching based on ingredients
        String[] ingredientList = ingredients.toLowerCase().split(",");
        
        for (Map<String, Object> food : availableFoods) {
            String name = food.get("name").toString().toLowerCase();
            String desc = food.get("description") != null ? food.get("description").toString().toLowerCase() : "";
            
            for (String ingredient : ingredientList) {
                String ing = ingredient.trim();
                if (name.contains(ing) || desc.contains(ing)) {
                    foodIds.add(((Number) food.get("id")).longValue());
                    if (foodIds.size() >= 3) {
                        return foodIds;
                    }
                    break;
                }
            }
        }
        
        // If not enough matches, add random foods
        while (foodIds.size() < 3 && foodIds.size() < availableFoods.size()) {
            Map<String, Object> food = availableFoods.get(foodIds.size());
            Long id = ((Number) food.get("id")).longValue();
            if (!foodIds.contains(id)) {
                foodIds.add(id);
            }
        }
        
        return foodIds;
    }
}
