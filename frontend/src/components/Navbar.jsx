import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

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
        
        <Link to="/" className="cta-primary">
          Gợi ý ngay
        </Link>
      </div>
    </nav>
  )
}

export default Navbar