import api from './api'

export const authService = {
  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const { token, id, name, email: userEmail, role } = response.data
    
    const user = { id, name, email: userEmail, role }
    
    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    return user
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('authToken')
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh')
    const { token } = response.data
    localStorage.setItem('authToken', token)
    return token
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData)
    const { user } = response.data
    localStorage.setItem('user', JSON.stringify(user))
    return response.data
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword
    })
    return response.data
  }
}