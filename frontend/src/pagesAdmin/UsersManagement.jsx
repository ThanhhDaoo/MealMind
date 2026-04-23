import { useState } from 'react'
import './UsersManagement.css'

const UsersManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    {
      icon: 'group',
      label: 'Tổng người dùng',
      value: '12,845',
      subtext: '+18% tháng này',
      color: 'green',
      trend: 'up'
    },
    {
      icon: 'person_check',
      label: 'Đang hoạt động',
      value: '8,234',
      subtext: '64% tổng số',
      color: 'blue'
    },
    {
      icon: 'workspace_premium',
      label: 'Premium Users',
      value: '2,156',
      subtext: '17% tổng số',
      color: 'amber'
    },
    {
      icon: 'person_off',
      label: 'Bị khóa',
      value: '45',
      subtext: 'Cần xem xét',
      color: 'red'
    }
  ]

  const users = [
    {
      id: '#USR-001',
      name: 'Nguyễn Văn An',
      avatar: 'https://i.pravatar.cc/150?img=12',
      email: 'nguyenvanan@gmail.com',
      role: 'Premium',
      roleColor: 'amber',
      joinDate: '15/03/2024',
      status: 'active'
    },
    {
      id: '#USR-002',
      name: 'Trần Thị Bình',
      avatar: 'https://i.pravatar.cc/150?img=45',
      email: 'tranthibinh@gmail.com',
      role: 'Free',
      roleColor: 'blue',
      joinDate: '20/03/2024',
      status: 'active'
    },
    {
      id: '#USR-003',
      name: 'Lê Minh Cường',
      avatar: 'https://i.pravatar.cc/150?img=33',
      email: 'leminhcuong@gmail.com',
      role: 'Premium',
      roleColor: 'amber',
      joinDate: '10/02/2024',
      status: 'inactive'
    },
    {
      id: '#USR-004',
      name: 'Phạm Thu Dung',
      avatar: 'https://i.pravatar.cc/150?img=47',
      email: 'phamthudung@gmail.com',
      role: 'Free',
      roleColor: 'blue',
      joinDate: '05/04/2024',
      status: 'blocked'
    }
  ]

  return (
    <div className="users-management">
      {/* Sidebar */}
      <aside className="users-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="material-icons">restaurant</span>
          </div>
          <div className="sidebar-brand">
            <h1>MealMind</h1>
            <p>Admin Control</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <span className="material-icons">dashboard</span>
            <span>Overview</span>
          </a>
          <a href="#" className="nav-item">
            <span className="material-icons">restaurant</span>
            <span>Meals</span>
          </a>
          <a href="#" className="nav-item active">
            <span className="material-icons">group</span>
            <span>Users</span>
          </a>
          <a href="#" className="nav-item">
            <span className="material-icons">insights</span>
            <span>Analytics</span>
          </a>
          <a href="#" className="nav-item">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <a href="#" className="nav-item logout">
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </a>
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
                <p className="profile-name">Admin MealMind</p>
                <p className="profile-role">Quản trị viên</p>
              </div>
              <img
                src="https://i.pravatar.cc/150?img=47"
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
              <h2>Quản lý Người dùng</h2>
              <p>Theo dõi, quản lý và hỗ trợ người dùng trong hệ thống.</p>
            </div>
            <button className="add-user-btn">
              <span className="material-icons">person_add</span>
              Thêm người dùng mới
            </button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card ${stat.color}`}>
                <span className={`stat-icon ${stat.color}`}>
                  <span className="material-icons">{stat.icon}</span>
                </span>
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <div className={`stat-subtext ${stat.trend ? 'trend' : ''}`}>
                  {stat.trend && <span className="material-icons">trending_up</span>}
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div className="table-card">
            <div className="table-header">
              <h3>
                Danh sách người dùng
                <span className="live-badge">LIVE</span>
              </h3>
              <div className="table-actions">
                <button className="action-btn">
                  <span className="material-icons">filter_list</span>
                  Bộ lọc
                </button>
                <button className="action-btn">
                  <span className="material-icons">file_download</span>
                  Xuất CSV
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Người dùng</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Ngày tham gia</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="user-id">{user.id}</td>
                      <td>
                        <div className="user-info">
                          <img src={user.avatar} alt={user.name} className="user-avatar" />
                          <span className="user-name">{user.name}</span>
                        </div>
                      </td>
                      <td className="user-email">{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.roleColor}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="join-date">{user.joinDate}</td>
                      <td className="text-center">
                        <span className={`status-badge ${user.status}`}>
                          <span className="status-dot"></span>
                          {user.status === 'active' ? 'Hoạt động' : user.status === 'inactive' ? 'Không hoạt động' : 'Bị khóa'}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="action-buttons">
                          <button className="action-icon view">
                            <span className="material-icons">visibility</span>
                          </button>
                          <button className="action-icon edit">
                            <span className="material-icons">edit</span>
                          </button>
                          <button className="action-icon delete">
                            <span className="material-icons">block</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <p className="table-info">Hiển thị 1-4 trong số 12,845 người dùng</p>
              <div className="pagination">
                <button className="page-btn" disabled>
                  <span className="material-icons">chevron_left</span>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">
                  <span className="material-icons">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersManagement
