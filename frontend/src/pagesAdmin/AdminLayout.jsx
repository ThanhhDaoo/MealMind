import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { adminService } from '../services/adminService'
import './AdminLayout.css'

/**
 * AdminLayout — layout dùng chung cho tất cả trang admin.
 *
 * Props:
 *   children        — nội dung chính của trang
 *   sidebarClass    — class prefix cho sidebar/main (default: "admin")
 *                     vd: "meals" → meals-sidebar, meals-main, meals-header, meals-content
 *   pageTitle       — tiêu đề trang hiển thị trong header (optional)
 *   headerRight     — JSX hiển thị bên phải header (optional, vd: nút "Thêm mới")
 *   searchValue     — giá trị search input (optional)
 *   onSearchChange  — handler khi search thay đổi (optional)
 *   searchPlaceholder — placeholder của search input
 */
const AdminLayout = ({
  children,
  sidebarClass = 'admin',
  pageTitle,
  headerRight,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Tìm kiếm...',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleLogout = async () => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất?')
    if (!confirmed) return

    try {
      setLoggingOut(true)
      await adminService.logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error during logout:', error)
      localStorage.clear()
      navigate('/login', { replace: true })
    } finally {
      setLoggingOut(false)
    }
  }

  const navItems = [
    { to: '/admin',           icon: 'dashboard',  label: 'Overview'   },
    { to: '/admin/meals',     icon: 'restaurant', label: 'Meals'      },
    { to: '/admin/users',     icon: 'group',      label: 'Users'      },
    { to: '/admin/analytics', icon: 'insights',   label: 'Analytics'  },
    { to: '/admin/settings',  icon: 'settings',   label: 'Settings'   },
  ]

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  return (
    <div className={`${sidebarClass}-management`} style={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className={`${sidebarClass}-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="material-icons">restaurant_menu</span>
          </div>
          <div className="sidebar-brand">
            <h1>MealMind</h1>
            <p>Admin Control</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-item ${isActive(to) ? 'active' : ''}`}
            >
              <span className="material-icons">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="nav-item logout"
            style={{
              background: 'none',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              cursor: loggingOut ? 'not-allowed' : 'pointer',
              opacity: loggingOut ? 0.6 : 1,
            }}
          >
            <span className="material-icons">
              {loggingOut ? 'hourglass_empty' : 'logout'}
            </span>
            <span>{loggingOut ? 'Đang đăng xuất...' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      {/* ── Main area ───────────────────────────────────────── */}
      <div className={`${sidebarClass}-main`}>

        {/* Header */}
        <header className={`${sidebarClass}-header`}>
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <span className="material-icons">menu</span>
            </button>

            {onSearchChange && (
              <div className="header-search">
                <span className="material-icons">search</span>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={onSearchChange}
                />
              </div>
            )}
          </div>

          <div className="header-actions">
            {headerRight && <>{headerRight}</>}

            <button className="icon-btn">
              <span className="material-icons">notifications</span>
            </button>
            <button className="icon-btn">
              <span className="material-icons">help</span>
            </button>

            <div className="header-divider" />

            <div className="header-profile">
              <div className="profile-info">
                <p className="profile-name">Quản trị viên</p>
                <p className="profile-role">mealmind@admin.vn</p>
              </div>
              <img
                src="https://i.pravatar.cc/150?img=68"
                alt="Admin"
                className="profile-avatar"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className={`${sidebarClass}-content`}>
          {pageTitle && (
            <div className="page-header">
              <h2>{pageTitle}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
