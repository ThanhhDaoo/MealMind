import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { foodService } from '../services/foodService'
import './FoodList.css'

const FoodList = () => {
  const [sortBy, setSortBy] = useState('trending')
  const [currentPage, setCurrentPage] = useState(1)
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    loadFoods()
    loadFavorites()
  }, [currentPage])

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      const favList = JSON.parse(savedFavorites)
      setFavorites(favList.map(f => f.id))
    }
  }

  const toggleFavorite = (food, e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const savedFavorites = localStorage.getItem('favorites')
    let favoritesList = savedFavorites ? JSON.parse(savedFavorites) : []
    
    const isFavorite = favoritesList.some(fav => fav.id === food.id)
    
    if (isFavorite) {
      // Remove from favorites
      favoritesList = favoritesList.filter(fav => fav.id !== food.id)
      setFavorites(favorites.filter(id => id !== food.id))
    } else {
      // Add to favorites
      const favoriteItem = {
        id: food.id,
        name: food.name,
        description: food.description,
        image: food.image || food.imageUrl,
        cookTime: `${food.totalTime || food.prepTime || food.cookingTime || 20} phút`,
        calories: food.calories || 320,
        servings: food.servings || 2
      }
      favoritesList.push(favoriteItem)
      setFavorites([...favorites, food.id])
    }
    
    localStorage.setItem('favorites', JSON.stringify(favoritesList))
  }

  const isFavorite = (foodId) => {
    return favorites.includes(foodId)
  }

  useEffect(() => {
    loadFoods()
  }, [currentPage])

  const loadFoods = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage - 1,
        size: 6
      }
      
      const response = await foodService.getAllFoods(params)
      
      if (response.content) {
        setFoods(response.content)
        setTotalPages(response.totalPages)
      } else {
        setFoods(response || [])
        setTotalPages(Math.ceil((response?.length || 0) / 6))
      }
      setError(null)
    } catch (err) {
      console.error('Error loading foods:', err)
      setError('Không thể tải danh sách món ăn')
      setFoods([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="food-list-page">
      <div className="food-list-container">
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
                  <span className="food-tag">{food.category || 'Món Ăn'}</span>
                  <button 
                    className={`food-favorite-btn ${isFavorite(food.id) ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(food, e)}
                    title={isFavorite(food.id) ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                  >
                    <span className="material-symbols-outlined" style={{fontVariationSettings: isFavorite(food.id) ? "'FILL' 1" : "'FILL' 0"}}>
                      favorite
                    </span>
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
            <button onClick={loadFoods} className="clear-filters-btn">
              Thử lại
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
      </div>
    </div>
  )
}

export default FoodList
