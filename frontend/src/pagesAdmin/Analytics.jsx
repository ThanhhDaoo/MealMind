import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminService } from '../services/adminService'
import './AdminLayout.css'
import './Analytics.css'

const Analytics = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [timeFilter, setTimeFilter] = useState('7days')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  })
  const [analyticsData, setAnalyticsData] = useState({
    users: [],
    foods: []
  })
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const data = await adminService.getAnalytics()
      setAnalyticsData(data)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
    } finally {
      setLoading(false)
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

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter)
    if (filter === 'custom') {
      setShowDatePicker(true)
    } else {
      setShowDatePicker(false)
    }
  }

  const handleCustomDateApply = () => {
    setShowDatePicker(false)
    // The stats will automatically recalculate based on customDateRange
  }

  const handleExportAnalytics = () => {
    try {
      const stats = calculateStats()
      
      // Prepare CSV data
      const headers = ['Chỉ số', 'Giá trị', 'Ghi chú']
      const csvData = [
        ['Tỷ lệ AI thành công', `${stats.aiSuccessRate}%`, 'Phần trăm người dùng hoạt động'],
        ['Người dùng mới', stats.newUsers, `Trong ${stats.daysAgo} ngày qua`],
        ['Tổng món ăn', stats.totalMeals, 'Tổng số món ăn trong hệ thống'],
        ['Người dùng hoạt động', stats.activeUsers, 'Số người dùng đang hoạt động'],
        ['Tổng người dùng', analyticsData.users?.length || 0, 'Tổng số người dùng đã đăng ký'],
        ['', '', ''],
        ['Top Món Ăn', '', ''],
        ...topMeals.map((meal, index) => [
          `${index + 1}. ${meal.name}`,
          `${meal.rating} ⭐`,
          `${meal.count} lượt xem`
        ])
      ]

      // Create CSV content
      const csvContent = [
        `Báo Cáo Phân Tích - MealMind Admin`,
        `Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`,
        `Khoảng thời gian: ${stats.daysAgo} ngày`,
        '',
        headers.join(','),
        ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      // Add BOM for UTF-8
      const BOM = '\uFEFF'
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
      
      // Create download link
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `analytics_report_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      alert('Đã xuất báo cáo phân tích thành công!')
    } catch (error) {
      console.error('Error exporting analytics:', error)
      alert('Có lỗi khi xuất báo cáo!')
    }
  }

  // Calculate real stats from API data based on time filter
  const calculateStats = () => {
    // Filter users by search query if provided
    let filteredUsers = analyticsData.users || []
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filteredUsers = filteredUsers.filter(user =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query)
      )
    }
    
    const totalUsers = filteredUsers.length
    const totalFoods = analyticsData.foods?.length || 0
    const activeUsers = filteredUsers.filter(user => user.status === 'ACTIVE').length
    
    // Calculate date range based on filter
    let filterDate = new Date()
    let daysAgo = 7
    
    if (timeFilter === '30days') {
      daysAgo = 30
      filterDate.setDate(filterDate.getDate() - 30)
    } else if (timeFilter === 'custom' && customDateRange.startDate) {
      filterDate = new Date(customDateRange.startDate)
      const endDate = customDateRange.endDate ? new Date(customDateRange.endDate) : new Date()
      daysAgo = Math.ceil((endDate - filterDate) / (1000 * 60 * 60 * 24))
    } else {
      filterDate.setDate(filterDate.getDate() - 7)
      daysAgo = 7
    }
    
    // Calculate new users within the time range
    const newUsers = filteredUsers.filter(user => {
      if (!user.createdAt) return false
      const userDate = new Date(user.createdAt)
      if (timeFilter === 'custom' && customDateRange.endDate) {
        const endDate = new Date(customDateRange.endDate)
        return userDate >= filterDate && userDate <= endDate
      }
      return userDate >= filterDate
    }).length

    // Calculate success rate based on active users percentage
    const successRate = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0

    return {
      aiSuccessRate: successRate,
      newUsers: newUsers,
      totalMeals: totalFoods,
      activeUsers: activeUsers,
      daysAgo: daysAgo,
      filteredUsers: filteredUsers
    }
  }

  const stats = calculateStats()

  // Get top meals from real data with search filter
  const getTopMeals = () => {
    if (!analyticsData.foods || analyticsData.foods.length === 0) {
      return []
    }

    // Filter by search query first
    let filteredFoods = analyticsData.foods
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filteredFoods = analyticsData.foods.filter(food => 
        food.name?.toLowerCase().includes(query) ||
        food.category?.toLowerCase().includes(query) ||
        food.cuisine?.toLowerCase().includes(query) ||
        food.dietType?.toLowerCase().includes(query)
      )
    }

    // Sort by rating or view count if available
    const sortedFoods = [...filteredFoods].sort((a, b) => {
      const ratingA = a.rating || 0
      const ratingB = b.rating || 0
      const viewA = a.viewCount || 0
      const viewB = b.viewCount || 0
      
      // Sort by rating first, then by view count
      if (ratingB !== ratingA) return ratingB - ratingA
      return viewB - viewA
    })

    return sortedFoods.slice(0, 4).map((food) => ({
      name: food.name,
      image: food.image || food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      category: food.category || food.dietType || 'Regular',
      categoryColor: getCategoryColor(food.category || food.dietType),
      rating: food.rating || 4.5,
      count: food.viewCount || food.favoriteCount || 0
    }))
  }

  const getCategoryColor = (category) => {
    if (!category) return 'blue'
    const cat = category.toLowerCase()
    if (cat.includes('vegan') || cat.includes('chay')) return 'green'
    if (cat.includes('keto') || cat.includes('low-carb')) return 'orange'
    if (cat.includes('protein') || cat.includes('meat')) return 'red'
    return 'blue'
  }

  const topMeals = getTopMeals()

  // Generate heatmap data based on user activity
  const generateHeatmapData = () => {
    const totalUsers = analyticsData.users?.length || 0
    const totalFoods = analyticsData.foods?.length || 0
    
    // Generate 35 cells (5 weeks x 7 days)
    const heatmapData = []
    for (let i = 0; i < 35; i++) {
      // Calculate intensity based on position (simulate weekly pattern)
      const dayOfWeek = i % 7
      const weekNumber = Math.floor(i / 7)
      
      // Higher activity on weekdays (Mon-Fri), lower on weekends
      let baseIntensity = 300
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        baseIntensity = 150 // Weekend
      }
      
      // Increase intensity for recent weeks
      const weekMultiplier = 1 + (weekNumber * 0.2)
      
      // Add some variation based on actual data
      const dataMultiplier = totalUsers > 0 ? Math.min(totalUsers / 10, 2) : 1
      
      const intensity = Math.round(baseIntensity * weekMultiplier * dataMultiplier)
      heatmapData.push(Math.min(intensity, 1000)) // Cap at 1000
    }
    
    return heatmapData
  }

  const heatmapData = generateHeatmapData()

  return (
    <div className="analytics-page">
      {/* Sidebar */}
      <aside className="analytics-sidebar">
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
          <Link to="/admin/users" className="nav-item">
            <span className="material-icons">group</span>
            <span>Users</span>
          </Link>
          <Link to="/admin/analytics" className="nav-item active">
            <span className="material-icons">insights</span>
            <span>Analytics</span>
          </Link>
          <Link to="/admin/settings" className="nav-item">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </Link>
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
        <div className="analytics-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Số liệu tăng trưởng</h2>
              <p>Theo dõi hiệu quả của trí tuệ nhân tạo và tương tác người dùng.</p>
            </div>
            <div className="time-filter">
              <button className={timeFilter === '7days' ? 'active' : ''} onClick={() => handleTimeFilterChange('7days')}>
                7 Ngày
              </button>
              <button className={timeFilter === '30days' ? 'active' : ''} onClick={() => handleTimeFilterChange('30days')}>
                30 Ngày
              </button>
              <button className={timeFilter === 'custom' ? 'active' : ''} onClick={() => handleTimeFilterChange('custom')}>
                <span className="material-icons">calendar_today</span>
                Tùy chọn
              </button>
            </div>
          </div>
          
          {/* Custom Date Picker */}
          {showDatePicker && (
            <div className="custom-date-picker" style={{
              marginBottom: '1.5rem',
              padding: '1.25rem',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-end',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1', minWidth: '200px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Từ ngày:</label>
                <input
                  type="date"
                  value={customDateRange.startDate}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, startDate: e.target.value })}
                  style={{
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1', minWidth: '200px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Đến ngày:</label>
                <input
                  type="date"
                  value={customDateRange.endDate}
                  onChange={(e) => setCustomDateRange({ ...customDateRange, endDate: e.target.value })}
                  style={{
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>
              <button
                onClick={handleCustomDateApply}
                style={{
                  padding: '0.625rem 1.5rem',
                  background: 'linear-gradient(135deg, #008000 0%, #72de5e 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  height: '42px',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 128, 0, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                Áp dụng
              </button>
            </div>
          )}

          {/* Stats Grid */}
          <div className="stats-grid">
            {/* AI Success Rate */}
            <div className="stat-card">
              <div className="stat-icon green">
                <span className="material-icons">auto_awesome</span>
              </div>
              <p className="stat-label">TỶ LỆ AI THÀNH CÔNG</p>
              <h3 className="stat-value">{loading ? '...' : `${stats.aiSuccessRate}%`}</h3>
              <p className="stat-trend">
                <span className="material-icons">trending_up</span>
                Dựa trên tỷ lệ người dùng hoạt động
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
              <p className="stat-label">NGƯỜI DÙNG MỚI ({stats.daysAgo} NGÀY)</p>
              <h3 className="stat-value secondary">{loading ? '...' : stats.newUsers.toLocaleString()}</h3>
              <div className="user-avatars">
                {stats.filteredUsers?.slice(0, 3).map((user, index) => (
                  <img 
                    key={user.id || index} 
                    src={user.avatar || `https://i.pravatar.cc/150?img=${user.id || index + 12}`} 
                    alt="User" 
                  />
                ))}
                {(stats.filteredUsers?.length || 0) > 3 && (
                  <div className="avatar-more">+{stats.filteredUsers.length - 3}</div>
                )}
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
                {heatmapData.map((intensity, index) => (
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
                <p>Danh sách món ăn từ cơ sở dữ liệu hệ thống ({analyticsData.foods.length} món)</p>
              </div>
              <button className="view-all-btn" onClick={() => navigate('/admin/meals')}>Xem tất cả</button>
            </div>
            <div className="meals-grid">
              {loading ? (
                <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: '2rem' }}>
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : topMeals.length === 0 ? (
                <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: '2rem' }}>
                  <p>Không có dữ liệu món ăn</p>
                </div>
              ) : (
                topMeals.map((meal, index) => (
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="analytics-fab" onClick={handleExportAnalytics} title="Xuất báo cáo">
        <span className="material-icons">download</span>
      </button>
    </div>
  )
}

export default Analytics
