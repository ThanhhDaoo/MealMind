import { Link } from 'react-router-dom'

const FoodCard = ({ food }) => {
  return (
    <div className="food-card glass-card-hover">
      <div className="food-image-container">
        <img src={food.image || 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(food.name)} alt={food.name} className="food-image" />
        <div className="food-overlay">
          <span className="food-category">{food.category}</span>
        </div>
      </div>
      <div className="food-info">
        <h3 className="food-name">{food.name}</h3>
        <p className="food-description">{food.description}</p>
        <div className="food-stats">
          <span className="time">⏱️ {food.prepTime} phút</span>
          <span className="price">💰 {Math.round(food.calories * 0.2)}k</span>
        </div>
        <Link to={`/foods/${food.id}`} className="btn-outline">
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}

export default FoodCard