import api from './api'

export const mealPlanService = {
  // Get meal plans by date
  getMealPlansByDate: async (date) => {
    const response = await api.get(`/meal-plans?date=${date}`)
    return response.data
  },

  // Get meal plan by ID
  getMealPlanById: async (id) => {
    const response = await api.get(`/meal-plans/${id}`)
    return response.data
  },

  // Generate new meal plan with AI
  generateMealPlan: async (preferences) => {
    const response = await api.post('/meal-plans/generate', preferences)
    return response.data
  },

  // Create custom meal plan
  createMealPlan: async (mealPlanData) => {
    const response = await api.post('/meal-plans', mealPlanData)
    return response.data
  },

  // Update meal plan
  updateMealPlan: async (id, mealPlanData) => {
    const response = await api.put(`/meal-plans/${id}`, mealPlanData)
    return response.data
  },

  // Delete meal plan
  deleteMealPlan: async (id) => {
    const response = await api.delete(`/meal-plans/${id}`)
    return response.data
  },

  // Get user's meal plan history
  getMealPlanHistory: async (page = 0, size = 10) => {
    const response = await api.get(`/meal-plans/history?page=${page}&size=${size}`)
    return response.data
  },

  // Add food to meal plan
  addFoodToMealPlan: async (mealPlanId, mealType, foodId, dayOfWeek) => {
    const response = await api.post(`/meal-plans/${mealPlanId}/meals`, {
      mealType,
      foodId,
      dayOfWeek
    })
    return response.data
  },

  // Remove food from meal plan
  removeFoodFromMealPlan: async (mealPlanId, mealItemId) => {
    const response = await api.delete(`/meal-plans/${mealPlanId}/meals/${mealItemId}`)
    return response.data
  }
}