import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { foodService } from '../services/foodService'

const FoodDetail = () => {
  const { id } = useParams()
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const foodData = await foodService.getFoodById(id)
        setFood(foodData)
      } catch (error) {
        console.error('Error fetching food:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFood()
  }, [id])

  if (loading) return <p>Đang tải...</p>
  if (!food) return <p>Không tìm thấy món ăn</p>

  return (
    <div className="food-detail">
      <div className="food-header">
        <img src={food.image} alt={food.name} className="food-detail-image" />
        <div className="food-info">
          <h1>{food.name}</h1>
          <p className="food-description">{food.description}</p>
          <div className="food-stats">
            <span>Calories: {food.calories} kcal</span>
            <span>Thời gian: {food.prepTime} phút</span>
            <span>Khó: {food.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="food-content">
        <section className="ingredients">
          <h2>Nguyên liệu</h2>
          <ul>
            {food.ingredients?.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.amount} {ingredient.unit}
              </li>
            ))}
          </ul>
        </section>

        <section className="instructions">
          <h2>Cách làm</h2>
          <ol>
            {food.instructions?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="nutrition">
          <h2>Thông tin dinh dưỡng</h2>
          <div className="nutrition-grid">
            <div>Protein: {food.nutrition?.protein}g</div>
            <div>Carbs: {food.nutrition?.carbs}g</div>
            <div>Fat: {food.nutrition?.fat}g</div>
            <div>Fiber: {food.nutrition?.fiber}g</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FoodDetail