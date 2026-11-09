import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { isValidEmail, isStrongPassword, PASSWORD_REQUIREMENTS_MESSAGE } from '../utils/validation'
import './Login.css'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const name = formData.name.trim()
    const email = formData.email.trim()
    const password = formData.password
    const confirmPassword = formData.confirmPassword

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ tất cả thông tin')
      return
    }

    if (name.length < 2) {
      setError('Họ và tên phải có ít nhất 2 ký tự')
      return
    }

    if (!isValidEmail(email)) {
      setError('Định dạng email không hợp lệ')
      return
    }

    if (!isStrongPassword(password)) {
      setError(PASSWORD_REQUIREMENTS_MESSAGE)
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    try {
      setLoading(true)
      const response = await authService.register({
        name,
        email,
        password
      })

      if (response?.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        navigate('/')
      } else {
        // Fallback login if token not returned directly in register response
        await authService.login(email, password)
        navigate('/')
      }
    } catch (err) {
      console.error('Registration error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container register-page">
      <div className="login-left">
        <div className="login-content">
          <header className="login-header">
            <button 
              type="button" 
              className="login-back-btn" 
              onClick={handleBack}
              aria-label="Quay lại"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="back-text">Quay lại</span>
            </button>

            <Link to="/" className="logo">
              <span className="logo-icon">🍜</span>
              <span className="logo-text">MealMind</span>
            </Link>

            <Link to="/" className="close-btn" aria-label="Đóng" title="Về trang chủ">
              <span className="material-symbols-outlined">close</span>
            </Link>
          </header>

          <main className="login-form-section">
            <h1>Tạo tài khoản mới</h1>
            <p className="login-subtitle">
              Tham gia cộng đồng MealMind để khám phá thế giới ẩm thực thông minh
            </p>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên của bạn"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(prev => !prev)}
                    tabIndex="-1"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                <small className="form-helper-text">
                  Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    tabIndex="-1"
                    aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    <span className="material-symbols-outlined">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={loading}
              >
                {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
              </button>
            </form>

            <div className="login-divider">
              <span>hoặc</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-btn google">
                <span className="social-icon">🌐</span>
                Đăng ký với Google
              </button>
              <button type="button" className="social-btn apple">
                <span className="social-icon">🍎</span>
                Đăng ký với Apple
              </button>
            </div>

            <p className="login-footer">
              Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </main>
        </div>
      </div>

      <div className="login-right">
        <div className="hero-content">
          <h2>Bắt đầu hành trình ẩm thực của bạn</h2>
          <p>Tham gia cùng hàng nghìn người dùng đang tối ưu hóa bữa ăn với AI</p>
          
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <div>
                <h4>Gợi ý thông minh</h4>
                <p>AI phân tích sở thích và đề xuất món ăn phù hợp</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <div>
                <h4>Lập kế hoạch tuần</h4>
                <p>Quản lý thực đơn cả tuần, tiết kiệm thời gian</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛒</span>
              <div>
                <h4>Danh sách mua sắm</h4>
                <p>Tự động tạo list nguyên liệu cần thiết</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
