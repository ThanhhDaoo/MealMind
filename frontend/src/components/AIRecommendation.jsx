import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aiService } from '../services/aiService'
import './AIRecommendation.css'

const AIRecommendation = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState({
    ingredients: '',
    dietaryRestrictions: '',
    mealType: 'Keto'
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!userInput.ingredients.trim()) {
      setError('Vui lòng nhập nguyên liệu')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const results = await aiService.getRecommendations(
        userInput.ingredients,
        userInput.dietaryRestrictions,
        userInput.mealType
      )
      setRecommendations(results)
      setShowResults(true)
    } catch (err) {
      console.error('Error getting recommendations:', err)
      setError('Không thể lấy gợi ý. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleViewRecipe = (foodId) => {
    navigate(`/food/${foodId}`)
  }
  
  const handleRefresh = () => {
    handleSubmit({ preventDefault: () => {} })
  }

  const dietTypes = ['Keto', 'Vegan', 'Low-carb']

  return (
    <div className="ai-page-background">
      <div className="ai-recommendation-container">
      {/* Hero Section & AI Input */}
      <section className="hero-section">
        <div className="hero-header">
          <span className="ai-badge">THÔNG MINH & TẬN TÂM</span>
          <h1>Gợi ý từ Trí tuệ nhân tạo</h1>
          <p>Tạo ra những bữa ăn hoàn hảo dựa trên nguyên liệu bạn sẵn có và sở thích cá nhân.</p>
        </div>

        {/* AI Chat Area */}
        <div className="ai-chat-area">
          <div className="ai-greeting-section">
            <div className="ai-avatar-container">
              <div className="ai-pulse-ring"></div>
              <div className="ai-avatar">
                ✨
              </div>
            </div>
            <div className="ai-greeting-text">
              <h3>Trợ lý AI đang sẵn sàng giúp bạn</h3>
              <p>Cung cấp nguyên liệu để tôi bắt đầu...</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="ai-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group full-width">
              <label>TÔI ĐANG CÓ</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="bò, cà chua, hành tây, măng tây..."
                  value={userInput.ingredients}
                  onChange={(e) => setUserInput({...userInput, ingredients: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>YÊU CẦU ĐẶC BIỆT</label>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Dưới 15 phút, ít dầu mỡ..."
                    value={userInput.dietaryRestrictions}
                    onChange={(e) => setUserInput({...userInput, dietaryRestrictions: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>CHẾ ĐỘ ĂN</label>
                <div className="diet-options">
                  {dietTypes.map(diet => (
                    <button
                      key={diet}
                      type="button"
                      className={`diet-btn ${userInput.mealType === diet ? 'active' : ''}`}
                      onClick={() => setUserInput({...userInput, mealType: diet})}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="generate-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Đang tạo gợi ý...
                </>
              ) : (
                <>
                  <span>🍽️</span>
                  Tạo thực đơn ngay
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* AI Output / Recommendations */}
      {showResults && recommendations.length > 0 && (
        <section className="recommendations-section">
          <div className="section-header">
            <div>
              <h2>Thực đơn dành riêng cho bạn</h2>
              <p>Dựa trên nguyên liệu: <span className="highlight">{userInput.ingredients}</span></p>
            </div>
            <button className="refresh-btn" onClick={handleRefresh} disabled={isLoading}>
              Làm mới kết quả <span>🔄</span>
            </button>
          </div>

          {/* Bento Grid of Recommendations */}
          <div className="recommendations-grid">
            {/* Hero Recommendation Card */}
            {recommendations[0] && (
              <div className="hero-card">
                <div className="hero-card-content">
                  <div className="hero-image">
                    <img 
                      src={recommendations[0].imageUrl || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"} 
                      alt={recommendations[0].name}
                    />
                    <div className="hero-badge">
                      <span>⭐</span>
                      Gợi ý tốt nhất
                    </div>
                  </div>
                  <div className="hero-info">
                    <div className="hero-meta">
                      <span className="time-badge">
                        <span>⏱️</span> {recommendations[0].totalTime || 15} Phút
                      </span>
                      <span className="calorie-badge">
                        <span>🔥</span> {recommendations[0].calories || 450} kcal
                      </span>
                    </div>
                    <h3>{recommendations[0].name}</h3>
                    <p>{recommendations[0].description || 'Món ăn ngon và bổ dưỡng'}</p>
                    <div className="hero-features">
                      {recommendations[0].protein && (
                        <div className="feature-item">
                          <span className="check-icon">✅</span>
                          <span>Giàu Protein ({recommendations[0].protein}g)</span>
                        </div>
                      )}
                      {recommendations[0].carbs && recommendations[0].carbs < 30 && (
                        <div className="feature-item">
                          <span className="check-icon">✅</span>
                          <span>Ít Carb ({recommendations[0].carbs}g)</span>
                        </div>
                      )}
                    </div>
                    <button 
                      className="view-recipe-btn"
                      onClick={() => handleViewRecipe(recommendations[0].id)}
                    >
                      Xem công thức chi tiết
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Recommendations */}
            <div className="secondary-cards">
              {/* Mini Card 1 */}
              {recommendations[1] && (
                <div className="mini-card" onClick={() => handleViewRecipe(recommendations[1].id)}>
                  <img 
                    src={recommendations[1].imageUrl || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop"} 
                    alt={recommendations[1].name}
                  />
                  <div className="mini-card-info">
                    <span className="mini-card-category">{recommendations[1].dietType || 'Món Ngon'}</span>
                    <h4>{recommendations[1].name}</h4>
                    <div className="mini-card-meta">
                      <span><span>⏱️</span> {recommendations[1].totalTime || 10}'</span>
                      <span><span>🔥</span> {recommendations[1].calories || 300} kcal</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mini Card 2 */}
              {recommendations[2] && (
                <div className="mini-card" onClick={() => handleViewRecipe(recommendations[2].id)}>
                  <img 
                    src={recommendations[2].imageUrl || "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop"} 
                    alt={recommendations[2].name}
                  />
                  <div className="mini-card-info">
                    <span className="mini-card-category">{recommendations[2].dietType || 'Món Ngon'}</span>
                    <h4>{recommendations[2].name}</h4>
                    <div className="mini-card-meta">
                      <span><span>⏱️</span> {recommendations[2].totalTime || 12}'</span>
                      <span><span>🔥</span> {recommendations[2].calories || 350} kcal</span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Tip Card */}
              <div className="ai-tip-card">
                <div className="tip-icon">
                  💡
                </div>
                <div className="tip-content">
                  <h4>Mẹo AI cho bạn</h4>
                  <p>
                    {userInput.mealType === 'Keto' && 'Chế độ Keto giúp giảm cân hiệu quả bằng cách giảm carb và tăng chất béo lành mạnh.'}
                    {userInput.mealType === 'Vegan' && 'Chế độ ăn chay giúp cải thiện sức khỏe tim mạch và giảm nguy cơ bệnh mãn tính.'}
                    {userInput.mealType === 'Low-carb' && 'Giảm carb giúp kiểm soát đường huyết và hỗ trợ giảm cân hiệu quả.'}
                  </p>
                  <button className="tip-btn">Khám phá thêm mẹo</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {showResults && recommendations.length === 0 && !isLoading && (
        <section className="recommendations-section">
          <div className="no-results">
            <h3>Không tìm thấy món ăn phù hợp</h3>
            <p>Vui lòng thử với nguyên liệu khác hoặc thay đổi yêu cầu</p>
          </div>
        </section>
      )}
      </div>
    </div>
  )
}

export default AIRecommendation