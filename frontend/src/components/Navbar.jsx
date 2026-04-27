import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const userMenuRef = useRef(null)

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUserMenuOpen(false)
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍜 MealMind
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tổng quan
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/foods" 
              className={`nav-link ${isActive('/foods') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Món ăn
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/meal-plan" 
              className={`nav-link ${isActive('/meal-plan') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kế hoạch 
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/ai-recommendation" 
              className={`nav-link ${isActive('/ai-recommendation') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Gợi ý
            </Link>
          </li>
        </ul>
        
        <div className="nav-actions">
          <Link to="/ai-recommendation" className="cta-primary">
            Gợi ý ngay
          </Link>
          
          {user ? (
            <div className="user-menu-wrapper" ref={userMenuRef}>
              <button 
                className="user-icon-button" 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                title={user.name || user.email}
              >
                <span className="user-icon">👤</span>
              </button>
              
              {userMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <div className="user-avatar">👤</div>
                    <div className="user-info">
                      <p className="user-name">{user.name || 'User'}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                  <div className="user-dropdown-divider"></div>
                  <Link 
                    to="/profile" 
                    className="user-dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <span className="dropdown-icon">👤</span>
                    Thông tin cá nhân
                  </Link>
                  <Link 
                    to="/favorite" 
                    className="user-dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <span className="dropdown-icon">❤️</span>
                    Món ăn yêu thích
                  </Link>
                  <Link 
                    to="/meal-plan" 
                    className="user-dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <span className="dropdown-icon">📅</span>
                    Kế hoạch của tôi
                  </Link>
                  <div className="user-dropdown-divider"></div>
                  <button 
                    className="user-dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <span className="dropdown-icon">🚪</span>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="user-icon-link" title="Đăng nhập">
              <span className="user-icon">👤</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar