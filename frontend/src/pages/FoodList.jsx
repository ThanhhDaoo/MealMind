import { useState, useEffect } from 'react'
import FoodCard from '../components/FoodCard'
import { foodService } from '../services/foodService'

const FoodList = () => {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodData = await foodService.getAllFoods({ 
          search: searchTerm, 
          category 
        })
        setFoods(foodData)
      } catch (error) {
        console.error('Error fetching foods:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFoods()
  }, [searchTerm, category])

  return (
    <div className="food-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Tìm kiếm món ăn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">Tất cả</option>
          <option value="breakfast">Sáng</option>
          <option value="lunch">Trưa</option>
          <option value="dinner">Tối</option>
          <option value="snack">Ăn vặt</option>
        </select>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="food-grid">
          {foods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FoodList