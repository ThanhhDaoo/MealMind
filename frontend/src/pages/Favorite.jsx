import { useState, useEffect } from 'react'

const Favorite = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Load favorites from localStorage or API
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <div className="no-favorites">
          <h2>Chưa có món ăn yêu thích</h2>
          <p>Hãy thêm những món ăn bạn yêu thích để xem chúng ở đây!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Món ăn yêu thích</h1>
        <p>Những món ăn bạn đã lưu lại</p>
      </div>

      <div className="food-grid">
        {favorites.map(food => (
          <div key={food.id} className="food-card">
            <div className="food-image-container">
              <img src={food.image} alt={food.name} className="food-image" />
              <div className="food-overlay">
                <button 
                  className="remove-favorite-btn"
                  onClick={() => removeFavorite(food.id)}
                  title="Xóa khỏi yêu thích"
                >
                  ❤️
                </button>
              </div>
            </div>
            <div className="food-info">
              <h3 className="food-name">{food.name}</h3>
              <p className="food-description">{food.description}</p>
              <div className="food-stats">
                <span>⏱️ {food.cookTime}</span>
                <span>🔥 {food.calories} kcal</span>
                <span>👥 {food.servings} người</span>
              </div>
              <a href={`/foods/${food.id}`} className="btn-outline">
                Xem chi tiết
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorite