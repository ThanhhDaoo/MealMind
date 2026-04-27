import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Favorite.css'

const Favorite = () => {
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const viewDetail = (id) => {
    navigate(`/foods/${id}`)
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <div className="favorites-header">
          <h1>Món ăn yêu thích</h1>
          <p>Những món ăn bạn đã lưu lại</p>
        </div>
        <div className="no-favorites">
          <div className="empty-icon">❤️</div>
          <h2>Chưa có món ăn yêu thích</h2>
          <p>Hãy thêm những món ăn bạn yêu thích để xem chúng ở đây!</p>
          <button className="btn-primary" onClick={() => navigate('/foods')}>
            Khám phá món ăn
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Món ăn yêu thích</h1>
        <p>Bạn đã lưu {favorites.length} món ăn</p>
      </div>

      <div className="food-grid">
        {favorites.map(food => (
          <div key={food.id} className="food-card">
            <div className="food-image-container">
              <img 
                src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} 
                alt={food.name} 
                className="food-image" 
              />
              <button 
                className="remove-favorite-btn active"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFavorite(food.id)
                }}
                title="Xóa khỏi yêu thích"
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
            <div className="food-info">
              <h3 className="food-name">{food.name}</h3>
              <p className="food-description">
                {food.description?.substring(0, 100)}
                {food.description?.length > 100 ? '...' : ''}
              </p>
              <div className="food-stats">
                <span>⏱️ {food.cookTime}</span>
                <span>🔥 {food.calories} kcal</span>
                <span>👥 {food.servings} người</span>
              </div>
              <button 
                className="btn-view-detail"
                onClick={() => viewDetail(food.id)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorite