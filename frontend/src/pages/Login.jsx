import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './Login.css'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeTerms: false
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!')
      return
    }

    if (!isLogin && !formData.agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản dịch vụ!')
      return
    }

    setLoading(true)

    try {
      let response
      if (isLogin) {
        response = await authService.login(formData.email, formData.password)
      } else {
        response = await authService.register(formData.name, formData.email, formData.password)
      }
      
      // Redirect based on user role
      if (response && response.role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Auth error:', error)
      alert(isLogin ? 'Đăng nhập thất bại!' : 'Đăng ký thất bại!')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
  }

  const handleAppleLogin = () => {
    // TODO: Implement Apple login
  }

  return (
    <div className="login-container">
      {/* Background Decoration */}
      <div className="login-background">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
        <div className="bg-pulse"></div>
      </div>

      {/* Header */}
      <header className="login-header">
        <div className="logo-text">MealMind</div>
        <div className="help-link">
          <span className="help-icon">❓</span>
          <span>Trợ giúp</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="login-content">
          {/* Left Side: Branding */}
          <div className="branding-section">
            <div className="branding-text">
              <h1>
                Bắt đầu hành trình <br/>
                <span className="highlight-text">Dinh dưỡng AI</span>
              </h1>
              <p>
                Tham gia cùng hàng nghìn người dùng đang tối ưu hóa bữa ăn mỗi ngày 
                với công nghệ MealMind Liquid Glass.
              </p>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <span className="feature-icon">🍽️</span>
                <h3>Thực đơn cá nhân</h3>
                <p>Tự động hóa sở thích của bạn</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">⚡</span>
                <h3>Phân tích tức thì</h3>
                <p>AI thấu hiểu cơ thể bạn</p>
              </div>
            </div>

            <div className="branding-image">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600" 
                alt="Modern kitchen" 
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="form-wrapper">
            <div className="form-card">
              <div className="form-glow"></div>
              
              <div className="form-content">
                <div className="form-header">
                  <h2>{isLogin ? 'Đăng nhập tài khoản' : 'Đăng ký tài khoản'}</h2>
                  <p>Khám phá hương vị tươi mới từ MealMind</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                  {!isLogin && (
                    <div className="form-field">
                      <label>Họ tên</label>
                      <div className="input-wrapper">
                        <span className="input-icon">👤</span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={handleChange}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-field">
                    <label>Email</label>
                    <div className="input-wrapper">
                      <span className="input-icon">✉️</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Mật khẩu</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <span 
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </span>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="form-field">
                      <label>Xác nhận mật khẩu</label>
                      <div className="input-wrapper">
                        <span className="input-icon">✅</span>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required={!isLogin}
                        />
                        <span 
                          className="toggle-password"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                      </div>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="terms-checkbox">
                      <input
                        type="checkbox"
                        id="terms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                      />
                      <label htmlFor="terms">
                        Tôi đồng ý với các Điều khoản dịch vụ và Chính sách bảo mật của MealMind AI.
                      </label>
                    </div>
                  )}

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản')}
                  </button>

                  <div className="divider">
                    <span>HOẶC</span>
                  </div>

                  <div className="social-buttons">
                    <button type="button" className="social-btn" onClick={handleGoogleLogin}>
                      <img src="https://www.google.com/favicon.ico" alt="Google" />
                      <span>Google</span>
                    </button>
                    <button type="button" className="social-btn" onClick={handleAppleLogin}>
                      <span>🍎</span>
                      <span>Apple</span>
                    </button>
                  </div>
                </form>

                <div className="form-footer">
                  <p>
                    {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="switch-link"
                    >
                      {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  )
}

export default Login