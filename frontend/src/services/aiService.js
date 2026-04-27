import api from './api'

export const aiService = {
  // Get AI recommendations based on ingredients and preferences
  getRecommendations: async (ingredients, dietaryRestrictions, mealType) => {
    try {
      const response = await api.post('/ai/recommendations', {
        ingredients,
        dietaryRestrictions,
        mealType
      })
      return response.data
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      throw error
    }
  }
}
