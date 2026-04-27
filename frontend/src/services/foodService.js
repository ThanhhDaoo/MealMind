import api from './api'

export const foodService = {
  // Get all foods with optional filters
  getAllFoods: async (params = {}) => {
    try {
      const response = await api.get('/foods', { params })
      return response.data
    } catch (error) {
      console.error('API error:', error)
      throw error
    }
  },

  // Get featured foods for homepage
  getFeaturedFoods: async () => {
    const response = await api.get('/foods/featured')
    return response.data
  },

  // Get food by ID
  getFoodById: async (id) => {
    const response = await api.get(`/foods/${id}`)
    return response.data
  },

  // Search foods
  searchFoods: async (query) => {
    const response = await api.get(`/foods/search?q=${query}`)
    return response.data
  },

  // Get foods by category
  getFoodsByCategory: async (category) => {
    const response = await api.get(`/foods/category/${category}`)
    return response.data
  },

  // Get user's favorite foods
  getFavoriteFoods: async () => {
    const response = await api.get('/foods/favorites')
    return response.data
  },

  // Add food to favorites
  addToFavorites: async (foodId) => {
    const response = await api.post(`/foods/${foodId}/favorite`)
    return response.data
  },

  // Remove food from favorites
  removeFromFavorites: async (foodId) => {
    const response = await api.delete(`/foods/${foodId}/favorite`)
    return response.data
  },

  // Get nutrition info for food
  getNutritionInfo: async (foodId) => {
    const response = await api.get(`/foods/${foodId}/nutrition`)
    return response.data
  }
}