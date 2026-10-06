import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './BottomNav.css'

const tabs = [
  {
    path: '/',
    label: 'Tổng quan',
    icon: 'home',
    match: (p) => p === '/'
  },
  {
    path: '/foods',
    label: 'Món ăn',
    icon: 'restaurant_menu',
    match: (p) => p.startsWith('/food')
  },
  {
    path: '/meal-plan',
    label: 'Kế hoạch',
    icon: 'calendar_month',
    match: (p) => p.startsWith('/meal-plan')
  },
  {
    path: '/ai-recommendation',
    label: 'AI Gợi ý',
    icon: 'auto_awesome',
    match: (p) => p.startsWith('/ai-recommendation'),
    isHighlight: true
  },
  {
    path: '/profile',
    label: 'Cá nhân',
    icon: 'person',
    match: (p) => p === '/profile' || p === '/favorite' || p === '/login'
  }
]

const BottomNav = () => {
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        console.error(e)
      }
    }
  }, [location.pathname])

  return (
    <nav className="bottom-nav" aria-label="Bottom Navigation">
      <div className="bottom-nav-inner">
        {tabs.map((tab) => {
          const isActive = tab.match(location.pathname)

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`bottom-nav-item ${isActive ? 'active' : ''} ${tab.isHighlight ? 'highlight' : ''}`}
            >
              <div className="bottom-nav-icon-wrapper">
                <span className="material-symbols-outlined bottom-nav-icon">
                  {tab.icon}
                </span>
                {tab.isHighlight && <span className="highlight-dot" />}
              </div>
              <span className="bottom-nav-label">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
