import { Link } from 'react-router-dom'

const FoodCard = ({ food }) => {
  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} className="food-image" />
      <div className="food-info">
        <h3 className="food-name">{food.name}</h3>
        <p className="food-description">{food.description}</p>
        <div className="food-stats">
          <span className="calories">{food.calories} kcal</span>
          <span className="prep-time">{food.prepTime} phút</span>
        </div>
        <Link to={`/foods/${food.id}`} className="view-detail-btn">
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}

export default FoodCard