import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './Login.css'

const Register = () => {
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
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
    if (!passwordRegex.test(formData.password)) {
      setError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt (!@#$%^&*...)')
      return
    }

    try {
      setLoading(true)
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('authToken', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        navigate('/')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container register-page">
      <div className="login-left">
        <div className="login-content">
          <div className="login-header">
            <button 
              type="button" 
              className="login-back-btn" 
              onClick={() => {
                if (window.history.state && window.history.state.idx > 0) {
                  navigate(-1)
                } else {
                  navigate('/')
                }
              }}
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
          </div>

          <div className="login-form-section">
            <h1>Tạo tài khoản mới</h1>
            <p className="login-subtitle">
              Tham gia cộng đồng MealMind để khám phá thế giới ẩm thực
            </p>

            {error && (
              <div className="error-message">
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
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
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
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              <button className="social-btn google">
                <span className="social-icon">🌐</span>
                Đăng ký với Google
              </button>
              <button className="social-btn apple">
                <span className="social-icon">🍎</span>
                Đăng ký với Apple
              </button>
            </div>

            <p className="login-footer">
              Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
            </p>
          </div>
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