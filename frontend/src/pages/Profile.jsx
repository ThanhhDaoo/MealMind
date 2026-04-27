import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setFormData({
          name: parsedUser.name || '',
          email: parsedUser.email || '',
          phone: parsedUser.phone || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } catch (error) {
        console.error('Error parsing user data:', error)
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    // Validation
    if (!formData.name || formData.name.trim() === '') {
      setMessage({ type: 'error', text: 'Vui lòng nhập họ và tên!' })
      setLoading(false)
      return
    }

    if (!formData.email || formData.email.trim() === '') {
      setMessage({ type: 'error', text: 'Vui lòng nhập email!' })
      setLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Email không hợp lệ!' })
      setLoading(false)
      return
    }

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone && formData.phone.trim() !== '') {
      const phoneRegex = /^[0-9]{10,11}$/
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        setMessage({ type: 'error', text: 'Số điện thoại phải có 10-11 chữ số!' })
        setLoading(false)
        return
      }
    }

    try {
      const response = await authService.updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      })
      
      // Update user in state and localStorage
      const updatedUser = response.user || response
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      setIsEditing(false)
      setMessage({ type: 'success', text: '✓ Cập nhật thông tin thành công!' })
      
      // Auto hide success message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra. Vui lòng thử lại!'
      setMessage({ type: 'error', text: '✗ ' + errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    // Validation
    if (!formData.currentPassword || formData.currentPassword.trim() === '') {
      setMessage({ type: 'error', text: '✗ Vui lòng nhập mật khẩu hiện tại!' })
      setLoading(false)
      return
    }

    if (!formData.newPassword || formData.newPassword.trim() === '') {
      setMessage({ type: 'error', text: '✗ Vui lòng nhập mật khẩu mới!' })
      setLoading(false)
      return
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: '✗ Mật khẩu mới phải có ít nhất 6 ký tự!' })
      setLoading(false)
      return
    }

    if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
      setMessage({ type: 'error', text: '✗ Vui lòng xác nhận mật khẩu mới!' })
      setLoading(false)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: '✗ Mật khẩu xác nhận không khớp!' })
      setLoading(false)
      return
    }

    if (formData.currentPassword === formData.newPassword) {
      setMessage({ type: 'error', text: '✗ Mật khẩu mới phải khác mật khẩu hiện tại!' })
      setLoading(false)
      return
    }

    try {
      await authService.changePassword(formData.currentPassword, formData.newPassword)
      
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }))
      setMessage({ type: 'success', text: '✓ Đổi mật khẩu thành công!' })
      
      // Auto hide success message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, 3000)
    } catch (error) {
      console.error('Error changing password:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra. Vui lòng thử lại!'
      setMessage({ type: 'error', text: '✗ ' + errorMessage })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Thông tin cá nhân</h1>
        <p>Quản lý thông tin tài khoản của bạn</p>
      </div>

      {message.text && (
        <div className={`message-banner ${message.type}`}>
          <span className="message-icon">
            {message.type === 'success' ? '✓' : '⚠'}
          </span>
          {message.text}
        </div>
      )}

      <div className="profile-content">
        {/* Profile Info Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Thông tin tài khoản</h2>
            {!isEditing && (
              <button 
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                <span className="icon">✏️</span>
                Chỉnh sửa
              </button>
            )}
          </div>

          <form onSubmit={handleUpdateProfile}>
            <div className="profile-avatar-section">
              <div className="profile-avatar-large">
                <span className="avatar-icon">👤</span>
              </div>
              <div className="avatar-info">
                <h3>{user.name || 'User'}</h3>
                <p className="user-role">{user.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}</p>
              </div>
            </div>

            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Nhập họ và tên"
                required
                minLength={2}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Nhập email"
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Nhập số điện thoại (10-11 số)"
                pattern="[0-9]{10,11}"
              />
            </div>

            {isEditing && (
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData({
                      ...formData,
                      name: user.name || '',
                      email: user.email || '',
                      phone: user.phone || ''
                    })
                  }}
                  disabled={loading}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="btn-save"
                  disabled={loading}
                >
                  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Change Password Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Đổi mật khẩu</h2>
          </div>

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Mật khẩu hiện tại</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu hiện tại"
                required
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label>Xác nhận mật khẩu mới</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu mới"
                required
                minLength={6}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-save"
                disabled={loading || !formData.currentPassword || !formData.newPassword}
              >
                {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
