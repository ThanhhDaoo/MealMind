import { useState } from 'react'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const metrics = [
    {
      icon: 'group',
      title: 'Tổng người dùng',
      value: '1,284,502',
      change: '+12.5%',
      color: 'primary'
    },
    {
      icon: 'calendar_today',
      title: 'Kế hoạch đang hoạt động',
      value: '48,291',
      change: '+4.2%',
      color: 'secondary'
    },
    {
      icon: 'payments',
      title: 'Doanh thu tháng này',
      value: '$142,850',
      change: '+8.9%',
      color: 'tertiary'
    },
    {
      icon: 'smart_toy',
      title: 'Gợi ý AI đã tạo',
      value: '892,104',
      change: 'LIVE',
      color: 'ai',
      isLive: true
    }
  ]

  const categories = [
    { name: 'Ăn chay (Vegan)', percentage: 85 },
    { name: 'Keto', percentage: 62 },
    { name: 'Ăn kiêng Gluten', percentage: 45 },
    { name: 'Đồ ăn nhanh lành mạnh', percentage: 78 }
  ]

  const activities = [
    {
      type: 'user',
      avatar: 'https://i.pravatar.cc/150?img=12',
      name: 'Lê Minh Tuấn',
      action: 'đã nâng cấp lên gói',
      highlight: 'Premium',
      time: '2 phút trước'
    },
    {
      type: 'ai',
      icon: 'auto_awesome',
      name: 'MealMind AI',
      action: 'vừa tạo 150 công thức mới',
      time: '15 phút trước'
    },
    {
      type: 'user',
      avatar: 'https://i.pravatar.cc/150?img=45',
      name: 'Nguyễn Hà Phương',
      action: 'vừa hoàn thành kế hoạch tuần',
      time: '42 phút trước'
    },
    {
      type: 'alert',
      icon: 'report',
      name: 'Cảnh báo hệ thống:',
      action: 'Lưu lượng truy cập cao',
      time: '1 giờ trước',
      isError: true
    }
  ]

  return (
    <div className="admin-dashboard">
      {/* Background Decoration */}
      <div className="admin-bg-decoration">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
      </div>

      {/* Sidebar */}
      <aside className="admin-sidebar">
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
          <a href="#" className="nav-item active">
            <span className="material-icons">dashboard</span>
            <span>Overview</span>
          </a>
          <a href="#" className="nav-item">
            <span className="material-icons">restaurant</span>
            <span>Meals</span>
          </a>
          <a href="#" className="nav-item">
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
      <div className="admin-main">
        {/* Top App Bar */}
        <header className="admin-header">
          <div className="header-search">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm dữ liệu..."
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
            <div className="header-profile">
              <div className="profile-info">
                <p className="profile-name">Quản trị viên</p>
                <p className="profile-email">mealmind@admin.vn</p>
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
        <div className="admin-content">
          {/* Page Header */}
          <div className="page-header">
            <h2>Bảng điều khiển tổng quan</h2>
            <p>Chào mừng trở lại! Dưới đây là hiệu suất hệ thống của bạn hôm nay.</p>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className={`metric-card ${metric.color} ${metric.isLive ? 'live' : ''}`}>
                <div className="metric-header">
                  <div className={`metric-icon ${metric.color}`}>
                    <span className="material-icons">{metric.icon}</span>
                  </div>
                  <span className={`metric-badge ${metric.isLive ? 'live' : ''}`}>
                    {metric.change}
                  </span>
                </div>
                <p className="metric-label">{metric.title}</p>
                <h3 className="metric-value">{metric.value}</h3>
                <div className="metric-glow"></div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            {/* Line Chart */}
            <div className="chart-card line-chart">
              <div className="chart-header">
                <div>
                  <h4>Tăng trưởng người dùng</h4>
                  <p>Phân tích lượt đăng ký trong 12 tháng qua</p>
                </div>
                <select className="year-select">
                  <option>Năm 2024</option>
                  <option>Năm 2023</option>
                </select>
              </div>
              <div className="chart-content">
                <svg className="line-chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#006400" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#006400" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 80 Q 10 70, 20 75 T 40 50 T 60 60 T 80 30 T 100 20 L 100 100 L 0 100 Z"
                    fill="url(#lineGrad)"
                  />
                  <path
                    d="M0 80 Q 10 70, 20 75 T 40 50 T 60 60 T 80 30 T 100 20"
                    fill="none"
                    stroke="#006400"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="chart-labels">
                  {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="chart-card bar-chart">
              <h4>Danh mục món ăn</h4>
              <p>Xu hướng tìm kiếm phổ biến</p>
              <div className="categories-list">
                {categories.map((category, index) => (
                  <div key={index} className="category-item">
                    <div className="category-header">
                      <span>{category.name}</span>
                      <span className="category-percentage">{category.percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-report-btn">Xem báo cáo chi tiết</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="activity-section">
            <div className="section-header">
              <h4>Hoạt động mới nhất</h4>
              <a href="#" className="view-all-link">Xem tất cả</a>
            </div>
            <div className="activity-grid">
              {activities.map((activity, index) => (
                <div key={index} className={`activity-card ${activity.isError ? 'error' : ''}`}>
                  {activity.avatar ? (
                    <img src={activity.avatar} alt={activity.name} className="activity-avatar" />
                  ) : (
                    <div className={`activity-icon ${activity.isError ? 'error' : 'ai'}`}>
                      <span className="material-icons">{activity.icon}</span>
                    </div>
                  )}
                  <div className="activity-content">
                    <p className="activity-text">
                      <strong>{activity.name}</strong>{' '}
                      <span>{activity.action}</span>
                      {activity.highlight && <strong> {activity.highlight}</strong>}
                    </p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                  <span className="material-icons activity-arrow">chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="admin-fab">
        <span className="material-icons">add</span>
        <div className="fab-tooltip">Tạo thông báo mới</div>
      </button>
    </div>
  )
}

export default AdminDashboard
