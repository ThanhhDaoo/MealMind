import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminService } from '../services/adminService'
import UserModal from './UserModal'
import './AdminLayout.css'
import './UsersManagement.css'

const UsersManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await adminService.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleSaveUser = async (userData) => {
    try {
      if (selectedUser) {
        // Update existing user
        await adminService.updateUser(selectedUser.id, userData)
      } else {
        // Create new user
        await adminService.createUser(userData)
      }
      fetchUsers() // Refresh list
    } catch (error) {
      console.error('Error saving user:', error)
      throw error // Re-throw to let modal handle the error
    }
  }

  const handleDeleteUser = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      try {
        await adminService.deleteUser(id)
        fetchUsers() // Refresh list
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Không thể xóa người dùng!')
      }
    }
  }

  const handleLogout = async () => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất?')
    if (!confirmed) return

    try {
      setLoggingOut(true)
      await adminService.logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error during logout:', error)
      // Force logout even if there's an error
      localStorage.clear()
      navigate('/login', { replace: true })
    } finally {
      setLoggingOut(false)
    }
  }

  const stats = [
    {
      label: 'Tổng người dùng',
      value: users.length.toString(),
      badge: '+12%',
      badgeColor: 'green',
      borderColor: 'green'
    },
    {
      label: 'Đang hoạt động',
      value: users.filter(u => u.status === 'ACTIVE').length.toString(),
      subtext: users.length > 0 ? `~${Math.round((users.filter(u => u.status === 'ACTIVE').length / users.length) * 100)}%` : '0%',
      borderColor: 'blue'
    },
    {
      label: 'Admin',
      value: users.filter(u => u.role === 'ADMIN').length.toString(),
      badge: 'Hot',
      badgeColor: 'orange',
      borderColor: 'orange'
    },
    {
      label: 'User',
      value: users.filter(u => u.role === 'USER').length.toString(),
      progress: users.length > 0 ? Math.round((users.filter(u => u.role === 'USER').length / users.length) * 100) : 0,
      borderColor: 'purple'
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'admin' && user.role === 'ADMIN') ||
                      (activeTab === 'user' && user.role === 'USER')
    return matchesSearch && matchesTab
  })

  const usersList = filteredUsers.map(user => ({
    id: `#MM-${user.id}`,
    name: user.name,
    avatar: user.avatar || `https://i.pravatar.cc/150?img=${user.id}`,
    email: user.email,
    role: user.role === 'ADMIN' ? 'Admin' : 'User',
    roleColor: user.role === 'ADMIN' ? 'green' : 'blue',
    lastLogin: '2 phút trước',
    isOnline: user.status === 'ACTIVE',
    userId: user.id
  }))

  return (
    <div className="users-management">
      {/* Sidebar */}
      <aside className="users-sidebar">
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
          <Link to="/admin" className="nav-item">
            <span className="material-icons">dashboard</span>
            <span>Overview</span>
          </Link>
          <Link to="/admin/meals" className="nav-item">
            <span className="material-icons">restaurant</span>
            <span>Meals</span>
          </Link>
          <Link to="/admin/users" className="nav-item active">
            <span className="material-icons">group</span>
            <span>Users</span>
          </Link>
          <Link to="/admin/analytics" className="nav-item">
            <span className="material-icons">insights</span>
            <span>Analytics</span>
          </Link>
          <a href="#" className="nav-item">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </a>
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
              opacity: loggingOut ? 0.6 : 1
            }}
          >
            <span className="material-icons">
              {loggingOut ? 'hourglass_empty' : 'logout'}
            </span>
            <span>{loggingOut ? 'Đang đăng xuất...' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="users-main">
        {/* Header */}
        <header className="users-header">
          <div className="header-search">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="header-actions">
            <button className="icon-btn">
              <span className="material-icons">notifications</span>
            </button>
            <button className="icon-btn">
              <span className="material-icons">help</span>
            </button>
            <div className="header-divider"></div>
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
        <div className="users-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Quản lý người dùng</h2>
              <p>Quản trị viên có thể xem, chỉnh sửa và phân quyền cho người dùng hệ thống.</p>
            </div>
            <button className="add-user-btn" onClick={handleAddUser}>
              <span className="material-icons">person_add</span>
              Thêm người dùng
            </button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card border-${stat.borderColor}`}>
                <p className="stat-label">{stat.label}</p>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  {stat.badge && (
                    <span className={`stat-badge ${stat.badgeColor}`}>{stat.badge}</span>
                  )}
                  {stat.subtext && (
                    <span className="stat-subtext">{stat.subtext}</span>
                  )}
                  {stat.progress !== undefined && (
                    <div className="stat-progress">
                      <div className="progress-bar" style={{ width: `${stat.progress}%` }}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className="table-card">
            <div className="table-header">
              <div className="table-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  Tất cả
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
                  onClick={() => setActiveTab('admin')}
                >
                  Admin
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`}
                  onClick={() => setActiveTab('user')}
                >
                  Người dùng
                </button>
              </div>
              <div className="table-actions">
                <button className="action-btn">
                  <span className="material-icons">filter_list</span>
                </button>
                <button className="action-btn">
                  <span className="material-icons">download</span>
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Người dùng</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Đăng nhập cuối</th>
                    <th className="text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                        Đang tải dữ liệu...
                      </td>
                    </tr>
                  ) : usersList.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                        Không tìm thấy người dùng
                      </td>
                    </tr>
                  ) : (
                    usersList.map((user, index) => (
                      <tr key={index}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar-wrapper">
                              <img src={user.avatar} alt={user.name} className="user-avatar" />
                              {user.isOnline && <div className="online-indicator"></div>}
                            </div>
                            <div>
                              <div className="user-name">{user.name}</div>
                              <div className="user-id">{user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="user-email">{user.email}</td>
                        <td>
                          <span className={`role-badge ${user.roleColor}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="last-login">{user.lastLogin}</td>
                        <td className="text-right">
                          <div className="action-buttons">
                            <button 
                              className="action-icon edit"
                              onClick={() => handleEditUser(users.find(u => u.id === user.userId))}
                            >
                              <span className="material-icons">edit</span>
                            </button>
                            <button 
                              className="action-icon delete"
                              onClick={() => handleDeleteUser(user.userId)}
                            >
                              <span className="material-icons">delete</span>
                            </button>
                            <button className="action-icon more">
                              <span className="material-icons">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <p className="table-info">Hiển thị {usersList.length} trên {users.length} người dùng</p>
              <div className="pagination">
                <button className="page-btn">
                  <span className="material-icons">chevron_left</span>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">
                  <span className="material-icons">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  )
}

export default UsersManagement
