import api from './api'

export const aiService = {
  // 1. Gợi ý món ăn theo nguyên liệu & chế độ ăn
  getRecommendations: async (ingredients, dietaryRestrictions, mealType) => {
    try {
      const response = await api.post('/ai/recommendations', {
        ingredients,
        dietaryRestrictions,
        mealType,
      })
      return response.data
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      throw error
    }
  },

  // 2. Gợi ý món ăn theo user & loại bữa
  getFoodRecommendations: async (userId, mealType = 'BREAKFAST') => {
    try {
      const response = await api.get(`/ai/food-recommendations/${userId}`, {
        params: { mealType },
      })
      return response.data
    } catch (error) {
      console.error('Error getting food recommendations:', error)
      throw error
    }
  },

  // 3. Phân tích dinh dưỡng của một meal plan
  analyzeNutrition: async (mealPlanId) => {
    try {
      const response = await api.get(`/ai/analyze-nutrition/${mealPlanId}`)
      return response.data
    } catch (error) {
      console.error('Error analyzing nutrition:', error)
      throw error
    }
  },

  // 4. Tạo meal plan tự động bằng AI
  generateMealPlan: async (userId, { weekStartDate, caloriesPerDay, dietaryPreferences }) => {
    try {
      const response = await api.post(`/ai/generate-meal-plan/${userId}`, {
        weekStartDate,
        caloriesPerDay,
        dietaryPreferences,
      })
      return response.data
    } catch (error) {
      console.error('Error generating meal plan:', error)
      throw error
    }
  },

  // 5. Lấy gợi ý meal plan theo sở thích (trả về map day → food IDs)
  getMealPlanRecommendations: async (dietaryPreferences = [], days = 7) => {
    try {
      const response = await api.post('/ai/meal-plan-recommendations', {
        dietaryPreferences,
        days,
      })
      return response.data
    } catch (error) {
      console.error('Error getting meal plan recommendations:', error)
      throw error
    }
  },
}
