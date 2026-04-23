import api from './api'

export const adminService = {
  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      // Get counts from different endpoints
      const [usersRes, foodsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/foods')
      ])
      
      return {
        totalUsers: usersRes.data.length || 0,
        totalMeals: foodsRes.data.length || 0,
        totalOrders: 0, // Placeholder
        revenue: 0 // Placeholder
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {
        totalUsers: 0,
        totalMeals: 0,
        totalOrders: 0,
        revenue: 0
      }
    }
  },

  // Users Management
  getAllUsers: async () => {
    const response = await api.get('/admin/users')
    return response.data
  },

  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`)
    return response.data
  },

  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData)
    return response.data
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData)
    return response.data
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`)
    return response.data
  },

  // Meals Management
  getAllMeals: async () => {
    const response = await api.get('/foods')
    return response.data
  },

  getMealById: async (id) => {
    const response = await api.get(`/foods/${id}`)
    return response.data
  },

  createMeal: async (mealData) => {
    const response = await api.post('/admin/foods', mealData)
    return response.data
  },

  updateMeal: async (id, mealData) => {
    const response = await api.put(`/admin/foods/${id}`, mealData)
    return response.data
  },

  deleteMeal: async (id) => {
    const response = await api.delete(`/admin/foods/${id}`)
    return response.data
  },

  // Analytics
  getAnalytics: async () => {
    try {
      const [usersRes, foodsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/foods')
      ])
      
      return {
        users: usersRes.data,
        foods: foodsRes.data,
        // Add more analytics data as needed
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return {
        users: [],
        foods: []
      }
    }
  }
}
