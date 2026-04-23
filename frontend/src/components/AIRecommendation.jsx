import { useState } from 'react'
import './AIRecommendation.css'

const AIRecommendation = () => {
  const [userInput, setUserInput] = useState({
    ingredients: '',
    dietaryRestrictions: '',
    mealType: 'Keto'
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 2000)
  }

  const dietTypes = ['Keto', 'Vegan', 'Low-carb']

  return (
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
            <div className="form-group full-width">
              <label>TÔI ĐANG CÓ</label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Thịt bò, cà chua, hành tây, măng tây..."
                  value={userInput.ingredients}
                  onChange={(e) => setUserInput({...userInput, ingredients: e.target.value})}
                />
                <span className="input-icon">📦</span>
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
                  <span className="input-icon">⚡</span>
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
      {showResults && (
        <section className="recommendations-section">
          <div className="section-header">
            <div>
              <h2>Thực đơn dành riêng cho bạn</h2>
              <p>Dựa trên nguyên liệu: <span className="highlight">Thịt bò, Cà chua</span></p>
            </div>
            <button className="refresh-btn">
              Làm mới kết quả <span>🔄</span>
            </button>
          </div>

          {/* Bento Grid of Recommendations */}
          <div className="recommendations-grid">
            {/* Hero Recommendation Card */}
            <div className="hero-card">
              <div className="hero-card-content">
                <div className="hero-image">
                  <img 
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop" 
                    alt="Bò Áp Chảo Cà Chua Bi & Măng Tây" 
                  />
                  <div className="hero-badge">
                    <span>⭐</span>
                    Gợi ý tốt nhất
                  </div>
                </div>
                <div className="hero-info">
                  <div className="hero-meta">
                    <span className="time-badge">
                      <span>⏱️</span> 12 Phút
                    </span>
                    <span className="calorie-badge">
                      <span>🔥</span> 450 kcal
                    </span>
                  </div>
                  <h3>Bò Áp Chảo Cà Chua Bi & Măng Tây</h3>
                  <p>Món ăn đậm đà, giàu đạm và vitamin, chế biến cực nhanh chỉ với 1 chảo duy nhất. Phù hợp cho bữa tối sau giờ làm việc bận rộn.</p>
                  <div className="hero-features">
                    <div className="feature-item">
                      <span className="check-icon">✅</span>
                      <span>Tối ưu lượng Protein</span>
                    </div>
                    <div className="feature-item">
                      <span className="check-icon">✅</span>
                      <span>Ít Carb, không đường</span>
                    </div>
                  </div>
                  <button className="view-recipe-btn">
                    Xem công thức chi tiết
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Recommendations */}
            <div className="secondary-cards">
              {/* Mini Card 1 */}
              <div className="mini-card">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop" 
                  alt="Salad Bò Trộn Cà Chua Ý" 
                />
                <div className="mini-card-info">
                  <span className="mini-card-category">Món Nhẹ</span>
                  <h4>Salad Bò Trộn Cà Chua Ý</h4>
                  <div className="mini-card-meta">
                    <span><span>⏱️</span> 8'</span>
                    <span><span>🔥</span> Dễ</span>
                  </div>
                </div>
              </div>

              {/* Mini Card 2 */}
              <div className="mini-card">
                <img 
                  src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop" 
                  alt="Súp Bò Hầm Cà Chua Cay" 
                />
                <div className="mini-card-info">
                  <span className="mini-card-category">Súp & Hầm</span>
                  <h4>Súp Bò Hầm Cà Chua Cay</h4>
                  <div className="mini-card-meta">
                    <span><span>⏱️</span> 15'</span>
                    <span><span>🔥</span> Trung bình</span>
                  </div>
                </div>
              </div>

              {/* AI Tip Card */}
              <div className="ai-tip-card">
                <div className="tip-icon">
                  💡
                </div>
                <div className="tip-content">
                  <h4>Mẹo AI cho bạn</h4>
                  <p>Thịt bò sẽ mềm hơn nếu bạn ướp với một chút dầu oliu và muối trong 5 phút trước khi nấu ở nhiệt độ cao.</p>
                  <button className="tip-btn">Khám phá thêm mẹo</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default AIRecommendation