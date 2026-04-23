import { useState } from 'react'
import './MealsManagement.css'

const MealsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const stats = [
    {
      icon: 'restaurant_menu',
      label: 'Tổng số món',
      value: '1,284',
      subtext: '+12% tháng này',
      color: 'green',
      trend: 'up'
    },
    {
      icon: 'local_fire_department',
      label: 'Avg. Calories',
      value: '452',
      subtext: 'Mức năng lượng tiêu chuẩn',
      color: 'amber'
    },
    {
      icon: 'task_alt',
      label: 'Đã xuất bản',
      value: '1,120',
      subtext: '87% tổng dữ liệu',
      color: 'blue'
    },
    {
      icon: 'edit_note',
      label: 'Bản nháp',
      value: '164',
      subtext: 'Cần được phê duyệt',
      color: 'purple'
    }
  ]

  const meals = [
    {
      id: '#MM-001',
      name: 'Salad cá hồi Quinoa',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop',
      category: 'Vegan',
      categoryColor: 'green',
      calories: '320 kcal',
      status: 'published'
    },
    {
      id: '#MM-002',
      name: 'Bít tết bò Mỹ sốt tiêu đen',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop',
      category: 'Keto',
      categoryColor: 'amber',
      calories: '580 kcal',
      status: 'published'
    },
    {
      id: '#MM-003',
      name: 'Buddha Bowl Thuần Chay',
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=100&h=100&fit=crop',
      category: 'Vegan',
      categoryColor: 'green',
      calories: '410 kcal',
      status: 'draft'
    },
    {
      id: '#MM-004',
      name: 'Pizza Margherita thủ công',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop',
      category: 'Regular',
      categoryColor: 'blue',
      calories: '720 kcal',
      status: 'published'
    }
  ]

  return (
    <div className="meals-management">
      {/* Sidebar */}
      <aside className="meals-sidebar">
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
          <a href="#" className="nav-item active">
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
      <div className="meals-main">
        {/* Header */}
        <header className="meals-header">
          <div className="header-search">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
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
        <div className="meals-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Quản lý Thực đơn</h2>
              <p>Điều chỉnh, cập nhật và tối ưu hóa các món ăn trong hệ thống AI.</p>
            </div>
            <button className="add-meal-btn">
              <span className="material-icons">add</span>
              Thêm món ăn mới
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
                Danh sách thực đơn hiện tại
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
              <table className="meals-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên món ăn</th>
                    <th>Phân loại</th>
                    <th>Calories</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {meals.map((meal, index) => (
                    <tr key={index}>
                      <td className="meal-id">{meal.id}</td>
                      <td>
                        <div className="meal-info">
                          <img src={meal.image} alt={meal.name} className="meal-image" />
                          <span className="meal-name">{meal.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`category-badge ${meal.categoryColor}`}>
                          {meal.category}
                        </span>
                      </td>
                      <td className="meal-calories">{meal.calories}</td>
                      <td className="text-center">
                        <span className={`status-badge ${meal.status}`}>
                          <span className="status-dot"></span>
                          {meal.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="action-buttons">
                          <button className="action-icon edit">
                            <span className="material-icons">edit</span>
                          </button>
                          <button className="action-icon delete">
                            <span className="material-icons">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <p className="table-info">Hiển thị 1-4 trong số 1,284 món ăn</p>
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

export default MealsManagement
