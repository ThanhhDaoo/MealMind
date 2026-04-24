import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { foodService } from '../services/foodService'
import './Home.css'

const Home = () => {
  const [ingredients, setIngredients] = useState('')
  const [budget, setBudget] = useState('')
  const [activeCategory, setActiveCategory] = useState('trending')
  const [featuredFoods, setFeaturedFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Load featured foods from API
  useEffect(() => {
    loadFeaturedFoods()
  }, [])

  const loadFeaturedFoods = async () => {
    try {
      setLoading(true)
      const response = await foodService.getAllFoods({ size: 12 })
      const foods = response.content || response || []
      setFeaturedFoods(foods)
    } catch (error) {
      console.error('Error loading featured foods:', error)
      setFeaturedFoods(sampleFoods)
    } finally {
      setLoading(false)
    }
  }

  // Sample fallback data
  const sampleFoods = [
    { id: 1, name: 'Salad Cầu Vồng Quinoa', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', rating: 4.8, cookingTime: 15, category: 'healthy' },
    { id: 2, name: 'Poke Bowl Cá Hồi', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', rating: 4.9, cookingTime: 20, category: 'trending' },
    { id: 3, name: 'Pasta Pesto Tươi', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', rating: 4.7, cookingTime: 25, category: 'comfort' },
    { id: 4, name: 'Ức Gà Nướng Thảo Mộc', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400', rating: 4.8, cookingTime: 30, category: 'protein' },
    { id: 5, name: 'Phở Bò Truyền Thống', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400', rating: 4.9, cookingTime: 180, category: 'vietnamese' },
    { id: 6, name: 'Smoothie Bowl Dâu', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400', rating: 4.6, cookingTime: 10, category: 'healthy' }
  ]

  const categories = [
    { id: 'trending', name: 'Xu hướng', icon: '🔥', color: '#00A86B' },
    { id: 'healthy', name: 'Healthy', icon: '🥗', color: '#00C851' },
    { id: 'vietnamese', name: 'Việt Nam', icon: '🇻🇳', color: '#008f5a' },
    { id: 'comfort', name: 'Comfort Food', icon: '🍝', color: '#4CAF50' },
    { id: 'protein', name: 'High Protein', icon: '💪', color: '#66BB6A' },
    { id: 'quick', name: 'Nhanh gọn', icon: '⚡', color: '#81C784' }
  ]

  const stats = [
    { label: 'Món ăn', value: '2,500+', icon: '🍽️' },
    { label: 'Người dùng', value: '50K+', icon: '👥' },
    { label: 'Đánh giá', value: '4.9★', icon: '⭐' },
    { label: 'Quốc gia', value: '25+', icon: '🌍' }
  ]

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Chào buổi sáng'
    if (hour < 18) return 'Chào buổi chiều'
    return 'Chào buổi tối'
  }

  const getMealSuggestion = () => {
    const hour = currentTime.getHours()
    if (hour < 10) return 'Bữa sáng'
    if (hour < 14) return 'Bữa trưa'
    if (hour < 18) return 'Bữa chiều'
    return 'Bữa tối'
  }

  const handleGenerateMenu = () => {
    const params = new URLSearchParams()
    if (ingredients) params.append('ingredients', ingredients)
    if (budget) params.append('budget', budget)
    window.location.href = `/ai-recommendation?${params.toString()}`
  }

  const filteredFoods = featuredFoods.filter(food => {
    if (activeCategory === 'trending') return food.rating >= 4.7
    if (activeCategory === 'healthy') return food.category === 'Healthy' || food.dietType === 'Vegetarian'
    if (activeCategory === 'vietnamese') return food.cuisine === 'Vietnamese'
    if (activeCategory === 'quick') return food.cookingTime <= 30
    if (activeCategory === 'protein') return food.protein >= 25
    return food.category?.toLowerCase().includes(activeCategory)
  }).slice(0, 6)

  return (
    <div className="home-modern">
      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="floating-elements">
            <div className="float-item">🍜</div>
            <div className="float-item">🥗</div>
            <div className="float-item">🍝</div>
            <div className="float-item">🍲</div>
          </div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="greeting-section">
              <span className="greeting">{getGreeting()}</span>
              <span className="meal-time">Đã đến giờ {getMealSuggestion().toLowerCase()}</span>
            </div>
            
            <h1 className="hero-title">
              Khám phá thế giới ẩm thực với
              <span className="gradient-text"> AI MealMind</span>
            </h1>
            
            <p className="hero-subtitle">
              Từ nguyên liệu đơn giản đến những món ăn tuyệt vời. 
              Hãy để AI giúp bạn tạo ra bữa ăn hoàn hảo.
            </p>

            {/* Quick AI Input */}
            <div className="quick-input-section">
              <div className="input-group">
                <div className="input-wrapper">
                  <span className="input-icon">🥬</span>
                  <input
                    type="text"
                    placeholder="Tôi có: thịt bò, cà chua, hành tây..."
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="modern-input"
                  />
                </div>
                <button className="ai-generate-btn" onClick={handleGenerateMenu}>
                  <span className="btn-icon">✨</span>
                  <span>Tạo món ngay</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-actions">
              <Link to="/ai-recommendation" className="btn-primary">
                <span>🤖</span>
                Gợi ý AI
              </Link>
              <Link to="/foods" className="btn-secondary">
                <span>🍽️</span>
                Khám phá món ăn
              </Link>
              <Link to="/meal-plan" className="btn-outline">
                <span>📅</span>
                Lập kế hoạch
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <span className="stat-icon">{stat.icon}</span>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Khám phá theo danh mục</h2>
            <p>Tìm món ăn phù hợp với sở thích của bạn</p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                style={{ '--category-color': category.color }}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Món ăn nổi bật</h2>
            <Link to="/foods" className="view-all-btn">
              Xem tất cả
              <span>→</span>
            </Link>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="food-card-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-meta"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="foods-grid">
              {filteredFoods.map((food) => (
                <Link key={food.id} to={`/foods/${food.id}`} className="food-card-modern">
                  <div className="food-image-container">
                    <img 
                      src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} 
                      alt={food.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
                      }}
                    />
                    <div className="food-overlay">
                      <button className="favorite-btn">
                        <span>♡</span>
                      </button>
                      <div className="rating-badge">
                        <span>⭐</span>
                        <span>{food.rating || '4.8'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="food-content">
                    <h3 className="food-title">{food.name}</h3>
                    <div className="food-meta">
                      <span className="time">
                        <span>⏱️</span>
                        {food.cookingTime || food.totalTime || 25} phút
                      </span>
                      <span className="difficulty">
                        <span>👨‍🍳</span>
                        {food.difficulty || 'Dễ'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="ai-cta-section">
        <div className="container">
          <div className="ai-cta-card">
            <div className="ai-cta-content">
              <div className="ai-avatar">
                <div className="ai-pulse"></div>
                <span>🤖</span>
              </div>
              <div className="ai-text">
                <h3>Trợ lý AI của bạn đang chờ</h3>
                <p>Nhập nguyên liệu bạn có, AI sẽ gợi ý món ăn phù hợp trong vài giây</p>
              </div>
            </div>
            <Link to="/ai-recommendation" className="ai-cta-btn">
              Bắt đầu ngay
              <span>✨</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <div className="container">
          <div className="quick-actions-grid">
            <Link to="/meal-plan" className="action-card meal-plan">
              <div className="action-icon">📅</div>
              <div className="action-content">
                <h4>Lập kế hoạch tuần</h4>
                <p>Quản lý thực đơn 7 ngày</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
            
            <Link to="/favorites" className="action-card favorites">
              <div className="action-icon">❤️</div>
              <div className="action-content">
                <h4>Món yêu thích</h4>
                <p>Lưu những món ăn bạn thích</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
            
            <Link to="/foods" className="action-card explore">
              <div className="action-icon">🔍</div>
              <div className="action-content">
                <h4>Khám phá món mới</h4>
                <p>Hàng nghìn công thức đang chờ</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home