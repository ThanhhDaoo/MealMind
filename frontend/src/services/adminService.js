import api from './api'

export const adminService = {
  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      // Get stats from backend endpoint
      const response = await api.get('/admin/stats')
      
      return {
        totalUsers: response.data.totalUsers || 0,
        totalMeals: response.data.totalFoods || 0,
        totalOrders: response.data.totalOrders || 0,
        totalMealPlans: response.data.totalMealPlans || 0
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {
        totalUsers: 0,
        totalMeals: 0,
        totalOrders: 0,
        totalMealPlans: 0
      }
    }
  },

  // Auth Management
  logout: async () => {
    try {
      // Call logout API if available
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Error during logout API call:', error)
      // Continue with local logout even if API fails
    } finally {
      // Always clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('refreshToken')
      
      // Clear any other admin-specific data
      localStorage.removeItem('adminPreferences')
      localStorage.removeItem('adminSession')
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

  // Meal Plans Management
  getUserMealPlans: async (userId) => {
    try {
      const response = await api.get('/admin/meal-plans')
      // Filter meal plans by userId
      const allPlans = response.data
      return allPlans.filter(plan => plan.user && plan.user.id === userId)
    } catch (error) {
      console.error('Error fetching user meal plans:', error)
      return []
    }
  },

  getAllMealPlans: async () => {
    const response = await api.get('/admin/meal-plans')
    return response.data
  },

  // Analytics
  getAnalytics: async () => {
    try {
      const [usersRes, foodsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/foods')
      ])
      
      const users = usersRes.data
      const foods = foodsRes.data
      
      // Calculate category percentages from real food data
      const categoryCount = {}
      const totalFoods = foods.length
      
      foods.forEach(food => {
        const category = food.category || food.dietType || 'Khác'
        categoryCount[category] = (categoryCount[category] || 0) + 1
      })
      
      const categories = Object.entries(categoryCount)
        .map(([name, count]) => ({
          name: name,
          percentage: Math.round((count / totalFoods) * 100)
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 4) // Top 4 categories
      
      // Calculate user growth by month (last 12 months)
      const userGrowth = []
      const now = new Date()
      
      for (let i = 11; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthName = `T${monthDate.getMonth() + 1}`
        
        // Count users created before or in this month
        const usersInMonth = users.filter(user => {
          if (!user.createdAt) return false
          const userDate = new Date(user.createdAt)
          return userDate <= new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)
        }).length
        
        userGrowth.push({
          month: monthName,
          count: usersInMonth
        })
      }
      
      return {
        users: users,
        foods: foods,
        categories: categories,
        userGrowth: userGrowth
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return {
        users: [],
        foods: [],
        categories: [],
        userGrowth: []
      }
    }
  }
}
