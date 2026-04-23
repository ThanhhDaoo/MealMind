import { useState } from 'react'
import './Analytics.css'

const Analytics = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [timeFilter, setTimeFilter] = useState('7days')

  const topMeals = [
    {
      name: 'Salad Lúa Mạch & Bơ',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      category: 'Keto',
      categoryColor: 'green',
      rating: 4.9,
      count: '1,240'
    },
    {
      name: 'Poke Cá Hồi Tươi',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      category: 'Protein Cao',
      categoryColor: 'orange',
      rating: 4.8,
      count: '985'
    },
    {
      name: 'Mì Ý Sốt Pesto Rau Củ',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
      category: 'Chay',
      categoryColor: 'blue',
      rating: 4.7,
      count: '860'
    },
    {
      name: 'Ức Gà Nướng Măng Tây',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
      category: 'Ít Carbs',
      categoryColor: 'red',
      rating: 4.9,
      count: '742'
    }
  ]

  return (
    <div className="analytics-page">
      {/* Sidebar */}
      <aside className="analytics-sidebar">
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
          <a href="#" className="nav-item">
            <span className="material-icons">group</span>
            <span>Users</span>
          </a>
          <a href="#" className="nav-item active">
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
      <div className="analytics-main">
        {/* Header */}
        <header className="analytics-header">
          <div className="header-left">
            <h1 className="header-title">Phân Tích & Báo Cáo</h1>
            <div className="header-search">
              <span className="material-icons">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm dữ liệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                <p className="profile-name">Quản Trị Viên</p>
                <p className="profile-role">Hệ Thống</p>
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
        <div className="analytics-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Số liệu tăng trưởng</h2>
              <p>Theo dõi hiệu quả của trí tuệ nhân tạo và tương tác người dùng.</p>
            </div>
            <div className="time-filter">
              <button className={timeFilter === '7days' ? 'active' : ''} onClick={() => setTimeFilter('7days')}>
                7 Ngày
              </button>
              <button className={timeFilter === '30days' ? 'active' : ''} onClick={() => setTimeFilter('30days')}>
                30 Ngày
              </button>
              <button className={timeFilter === 'custom' ? 'active' : ''} onClick={() => setTimeFilter('custom')}>
                <span className="material-icons">calendar_today</span>
                Tùy chọn
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {/* AI Success Rate */}
            <div className="stat-card">
              <div className="stat-icon green">
                <span className="material-icons">auto_awesome</span>
              </div>
              <p className="stat-label">TỶ LỆ AI THÀNH CÔNG</p>
              <h3 className="stat-value">94.2%</h3>
              <p className="stat-trend">
                <span className="material-icons">trending_up</span>
                +2.4% so với tuần trước
              </p>
            </div>

            {/* Weekly Chart */}
            <div className="stat-card chart-card">
              <p className="stat-label">MÓN ĂN ĐƯỢC LẬP KẾ HOẠCH NHIỀU NHẤT</p>
              <div className="weekly-chart">
                <div className="chart-bar" style={{ height: '85%' }}>
                  <span className="bar-label">Thứ 2</span>
                </div>
                <div className="chart-bar" style={{ height: '60%' }}>
                  <span className="bar-label">Thứ 3</span>
                </div>
                <div className="chart-bar" style={{ height: '95%' }}>
                  <span className="bar-label">Thứ 4</span>
                </div>
                <div className="chart-bar" style={{ height: '75%' }}>
                  <span className="bar-label">Thứ 5</span>
                </div>
                <div className="chart-bar" style={{ height: '40%' }}>
                  <span className="bar-label">Thứ 6</span>
                </div>
              </div>
            </div>

            {/* New Users */}
            <div className="stat-card">
              <div className="stat-icon secondary">
                <span className="material-icons">person_add</span>
              </div>
              <p className="stat-label">NGƯỜI DÙNG MỚI</p>
              <h3 className="stat-value secondary">1,284</h3>
              <div className="user-avatars">
                <img src="https://i.pravatar.cc/150?img=12" alt="User" />
                <img src="https://i.pravatar.cc/150?img=45" alt="User" />
                <img src="https://i.pravatar.cc/150?img=33" alt="User" />
                <div className="avatar-more">+52</div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            {/* Daily Performance */}
            <div className="chart-card-large">
              <div className="chart-header">
                <div>
                  <h3>Hiệu Suất AI Hàng Ngày</h3>
                  <p>Phân tích mức độ chấp nhận thực đơn AI gợi ý</p>
                </div>
                <button className="more-btn">
                  <span className="material-icons">more_horiz</span>
                </button>
              </div>
              <div className="daily-chart">
                {[70, 85, 65, 90, 80, 95, 88].map((height, index) => (
                  <div key={index} className="daily-bar" style={{ height: `${height}%` }}>
                    <div className="bar-tooltip">{height}%</div>
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                <span>01 Thg 10</span>
                <span>07 Thg 10</span>
              </div>
            </div>

            {/* Heatmap */}
            <div className="heatmap-card">
              <h3>Giữ Chân Người Dùng</h3>
              <p>Mật độ tương tác theo giờ/ngày</p>
              <div className="heatmap-grid">
                {[50, 100, 200, 400, 300, 100, 50, 100, 300, 500, 600, 400, 200, 100, 200, 400, 700, 800, 600, 400, 200, 100, 300, 500, 600, 400, 200, 100, 50, 100, 200, 400, 300, 100, 50].map((intensity, index) => (
                  <div key={index} className={`heatmap-cell intensity-${Math.floor(intensity / 200)}`}></div>
                ))}
              </div>
              <div className="heatmap-legend">
                <span>Ít tương tác</span>
                <div className="legend-colors">
                  <div className="legend-color intensity-0"></div>
                  <div className="legend-color intensity-1"></div>
                  <div className="legend-color intensity-3"></div>
                  <div className="legend-color intensity-4"></div>
                </div>
                <span>Nhiều tương tác</span>
              </div>
            </div>
          </div>

          {/* Top Meals */}
          <div className="top-meals-section">
            <div className="section-header">
              <div>
                <h3>Món Ăn Thịnh Hành Nhất</h3>
                <p>Gợi ý từ AI được người dùng thêm vào kế hoạch nhiều nhất tuần này</p>
              </div>
              <button className="view-all-btn">Xem tất cả</button>
            </div>
            <div className="meals-grid">
              {topMeals.map((meal, index) => (
                <div key={index} className="meal-card">
                  <div className="meal-image">
                    <img src={meal.image} alt={meal.name} />
                  </div>
                  <div className="meal-info">
                    <div className="meal-meta">
                      <span className={`meal-category ${meal.categoryColor}`}>
                        {meal.category}
                      </span>
                      <span className="meal-rating">
                        <span className="material-icons">star</span>
                        {meal.rating}
                      </span>
                    </div>
                    <h4>{meal.name}</h4>
                    <p>Được thêm {meal.count} lần</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="analytics-fab">
        <span className="material-icons">download</span>
      </button>
    </div>
  )
}

export default Analytics
