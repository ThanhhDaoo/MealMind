import { useState } from 'react'
import './Home.css'

const Home = () => {
  const [ingredients, setIngredients] = useState('')
  const [budget, setBudget] = useState('')
  const [activeTab, setActiveTab] = useState('50k')

  // Sample data
  const sampleFoods = {
    '50k': [
      { id: 1, name: 'Cơm Gà Luộc & Salad Dầu Giấm', price: '45,000đ', time: '25 phút', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
      { id: 2, name: 'Bún Bò Viên Tươi Thập Cẩm', price: '50,000đ', time: '30 phút', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400' },
      { id: 3, name: 'Trứng Bác Thịt Bằm & Cơm Chiên', price: '48,000đ', time: '20 phút', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400' }
    ],
    '100k': [
      { id: 4, name: 'Phở Bò Tái', price: '75,000đ', time: '45 phút', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400' },
      { id: 5, name: 'Bún Chả Hà Nội', price: '85,000đ', time: '35 phút', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400' },
      { id: 6, name: 'Cơm Tấm Sườn', price: '90,000đ', time: '40 phút', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400' }
    ],
    '200k': [
      { id: 7, name: 'Lẩu Thái', price: '180,000đ', time: '60 phút', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
      { id: 8, name: 'Bò Nướng', price: '150,000đ', time: '45 phút', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400' },
      { id: 9, name: 'Gà Nướng', price: '160,000đ', time: '55 phút', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400' }
    ]
  }

  const weeklyPlan = [
    { day: 'Thứ 2', breakfast: 'Phở Bò Viên Truyền', lunch: 'Cơm Gà Rán Tỏi', dinner: 'Bún Bò Huế', snack: 'Chè Ba Màu' },
    { day: 'Thứ 3', breakfast: 'Bánh Mì Xíu Mại', lunch: 'Cơm Tấm Sườn', dinner: 'Lẩu Thái Hải Sản', snack: 'Trà Sữa' },
    { day: 'Thứ 4', breakfast: 'Xôi Xéo', lunch: 'Bún Chả Hà Nội', dinner: 'Gà Nướng Mật Ong', snack: 'Bánh Flan' },
    { day: 'Thứ 5', breakfast: 'Cháo Lòng', lunch: 'Mì Quảng', dinner: 'Cá Kho Tộ', snack: 'Sữa Chua' }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-new">
        <div className="hero-content-new">
          <p className="hero-tag">🍜 TỰ TIN VỚI MỌI BỮA ĂN</p>
          <h1 className="hero-title">
            Hôm nay ăn gì? Để <span className="highlight-green">AI</span><br />
            <span className="highlight-green">chọn</span> giúp bạn 🍜
          </h1>
          <p className="hero-desc">
            Nhập nguyên liệu hoặc ngân sách, nhận ngay gợi ý món ăn<br />
            trong 3 giây. Đơn giản, nhanh chóng và phù hợp với bạn!
          </p>
          <div className="hero-buttons">
            <button className="btn-green">Gợi ý ngay</button>
            <button className="btn-outline-white">Lên kế hoạch tuần</button>
          </div>
        </div>
        <div className="hero-image-new">
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" alt="Món ăn ngon" />
          <div className="image-badge">
            <span className="badge-icon">🤖</span>
            <span className="badge-text">AI Gợi ý món ăn</span>
          </div>
        </div>
      </section>

      {/* AI Input Form */}
      <section className="ai-form-section">
        <div className="form-container">
          <h2 className="form-title">Tạo thực đơn ngay lập tức</h2>
          <div className="form-grid">
            <div className="form-field">
              <label>Bạn có gì trong bếp?</label>
              <input 
                type="text" 
                placeholder="VD: Thịt bò, hành tây, cà chua..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Ngân sách (VNĐ)</label>
              <input 
                type="text" 
                placeholder="VD: 100,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-generate">✨ Tạo thực đơn ngay</button>
        </div>
      </section>

      {/* Budget Food Section */}
      <section className="budget-food-section">
        <h2 className="section-title">Món ngon phù hợp ngân sách</h2>
        <div className="budget-tabs-new">
          <button 
            className={`tab-new ${activeTab === '50k' ? 'active' : ''}`}
            onClick={() => setActiveTab('50k')}
          >
            50k
          </button>
          <button 
            className={`tab-new ${activeTab === '100k' ? 'active' : ''}`}
            onClick={() => setActiveTab('100k')}
          >
            100k
          </button>
          <button 
            className={`tab-new ${activeTab === '200k' ? 'active' : ''}`}
            onClick={() => setActiveTab('200k')}
          >
            200k
          </button>
        </div>
        <div className="food-cards-grid">
          {sampleFoods[activeTab].map(food => (
            <div key={food.id} className="food-card-new">
              <img src={food.image} alt={food.name} />
              <div className="food-card-content">
                <h3>{food.name}</h3>
                <div className="food-meta-new">
                  <span>⏱️ {food.time}</span>
                  <span>💰 {food.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Plan */}
      <section className="weekly-plan-section">
        <div className="section-header-new">
          <div>
            <h2 className="section-title">Kế hoạch tuần của bạn</h2>
            <p className="section-subtitle">Dễ dàng quản lý thực đơn cả tuần, tiết kiệm thời gian và chi phí</p>
          </div>
          <button className="btn-create-plan">+ Tạo mới kế hoạch</button>
        </div>
        <div className="weekly-table">
          <table>
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Sáng</th>
                <th>Trưa</th>
                <th>Tối</th>
                <th>Ăn vặt/Tráng miệng</th>
              </tr>
            </thead>
            <tbody>
              {weeklyPlan.map((day, index) => (
                <tr key={index}>
                  <td className="day-cell">{day.day}</td>
                  <td>{day.breakfast}</td>
                  <td>{day.lunch}</td>
                  <td>{day.dinner}</td>
                  <td>{day.snack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Home