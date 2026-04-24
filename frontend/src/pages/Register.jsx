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

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
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
    <div className="login-container">
      <div className="login-left">
        <div className="login-content">
          <div className="login-header">
            <Link to="/" className="back-to-home">
              ← Về trang chủ
            </Link>
            <div className="logo">
              <span className="logo-icon">🍜</span>
              <span className="logo-text">MealMind</span>
            </div>
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
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  required
                />
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