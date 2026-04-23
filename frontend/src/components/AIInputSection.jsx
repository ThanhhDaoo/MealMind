import { useState } from 'react'

const AIInputSection = () => {
  const [ingredients, setIngredients] = useState('')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const handleGenerate = async () => {
    setLoading(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setSuggestions([
        {
          id: 1,
          name: 'Phở Bò Tái',
          time: '45 phút',
          price: '75,000đ',
          image: 'https://via.placeholder.com/300x300?text=Phở+Bò'
        },
        {
          id: 2,
          name: 'Bún Chả Hà Nội',
          time: '30 phút',
          price: '65,000đ',
          image: 'https://via.placeholder.com/300x300?text=Bún+Chả'
        },
        {
          id: 3,
          name: 'Cơm Tấm Sườn',
          time: '25 phút',
          price: '55,000đ',
          image: 'https://via.placeholder.com/300x300?text=Cơm+Tấm'
        }
      ])
      setLoading(false)
    }, 2000)
  }

  return (
    <section className="ai-input-section">
      <div className="glass-card large">
        <h2>🤖 AI Gợi Ý Thông Minh</h2>
        <div className="input-group">
          <div className="input-field">
            <label>Bạn có gì trong bếp?</label>
            <input
              type="text"
              placeholder="VD: thịt bò, hành tây, bánh phở..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label>Ngân sách (VNĐ)</label>
            <input
              type="text"
              placeholder="VD: 100,000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </div>
        
        <button 
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="loading-spinner-small"></div>
              Đang tạo gợi ý...
            </>
          ) : (
            '✨ Generate món ăn'
          )}
        </button>

        {/* Results */}
        {suggestions.length > 0 && (
          <div className="ai-results fade-in">
            <h3>🎯 Gợi ý cho bạn:</h3>
            <div className="suggestions-grid">
              {suggestions.map(suggestion => (
                <div key={suggestion.id} className="suggestion-card">
                  <img src={suggestion.image} alt={suggestion.name} />
                  <div className="suggestion-info">
                    <h4>{suggestion.name}</h4>
                    <div className="suggestion-meta">
                      <span>⏱️ {suggestion.time}</span>
                      <span>💰 {suggestion.price}</span>
                    </div>
                    <button className="btn-outline">Xem chi tiết</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AIInputSection