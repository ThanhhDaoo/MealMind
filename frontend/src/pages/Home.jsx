import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { foodService } from '../services/foodService'
import './Home.css'

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([])
  const [pantryItems, setPantryItems] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userStats] = useState({
    calories: 1420,
    caloriesGoal: 2000,
    protein: 85,
    proteinGoal: 120,
    carbs: 142,
    carbsGoal: 200,
    fats: 38,
    fatsGoal: 65
  })

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Load data from API
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await foodService.getAllFoods({ size: 6 })
      const foods = response.content || response || []
      setFeaturedFoods(foods)
      
      // Sample pantry items
      setPantryItems([
        { id: 1, name: 'Trứng tươi', quantity: '6 quả', expiry: '3 ngày', status: 'warning', icon: 'egg' },
        { id: 2, name: 'Rau bina baby', quantity: '250g', expiry: 'Tươi', status: 'good', icon: 'eco' },
        { id: 3, name: 'Sữa chua Hy Lạp', quantity: '1 hộp', expiry: 'Ít đường', status: 'good', icon: 'nutrition' },
        { id: 4, name: 'Cà chua cherry', quantity: '500g', expiry: '5 ngày', status: 'good', icon: 'local_florist' },
        { id: 5, name: 'Thịt gà', quantity: '1kg', expiry: '2 ngày', status: 'warning', icon: 'restaurant' }
      ])
    } catch (error) {
      console.error('Error loading data:', error)
      // Use fallback data if API fails
      setFeaturedFoods([
        {
          id: 1,
          name: 'Salad Lúa Mạch Quinoa',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
          category: 'Địa Trung Hải',
          cookingTime: 15
        },
        {
          id: 2,
          name: 'Poke Bowl Cá Hồi',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
          category: 'Châu Á',
          cookingTime: 20
        }
      ])
      
      setPantryItems([
        { id: 1, name: 'Trứng tươi', quantity: '6 quả', expiry: '3 ngày', status: 'warning', icon: 'egg' },
        { id: 2, name: 'Rau bina baby', quantity: '250g', expiry: 'Tươi', status: 'good', icon: 'eco' },
        { id: 3, name: 'Sữa chua Hy Lạp', quantity: '1 hộp', expiry: 'Ít đường', status: 'good', icon: 'nutrition' },
        { id: 4, name: 'Cà chua cherry', quantity: '500g', expiry: '5 ngày', status: 'good', icon: 'local_florist' },
        { id: 5, name: 'Thịt gà', quantity: '1kg', expiry: '2 ngày', status: 'warning', icon: 'restaurant' }
      ])
    }
  }

  const featuredMeal = featuredFoods[0] || {
    id: 1,
    name: 'Salad Lúa Mạch & Bơ Tươi',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&crop=center',
    category: 'Địa Trung Hải',
    cookingTime: 15
  }

  // Dynamic background image for featured meal
  useEffect(() => {
    if (featuredMeal && featuredMeal.image) {
      const mealCard = document.querySelector('.featured-meal-card')
      if (mealCard) {
        mealCard.style.backgroundImage = `url(${featuredMeal.image})`
      }
    }
  }, [featuredMeal])

  return (
    <div className="home-dashboard">
      <div className="dashboard-container">
        {/* Hero Card */}
        <section className="hero-card">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="glass-card">
              <h2 className="hero-title">
                Hôm nay nấu gì, Linh?
              </h2>
              <p className="hero-subtitle">
                Bạn có {pantryItems.length} nguyên liệu trong tủ lạnh có thể tạo ra món Salad Lúa Mạch & Bơ tuyệt vời.
              </p>
            </div>
          </div>
        </section>

        {/* Stats & AI Tip Row */}
        <div className="stats-ai-row">
          {/* Stats Progress */}
          <div className="stats-card">
            <div className="calorie-progress">
              <div className="progress-circle">
                <svg className="progress-svg">
                  <circle 
                    className="progress-bg" 
                    cx="64" 
                    cy="64" 
                    r="58" 
                  />
                  <circle 
                    className="progress-fill" 
                    cx="64" 
                    cy="64" 
                    r="58"
                    style={{
                      strokeDasharray: '364.4',
                      strokeDashoffset: `${364.4 - (364.4 * userStats.calories / userStats.caloriesGoal)}`
                    }}
                  />
                </svg>
                <div className="progress-content">
                  <span className="progress-value">{userStats.calories.toLocaleString()}</span>
                  <span className="progress-label">CALORIES</span>
                </div>
              </div>
              <p className="progress-text">
                {Math.round((userStats.calories / userStats.caloriesGoal) * 100)}% mục tiêu đạt được
              </p>
            </div>

            <div className="nutrition-bars">
              <div className="nutrition-item">
                <div className="nutrition-header">
                  <span>PROTEIN</span>
                  <span>{userStats.protein}G / {userStats.proteinGoal}G</span>
                </div>
                <div className="nutrition-bar">
                  <div 
                    className="nutrition-fill protein" 
                    style={{ width: `${(userStats.protein / userStats.proteinGoal) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="nutrition-item">
                <div className="nutrition-header">
                  <span>CARBS</span>
                  <span>{userStats.carbs}G / {userStats.carbsGoal}G</span>
                </div>
                <div className="nutrition-bar">
                  <div 
                    className="nutrition-fill carbs" 
                    style={{ width: `${(userStats.carbs / userStats.carbsGoal) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="nutrition-item">
                <div className="nutrition-header">
                  <span>CHẤT BÉO</span>
                  <span>{userStats.fats}G / {userStats.fatsGoal}G</span>
                </div>
                <div className="nutrition-bar">
                  <div 
                    className="nutrition-fill fats" 
                    style={{ width: `${(userStats.fats / userStats.fatsGoal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Nutrition Tip */}
          <div className="ai-tip-card">
            <div className="ai-icon">
              <span className="material-icons">auto_awesome</span>
            </div>
            <div className="ai-content">
              <h4 className="ai-title">Gợi ý AI hàng ngày</h4>
              <p className="ai-text">
                "Tăng lượng rau bina 20% hôm nay có thể giúp cân bằng lượng sắt sau buổi chạy bộ sáng."
              </p>
            </div>
            <Link to="/ai-recommendation" className="ai-button">
              XEM GỢI Ý
              <span className="material-icons">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Bento Grid Content */}
        <div className="bento-grid">
          {/* AI Meal of the Day */}
          <div className="featured-meal-card">
            <div className="meal-overlay"></div>
            <div className="meal-content">
              <div className="meal-info">
                <div className="meal-tags">
                  <span className="meal-tag">{featuredMeal.category || 'Địa Trung Hải'}</span>
                  <span className="meal-tag">{featuredMeal.cookingTime || 15} PHÚT</span>
                </div>
                <h3 className="meal-title">{featuredMeal.name}</h3>
                <p className="meal-description">
                  Món ăn giàu protein, nhẹ nhàng hoàn hảo để duy trì sự tập trung suốt buổi chiều.
                </p>
              </div>
              <div className="meal-actions">
                <button className="meal-bookmark">
                  <span className="material-icons">bookmark</span>
                </button>
                <Link to={`/foods/${featuredMeal.id}`} className="meal-cook-btn">
                  Nấu ngay
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-content">
            {/* Your Pantry Section */}
            <div className="pantry-card">
              <div className="pantry-header">
                <h3 className="pantry-title">Tủ lạnh của bạn</h3>
                <button className="pantry-manage">QUẢN LÝ</button>
              </div>
              
              <div className="pantry-items">
                {pantryItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="pantry-item">
                    <div className="pantry-icon">
                      <span className="material-icons">{item.icon}</span>
                    </div>
                    <div className="pantry-info">
                      <p className="pantry-name">{item.name}</p>
                      <p className="pantry-details">{item.quantity} • {item.expiry}</p>
                    </div>
                    <div className={`pantry-status ${item.status}`}></div>
                  </div>
                ))}
              </div>
              
              <button className="add-item-btn">
                + Thêm nguyên liệu
              </button>
            </div>

            {/* Weekly Saver Tip */}
            <div className="saver-card">
              <span className="saver-icon material-icons">lightbulb</span>
              <div className="saver-content">
                <p className="saver-label">Tiết kiệm tuần</p>
                <p className="saver-text">
                  Bạn đã tiết kiệm 280,000đ tuần này bằng cách sử dụng nguyên liệu có sẵn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB for Quick AI */}
      <Link to="/ai-recommendation" className="fab-button">
        <span className="material-icons">auto_awesome</span>
      </Link>
    </div>
  )
}

export default Home