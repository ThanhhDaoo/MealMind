import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const navItems = [
  { path: '/', label: 'Tổng quan' },
  { path: '/foods', label: 'Món ăn' },
  { path: '/meal-plan', label: 'Kế hoạch' },
  { path: '/ai-recommendation', label: 'AI Gợi ý' }
]

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
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
  }, [location.pathname])

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

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

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
        {/* Brand Logo */}
        <Link to="/" className="nav-logo">
          <span aria-hidden="true">🍜</span>
          <span>MealMind</span>
        </Link>

        {/* Desktop Navigation Tabs */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Actions (Desktop CTA + User Profile) */}
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
                <span className="user-initial">
                  {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                </span>
              </button>
              
              {userMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="user-dropdown-header">
                    <div className="user-avatar">
                      {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
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
              <span className="material-icons">person</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar