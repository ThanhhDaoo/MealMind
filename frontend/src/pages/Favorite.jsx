import { useState, useEffect } from 'react'
import FoodCard from '../components/FoodCard'
import { foodService } from '../services/foodService'

const Favorite = () => {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteData = await foodService.getFavoriteFoods()
        setFavorites(favoriteData)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  return (
    <div className="favorites">
      <h1>Món ăn yêu thích</h1>
      
      {loading ? (
        <p>Đang tải...</p>
      ) : favorites.length > 0 ? (
        <div className="food-grid">
          {favorites.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <p>Bạn chưa có món ăn yêu thích nào</p>
          <p>Hãy khám phá và thêm những món ăn bạn thích!</p>
        </div>
      )}
    </div>
  )
}

export default Favorite