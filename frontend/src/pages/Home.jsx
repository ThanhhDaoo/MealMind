import { useState, useEffect } from 'react'
import FoodCard from '../components/FoodCard'
import AIInputSection from '../components/AIInputSection'
import WeeklyPlanner from '../components/WeeklyPlanner'
import BudgetSection from '../components/BudgetSection'
import { foodService } from '../services/foodService'

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedFoods = async () => {
      try {
        const foods = await foodService.getFeaturedFoods()
        setFeaturedFoods(foods)
      } catch (error) {
        console.error('Error fetching featured foods:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedFoods()
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-headline">
            👉 Hôm nay ăn gì? Để AI chọn giúp bạn 🍜
          </h1>
          <p className="hero-subtitle">
            Nhập nguyên liệu hoặc ngân sách, nhận ngay gợi ý món ăn trong 3 giây
          </p>
          <div className="hero-cta">
            <button className="btn-primary">
              👉 Gợi ý món ngay
            </button>
            <button className="btn-secondary">
              👉 Lên kế hoạch tuần
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="mockup-card">
            <div className="ai-suggestion">
              <span className="ai-badge">🤖 AI Gợi ý</span>
              <h3>Phở Bò Tái</h3>
              <p>Phù hợp với ngân sách 80k</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Input Section */}
      <AIInputSection />

      {/* Featured Foods */}
      <section className="featured-foods">
        <h2>Món ăn được gợi ý</h2>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang tải...</p>
          </div>
        ) : (
          <div className="food-grid">
            {featuredFoods.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </section>

      {/* Weekly Planner */}
      <WeeklyPlanner />

      {/* Budget Section */}
      <BudgetSection />
    </div>
  )
}

export default Home