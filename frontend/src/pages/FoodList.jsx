import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { foodService } from '../services/foodService'
import './FoodList.css'

const FoodList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [timeRange, setTimeRange] = useState([10, 45])
  const [difficulty, setDifficulty] = useState('')
  const [dietType, setDietType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const ingredients = ['Thịt gà', 'Rau củ', 'Hải sản', 'Đậu hũ', 'Thịt bò', 'Thịt heo']
  const difficulties = ['Dễ', 'Trung bình', 'Khó']
  const dietTypes = ['Chay', 'Keto', 'Low-carb', 'Healthy']

  // Load foods from API
  useEffect(() => {
    loadFoods()
  }, [currentPage, searchTerm, difficulty, dietType])

  const loadFoods = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage - 1,
        size: 12,
        search: searchTerm || undefined,
        difficulty: difficulty || undefined,
        dietType: dietType || undefined
      }
      
      const response = await foodService.getAllFoods(params)
      setFoods(response.content || response || [])
      setError(null)
    } catch (err) {
      console.error('Error loading foods:', err)
      setError('Không thể tải danh sách món ăn')
      // Fallback to sample data
      setFoods(sampleFoods)
    } finally {
      setLoading(false)
    }
  }

  // Sample fallback data
  const sampleFoods = [
    {
      id: 1,
      name: 'Salad Cầu Vồng',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      cookingTime: 20,
      rating: 4.8,
      difficulty: 'Dễ',
      dietType: 'Healthy',
      category: 'Salad'
    },
    {
      id: 2,
      name: 'Buddha Bowl Hải Sản',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      cookingTime: 25,
      rating: 4.7,
      difficulty: 'Trung bình',
      dietType: 'Healthy',
      category: 'Bowl'
    },
    {
      id: 3,
      name: 'Pasta Pesto Hạt Điều',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      cookingTime: 30,
      rating: 4.8,
      difficulty: 'Dễ',
      dietType: 'Chay',
      category: 'Pasta'
    },
    {
      id: 4,
      name: 'Cá Hồi Nướng Măng Tây',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      cookingTime: 35,
      rating: 5.0,
      difficulty: 'Khó',
      dietType: 'Keto',
      category: 'Hải sản'
    },
    {
      id: 5,
      name: 'Súp Rau Củ Đậu Phụ',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
      cookingTime: 40,
      rating: 4.6,
      difficulty: 'Dễ',
      dietType: 'Chay',
      category: 'Súp'
    },
    {
      id: 6,
      name: 'Pizza Margherita Tươi',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      cookingTime: 45,
      rating: 4.9,
      difficulty: 'Trung bình',
      dietType: 'Healthy',
      category: 'Pizza'
    }
  ]

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient))
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    loadFoods()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="food-list-page">
      <div className="food-list-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          {/* Nguyên liệu */}
          <div className="filter-section">
            <h3 className="filter-title">
              <span className="filter-icon">🥬</span>
              Nguyên liệu
            </h3>
            <div className="filter-options">
              {ingredients.map(ingredient => (
                <label key={ingredient} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => toggleIngredient(ingredient)}
                  />
                  <span>{ingredient}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Thời gian nấu */}
          <div className="filter-section">
            <h3 className="filter-title">
              <span className="filter-icon">⏱️</span>
              Thời gian nấu
            </h3>
            <div className="time-range">
              <input
                type="range"
                min="10"
                max="120"
                value={timeRange[1]}
                onChange={(e) => setTimeRange([10, parseInt(e.target.value)])}
                className="range-slider"
              />
              <div className="time-labels">
                <span>10p</span>
                <span>{timeRange[1]}p</span>
                <span>&gt;120p</span>
              </div>
            </div>
          </div>

          {/* Độ khó */}
          <div className="filter-section">
            <h3 className="filter-title">
              <span className="filter-icon">📊</span>
              Độ khó
            </h3>
            <div className="difficulty-buttons">
              <button
                className={`difficulty-btn ${difficulty === '' ? 'active' : ''}`}
                onClick={() => setDifficulty('')}
              >
                Tất cả
              </button>
              {difficulties.map(level => (
                <button
                  key={level}
                  className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Chế độ ăn */}
          <div className="filter-section">
            <h3 className="filter-title">
              <span className="filter-icon">🍽️</span>
              Chế độ ăn
            </h3>
            <div className="filter-options">
              <label className="checkbox-label">
                <input 
                  type="radio" 
                  name="dietType"
                  checked={dietType === ''}
                  onChange={() => setDietType('')}
                />
                <span>Tất cả chế độ</span>
              </label>
              {dietTypes.map(type => (
                <label key={type} className="checkbox-label">
                  <input 
                    type="radio" 
                    name="dietType"
                    checked={dietType === type}
                    onChange={() => setDietType(type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="food-list-main">
          {/* Header */}
          <div className="food-list-header">
            <h1>Khám phá thế giới ẩm thực</h1>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Tìm món ăn, nguyên liệu, hoặc phong cách..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="search-btn" onClick={handleSearch}>
                Tìm kiếm
              </button>
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
              {foods.map(food => (
                <div key={food.id} className="food-card-list">
                  <div className="food-image-wrapper">
                    <img 
                      src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} 
                      alt={food.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
                      }}
                    />
                    <span className="food-tag">{food.dietType || food.category}</span>
                  </div>
                  <div className="food-card-body">
                    <h3 className="food-title">{food.name}</h3>
                    <div className="food-info-row">
                      <span className="food-time">⏱️ {food.cookingTime || food.time || '30'} phút</span>
                      <span className="food-rating">⭐ {food.rating || '4.5'}</span>
                    </div>
                    <div className="food-footer">
                      <span className="food-difficulty">{food.difficulty || 'Trung bình'}</span>
                    </div>
                    <Link to={`/foods/${food.id}`} className="view-detail-btn">
                      Xem chi tiết
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
                setDifficulty('')
                setDietType('')
                setCurrentPage(1)
              }} className="clear-filters-btn">
                Xóa bộ lọc
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && foods.length > 0 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ‹
              </button>
              <button className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>
                1
              </button>
              <button className={`page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>
                2
              </button>
              <button className={`page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>
                3
              </button>
              <button 
                className="page-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ›
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default FoodList