import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { foodService } from '../services/foodService'
import './FoodList.css'

const FoodList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('quick')
  const [selectedCuisine, setSelectedCuisine] = useState('italian')
  const [sortBy, setSortBy] = useState('trending')
  const [currentPage, setCurrentPage] = useState(1)
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const filters = [
    { id: 'quick', label: 'Món Nhanh', icon: 'timer' },
    { id: 'protein', label: 'Giàu Protein', icon: 'fitness_center' },
    { id: 'vegan', label: 'Chay', icon: 'eco' },
    { id: 'gluten-free', label: 'Không Gluten', icon: 'bakery_dining' },
    { id: 'budget', label: 'Tiết Kiệm', icon: 'payments' }
  ]

  const cuisines = [
    { id: 'italian', label: 'Ý' },
    { id: 'japanese', label: 'Nhật' },
    { id: 'mexican', label: 'Mexico' },
    { id: 'thai', label: 'Thái' }
  ]

  // Load foods from API
  useEffect(() => {
    loadFoods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm])

  const loadFoods = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage - 1, // API sử dụng 0-indexed
        size: 6, // Chỉ hiện 6 thẻ mỗi trang
        search: searchTerm || undefined
      }
      
      console.log('Loading foods with params:', params)
      const response = await foodService.getAllFoods(params)
      console.log('API response:', response)
      
      // API trả về object với pagination info
      if (response.content) {
        setFoods(response.content)
        setTotalPages(response.totalPages)
        setTotalItems(response.totalElements)
      } else {
        // Fallback nếu API trả về array trực tiếp
        setFoods(response || [])
        setTotalPages(Math.ceil((response?.length || 0) / 6))
        setTotalItems(response?.length || 0)
      }
      setError(null)
    } catch (err) {
      console.error('Error loading foods:', err)
      setError('Không thể tải danh sách món ăn')
      // Fallback to sample data - chỉ lấy 6 món đầu
      setFoods(sampleFoods.slice(0, 6))
      setTotalPages(2) // 12 món / 6 = 2 trang
      setTotalItems(12)
    } finally {
      setLoading(false)
    }
  }

  // Sample fallback data
  const sampleFoods = [
    {
      id: 1,
      name: 'Linguine với Pesto Vườn',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      cookingTime: 20,
      calories: 420,
      difficulty: 'Dễ',
      category: 'Ý'
    },
    {
      id: 2,
      name: 'Kale Quinoa Power Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      cookingTime: 15,
      calories: 310,
      difficulty: 'Dễ',
      category: 'Chay'
    },
    {
      id: 3,
      name: 'Cá Hồi Nướng Chanh Thảo Mộc',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      cookingTime: 25,
      calories: 450,
      difficulty: 'Trung Bình',
      category: 'Protein'
    },
    {
      id: 4,
      name: 'Tacos Carne Asada Phong Cách Đường Phố',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
      cookingTime: 30,
      calories: 520,
      difficulty: 'Dễ',
      category: 'Mexico'
    },
    {
      id: 5,
      name: 'Cà Ri Đỏ Đậu Phụ Thơm Ngon',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400',
      cookingTime: 25,
      calories: 380,
      difficulty: 'Trung Bình',
      category: 'Thái'
    },
    {
      id: 6,
      name: 'Sườn BBQ Nướng Chậm',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
      cookingTime: 120,
      calories: 890,
      difficulty: 'Khó',
      category: 'Nướng'
    },
    {
      id: 7,
      name: 'Pad Thai Tôm Truyền Thống',
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',
      cookingTime: 20,
      calories: 480,
      difficulty: 'Trung bình',
      category: 'Thái'
    },
    {
      id: 8,
      name: 'Gà Teriyaki Nướng Mật Ong',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
      cookingTime: 35,
      calories: 520,
      difficulty: 'Dễ',
      category: 'Nhật'
    },
    {
      id: 9,
      name: 'Pizza Margherita Tươi',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      cookingTime: 45,
      calories: 650,
      difficulty: 'Trung bình',
      category: 'Ý'
    }
  ]

  return (
    <div className="food-list-page">
      <div className="food-list-container">
        {/* Main Content */}
        <main className="food-list-main">
          {/* Header */}
          <div className="food-list-header">
            <div className="food-list-header-top">
              <h1>Khám Phá Công Thức</h1>
              <div className="sort-dropdown">
                <span>Sắp xếp theo:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="trending">Xu Hướng</option>
                  <option value="newest">Mới Nhất</option>
                  <option value="rating">Đánh Giá</option>
                </select>
              </div>
            </div>

            {/* AI Recommendation Banner */}
            <div className="ai-recommendation-banner">
              <div className="ai-banner-content">
                <span className="ai-badge">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
                  Gợi Ý AI
                </span>
                <h2>Buddha Bowl Mùa Hè Tươi Mát</h2>
                <p>Dựa trên sở thích rau xanh tươi và món ăn tiết kiệm của bạn, chúng tôi gợi ý món ăn theo mùa yêu thích này.</p>
                <button className="ai-banner-btn">Xem Công Thức</button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" 
                alt="Buddha Bowl"
                className="ai-banner-image"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Đang tải món ăn...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={loadFoods} className="retry-btn">Thử lại</button>
            </div>
          )}

          {/* Food Grid */}
          {!loading && !error && (
            <div className="food-grid-list">
              {foods.slice(0, 6).map(food => (
                <div key={food.id} className="food-card-list">
                  <div className="food-image-wrapper">
                    <img 
                      src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} 
                      alt={food.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
                      }}
                    />
                    <span className="food-tag">{food.category || 'Món Ăn'}</span>
                    <button className="food-favorite-btn">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>
                  <div className="food-card-body">
                    <h3 className="food-title">{food.name}</h3>
                    <div className="food-stats-grid">
                      <div className="food-stat-item time">
                        <span className="material-symbols-outlined">timer</span>
                        <span className="stat-value">{food.totalTime || food.prepTime || food.cookingTime || 20} Phút</span>
                      </div>
                      <div className="food-stat-item calories">
                        <span className="material-symbols-outlined">local_fire_department</span>
                        <span className="stat-value">{food.calories || 320} Calo</span>
                      </div>
                      <div className="food-stat-item difficulty">
                        <span className="material-symbols-outlined">bar_chart</span>
                        <span className="stat-value">{food.difficulty || 'Easy'}</span>
                      </div>
                    </div>
                    <Link to={`/foods/${food.id}`} className="view-detail-btn">
                      Xem Chi Tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && foods.length === 0 && (
            <div className="empty-state">
              <p>Không tìm thấy món ăn nào phù hợp</p>
              <button onClick={() => {
                setSearchTerm('')
                setCurrentPage(1)
                loadFoods()
              }} className="clear-filters-btn">
                Xóa bộ lọc
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && foods.length > 0 && totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              {/* Hiển thị các trang dựa trên totalPages */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button 
                    key={pageNum}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`} 
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && (
                <>
                  <span style={{color: '#64748b', margin: '0 0.25rem'}}>...</span>
                  <button className="page-btn" onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                  </button>
                </>
              )}
              
              <button 
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default FoodList
