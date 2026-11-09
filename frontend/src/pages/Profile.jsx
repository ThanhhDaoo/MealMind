import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/authService'
import { isValidEmail, isValidPhone, isStrongPassword, PASSWORD_REQUIREMENTS_MESSAGE } from '../utils/validation'
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const timerRef = useRef(null)

  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  })

  // Display notification with auto-hide and cleanup
  const showNotification = (type, text, duration = 3000) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setMessage({ type, text })
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        setMessage({ type: '', text: '' })
      }, duration)
    }
  }

  // Cleanup notification timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Sync profile data on mount
  useEffect(() => {
    // 1. Initial render from cached user
    const cachedUser = authService.getCurrentUser()
    if (cachedUser) {
      setUser(cachedUser)
      setProfileForm({
        name: cachedUser.name || '',
        email: cachedUser.email || '',
        phone: cachedUser.phone || ''
      })
    }

    // 2. Fetch fresh user profile from server
    if (authService.isAuthenticated()) {
      authService.getProfile()
        .then(freshUser => {
          if (freshUser) {
            setUser(freshUser)
            setProfileForm({
              name: freshUser.name || '',
              email: freshUser.email || '',
              phone: freshUser.phone || ''
            })
          }
        })
        .catch(error => {
          console.error('Failed to sync profile from server:', error)
        })
        .finally(() => {
          setCheckingAuth(false)
        })
    } else {
      setCheckingAuth(false)
    }
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    const name = profileForm.name.trim()
    const email = profileForm.email.trim()
    const phone = profileForm.phone.trim()

    // Validation
    if (!name) {
      showNotification('error', 'Vui lòng nhập họ và tên!', 4000)
      return
    }

    if (!isValidEmail(email)) {
      showNotification('error', 'Định dạng email không hợp lệ!', 4000)
      return
    }

    if (!isValidPhone(phone)) {
      showNotification('error', 'Số điện thoại phải có 10-11 chữ số!', 4000)
      return
    }

    try {
      setLoading(true)
      const updatedUser = await authService.updateProfile({ name, email, phone })
      setUser(updatedUser)
      setIsEditing(false)
      showNotification('success', '✓ Cập nhật thông tin thành công!')
    } catch (error) {
      console.error('Error updating profile:', error)
      const errorText = error.response?.data?.message || error.message || 'Có lỗi xảy ra. Vui lòng thử lại!'
      showNotification('error', '✗ ' + errorText, 5000)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    const { currentPassword, newPassword, confirmPassword } = passwordForm

    if (!currentPassword) {
      showNotification('error', '✗ Vui lòng nhập mật khẩu hiện tại!', 4000)
      return
    }

    if (!isStrongPassword(newPassword)) {
      showNotification('error', `✗ ${PASSWORD_REQUIREMENTS_MESSAGE}`, 5000)
      return
    }

    if (newPassword !== confirmPassword) {
      showNotification('error', '✗ Mật khẩu xác nhận không khớp!', 4000)
      return
    }

    if (currentPassword === newPassword) {
      showNotification('error', '✗ Mật khẩu mới phải khác mật khẩu hiện tại!', 4000)
      return
    }

    try {
      setLoading(true)
      await authService.changePassword(currentPassword, newPassword)
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      showNotification('success', '✓ Đổi mật khẩu thành công!')
    } catch (error) {
      console.error('Error changing password:', error)
      const errorText = error.response?.data?.message || error.message || 'Có lỗi xảy ra. Vui lòng thử lại!'
      showNotification('error', '✗ ' + errorText, 5000)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi tài khoản MealMind?')) {
      authService.logout()
      navigate('/login')
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setProfileForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    })
  }

  if (checkingAuth) {
    return (
      <div className="profile-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải thông tin...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="profile-container guest-profile-container">
        <div className="guest-profile-card">
          <div className="guest-avatar-wrap">
            <span className="material-symbols-outlined guest-avatar-icon">person</span>
          </div>

          <h1 className="guest-title">Chào mừng đến với MealMind</h1>
          <p className="guest-desc">
            Đăng nhập để lưu món ăn yêu thích, lên kế hoạch thực đơn dinh dưỡng và mở khóa toàn bộ tính năng gợi ý thông minh từ AI.
          </p>

          <div className="guest-actions">
            <Link to="/login" className="btn btn-primary btn-lg guest-btn">
              <span className="material-symbols-outlined">login</span>
              Đăng nhập tài khoản
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg guest-btn">
              <span className="material-symbols-outlined">person_add</span>
              Tạo tài khoản mới
            </Link>
          </div>

          <div className="guest-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🥗</span>
              <div className="benefit-text">
                <h4>Quản lý thực đơn</h4>
                <p>Lưu trữ và theo dõi các bữa ăn khoa học mỗi ngày</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📊</span>
              <div className="benefit-text">
                <h4>Chỉ số dinh dưỡng</h4>
                <p>Tự động tính toán Calories, Protein & Carbs</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✨</span>
              <div className="benefit-text">
                <h4>Trợ lý AI 24/7</h4>
                <p>Đề xuất món ngon tức thì theo nguyên liệu có sẵn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-header-info">
          <h1>Thông tin cá nhân</h1>
          <p>Quản lý thông tin tài khoản và bảo mật của bạn</p>
        </div>
        <button 
          type="button" 
          className="btn-logout" 
          onClick={handleLogout}
          title="Đăng xuất khỏi tài khoản"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Đăng xuất</span>
        </button>
      </header>

      {message.text && (
        <div className={`message-banner ${message.type}`} role="status">
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
                type="button"
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
                <span className="avatar-initial">
                  {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="avatar-info">
                <h3>{user.name || 'User'}</h3>
                <div className="avatar-meta">
                  <span className="user-role">{user.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}</span>
                  {user.createdAt && (
                    <span className="user-join-date">
                      <span className="material-symbols-outlined join-icon">calendar_today</span>
                      Tham gia {new Date(user.createdAt).toLocaleDateString('vi-VN', { month: '2-digit', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="profile-name">Họ và tên</label>
              <input
                type="text"
                id="profile-name"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                disabled={!isEditing}
                placeholder="Nhập họ và tên"
                autoComplete="name"
                required
                minLength={2}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-email">Email</label>
              <input
                type="email"
                id="profile-email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                disabled={!isEditing}
                placeholder="Nhập email"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-phone">Số điện thoại</label>
              <input
                type="tel"
                id="profile-phone"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                disabled={!isEditing}
                placeholder="Nhập số điện thoại (10-11 số)"
                autoComplete="tel"
                pattern="[0-9]{10,11}"
              />
            </div>

            {isEditing && (
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={handleCancelEdit}
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
              <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu hiện tại"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                  tabIndex="-1"
                  aria-label={showPassword.current ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <span className="material-symbols-outlined">
                    {showPassword.current ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                  autoComplete="new-password"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                  tabIndex="-1"
                  aria-label={showPassword.new ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <span className="material-symbols-outlined">
                    {showPassword.new ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              <small className="form-helper-text">
                Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập lại mật khẩu mới"
                  autoComplete="new-password"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                  tabIndex="-1"
                  aria-label={showPassword.confirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <span className="material-symbols-outlined">
                    {showPassword.confirm ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-save"
                disabled={loading || !passwordForm.currentPassword || !passwordForm.newPassword}
              >
                {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </button>
            </div>
          </form>
        </div>

        {/* Quick Shortcuts Card */}
        <div className="profile-card profile-shortcuts-card">
          <div className="card-header">
            <h2>Lối tắt nhanh</h2>
          </div>
          <div className="profile-shortcuts-list">
            <Link to="/favorite" className="profile-shortcut-item">
              <div className="shortcut-icon-wrap favorite">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <div className="shortcut-text">
                <span className="shortcut-title">Món ăn yêu thích</span>
                <span className="shortcut-desc">Xem các món ăn bạn đã lưu lại</span>
              </div>
              <span className="material-symbols-outlined shortcut-arrow">chevron_right</span>
            </Link>

            <Link to="/meal-plan" className="profile-shortcut-item">
              <div className="shortcut-icon-wrap plan">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
              <div className="shortcut-text">
                <span className="shortcut-title">Kế hoạch bữa ăn</span>
                <span className="shortcut-desc">Theo dõi thực đơn tuần của bạn</span>
              </div>
              <span className="material-symbols-outlined shortcut-arrow">chevron_right</span>
            </Link>

            <Link to="/ai-recommendation" className="profile-shortcut-item">
              <div className="shortcut-icon-wrap ai">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div className="shortcut-text">
                <span className="shortcut-title">Gợi ý thông minh AI</span>
                <span className="shortcut-desc">Đề xuất món ngon theo nguyên liệu</span>
              </div>
              <span className="material-symbols-outlined shortcut-arrow">chevron_right</span>
            </Link>

            {user.role === 'ADMIN' && (
              <Link to="/admin" className="profile-shortcut-item admin">
                <div className="shortcut-icon-wrap admin">
                  <span className="material-symbols-outlined">admin_panel_settings</span>
                </div>
                <div className="shortcut-text">
                  <span className="shortcut-title">Trang quản trị</span>
                  <span className="shortcut-desc">Quản lý món ăn, người dùng và hệ thống</span>
                </div>
                <span className="material-symbols-outlined shortcut-arrow">chevron_right</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
