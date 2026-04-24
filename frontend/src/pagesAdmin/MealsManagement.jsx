import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { foodService } from '../services/foodService'
import { adminService } from '../services/adminService'
import MealModal from './MealModal'
import './AdminLayout.css'
import './MealsManagement.css'

const MealsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const navigate = useNavigate()

  // Load meals data from API
  useEffect(() => {
    loadMeals()
  }, [])

  const loadMeals = async () => {
    try {
      setLoading(true)
      console.log('Loading meals from API...')
      const data = await foodService.getAllFoods()
      console.log('Meals loaded:', data)
      setMeals(data)
      setError(null)
    } catch (err) {
      console.error('Error loading meals:', err)
      setError('Không thể tải dữ liệu món ăn')
    } finally {
      setLoading(false)
    }
  }

  const handleAddMeal = () => {
    setSelectedMeal(null)
    setIsModalOpen(true)
  }

  const handleEditMeal = async (meal) => {
    try {
      // Fetch full meal details including ingredients and instructions
      const fullMealData = await foodService.getFoodById(meal.id)
      setSelectedMeal(fullMealData)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error loading meal details:', error)
      // Fallback to basic meal data if API fails
      setSelectedMeal(meal)
      setIsModalOpen(true)
    }
  }

  const handleDeleteMeal = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa món "${name}"?`)) {
      return
    }

    try {
      await adminService.deleteMeal(id)
      alert('Xóa món ăn thành công!')
      loadMeals() // Reload list
    } catch (error) {
      console.error('Error deleting meal:', error)
      alert('Không thể xóa món ăn!')
    }
  }

  const handleSaveMeal = async (formData) => {
    try {
      if (selectedMeal) {
        // Update existing meal
        await adminService.updateMeal(selectedMeal.id, formData)
        alert('Cập nhật món ăn thành công!')
      } else {
        // Create new meal
        await adminService.createMeal(formData)
        alert('Thêm món ăn mới thành công!')
      }
      loadMeals() // Reload list
    } catch (error) {
      console.error('Error saving meal:', error)
      throw error
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

  // Calculate stats from real data
  const stats = [
    {
      icon: 'restaurant_menu',
      label: 'Tổng số món',
      value: meals.length.toLocaleString(),
      subtext: `${meals.length} món ăn`,
      color: 'green',
      trend: 'up'
    },
    {
      icon: 'local_fire_department',
      label: 'Avg. Calories',
      value: meals.length > 0 ? Math.round(meals.reduce((sum, meal) => sum + (meal.calories || 0), 0) / meals.length) : 0,
      subtext: 'Mức năng lượng trung bình',
      color: 'amber'
    },
    {
      icon: 'task_alt',
      label: 'Đã xuất bản',
      value: meals.filter(meal => meal.status !== 'draft').length.toLocaleString(),
      subtext: `${Math.round((meals.filter(meal => meal.status !== 'draft').length / meals.length) * 100) || 0}% tổng dữ liệu`,
      color: 'blue'
    },
    {
      icon: 'edit_note',
      label: 'Bản nháp',
      value: meals.filter(meal => meal.status === 'draft').length.toLocaleString(),
      subtext: 'Cần được phê duyệt',
      color: 'purple'
    }
  ]

  // Filter meals based on search query
  const filteredMeals = meals.filter(meal => {
    const query = searchQuery.toLowerCase()
    return (
      meal.name?.toLowerCase().includes(query) ||
      meal.category?.toLowerCase().includes(query) ||
      meal.cuisine?.toLowerCase().includes(query) ||
      meal.mealType?.toLowerCase().includes(query) ||
      meal.difficulty?.toLowerCase().includes(query) ||
      meal.dietType?.toLowerCase().includes(query)
    )
  })

  // Helper function to get category color
  const getCategoryColor = (category) => {
    if (!category) return 'blue'
    const cat = category.toLowerCase()
    if (cat.includes('vegan') || cat.includes('chay')) return 'green'
    if (cat.includes('keto') || cat.includes('low-carb')) return 'amber'
    if (cat.includes('protein') || cat.includes('meat')) return 'purple'
    return 'blue'
  }

  return (
    <div className="meals-management">
      {/* Sidebar */}
      <aside className="meals-sidebar">
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
          <Link to="/admin/meals" className="nav-item active">
            <span className="material-icons">restaurant</span>
            <span>Meals</span>
          </Link>
          <Link to="/admin/users" className="nav-item">
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
        <div className="meals-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h2>Quản lý Thực đơn</h2>
              <p>Điều chỉnh, cập nhật và tối ưu hóa các món ăn trong hệ thống AI.</p>
            </div>
            <button className="add-meal-btn" onClick={handleAddMeal}>
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
            <div className="table-header" style={{
              padding: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontWeight: '700',
                color: '#1a1a1a',
                margin: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Danh sách thực đơn hiện tại
                <span style={{
                  background: 'rgba(0, 100, 0, 0.1)',
                  color: '#006400',
                  fontSize: '10px',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontWeight: '700'
                }}>LIVE</span>
              </h3>
              <div style={{
                display: 'flex', 
                gap: '16px', 
                alignItems: 'center'
              }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#64748b',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 1)';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                }}>
                  <span style={{fontSize: '14px'}}>🔍</span>
                  Bộ lọc
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#64748b',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 1)';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                }}>
                  <span style={{fontSize: '14px'}}>📊</span>
                  Xuất CSV
                </button>
              </div>
            </div>

            <div className="table-wrapper" style={{overflowX: 'auto', width: '100%'}}>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : error ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
                  <p>{error}</p>
                </div>
              ) : (
                <table className="meals-table" style={{width: '100%', tableLayout: 'fixed'}}>
                  <thead>
                    <tr>
                      <th style={{width: '80px', whiteSpace: 'nowrap'}}>ID</th>
                      <th style={{width: '200px', whiteSpace: 'nowrap', textAlign: 'left'}}>Tên món ăn</th>
                      <th style={{width: '100px', whiteSpace: 'nowrap'}}>Phân loại</th>
                      <th style={{width: '80px', whiteSpace: 'nowrap'}}>Calories</th>
                      <th className="text-center" style={{width: '100px', whiteSpace: 'nowrap', textAlign: 'left'}}>Trạng thái</th>
                      <th className="text-right" style={{width: '160px', minWidth: '160px', whiteSpace: 'nowrap'}}>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMeals.map((meal, index) => (
                      <tr key={meal.id || index}>
                        <td className="meal-id" style={{width: '80px'}}>#{meal.id || `MM-${String(index + 1).padStart(3, '0')}`}</td>
                        <td style={{width: '200px', textAlign: 'left'}}>
                          <div className="meal-info">
                            <img 
                              src={meal.image || meal.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'} 
                              alt={meal.name} 
                              className="meal-image" 
                            />
                            <span className="meal-name">{meal.name}</span>
                          </div>
                        </td>
                        <td style={{width: '100px', whiteSpace: 'nowrap'}}>
                          <span className={`category-badge ${getCategoryColor(meal.category)}`}>
                            {meal.category || 'Regular'}
                          </span>
                        </td>
                        <td className="meal-calories" style={{width: '80px', whiteSpace: 'nowrap'}}>{meal.calories ? `${meal.calories} kcal` : 'N/A'}</td>
                        <td className="text-center" style={{width: '100px', whiteSpace: 'nowrap', textAlign: 'left'}}>
                          <span className={`status-badge ${meal.status || 'published'}`}>
                            <span className="status-dot"></span>
                            {meal.status === 'draft' ? 'Draft' : 'Published'}
                          </span>
                        </td>
                        <td className="text-right" style={{
                          width: '160px', 
                          minWidth: '160px', 
                          padding: '12px'
                        }}>
                          <div style={{
                            display: 'flex', 
                            gap: '8px', 
                            justifyContent: 'flex-end'
                          }}>
                            <button 
                              style={{
                                padding: '8px 14px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                minWidth: '45px',
                                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 4px 8px rgba(16, 185, 129, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.2)';
                              }}
                              onClick={() => handleEditMeal(meal)}
                            >
                              <span style={{fontSize: '10px'}}>✏️</span>
                              Sửa
                            </button>
                            <button 
                              style={{
                                padding: '8px 14px',
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                minWidth: '45px',
                                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.2)';
                              }}
                              onClick={() => handleDeleteMeal(meal.id, meal.name)}
                            >
                              <span style={{fontSize: '10px'}}>🗑️</span>
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="table-footer">
              <p className="table-info">Hiển thị 1-{filteredMeals.length} trong số {meals.length} món ăn</p>
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

      {/* Meal Modal */}
      <MealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meal={selectedMeal}
        onSave={handleSaveMeal}
      />
    </div>
  )
}

export default MealsManagement
