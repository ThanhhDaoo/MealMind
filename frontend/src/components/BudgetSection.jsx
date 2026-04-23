import { useState } from 'react'

const BudgetSection = () => {
  const [activeTab, setActiveTab] = useState('50k')

  const budgetOptions = {
    '50k': [
      { id: 1, name: 'Bánh Mì Thịt Nướng', price: '25,000đ', time: '10 phút', image: '🥖' },
      { id: 2, name: 'Phở Gà', price: '45,000đ', time: '30 phút', image: '🍜' },
      { id: 3, name: 'Cơm Chiên Dương Châu', price: '40,000đ', time: '20 phút', image: '🍚' },
      { id: 4, name: 'Bún Bò Huế', price: '50,000đ', time: '45 phút', image: '🍲' }
    ],
    '100k': [
      { id: 5, name: 'Phở Bò Tái', price: '75,000đ', time: '45 phút', image: '🍜' },
      { id: 6, name: 'Bún Chả Hà Nội', price: '85,000đ', time: '35 phút', image: '🍲' },
      { id: 7, name: 'Cơm Tấm Sườn Nướng', price: '90,000đ', time: '40 phút', image: '🍚' },
      { id: 8, name: 'Bánh Xèo Miền Tây', price: '95,000đ', time: '50 phút', image: '🥞' }
    ],
    '200k': [
      { id: 9, name: 'Lẩu Thái Hải Sản', price: '180,000đ', time: '60 phút', image: '🍲' },
      { id: 10, name: 'Bò Nướng Lá Lốt', price: '150,000đ', time: '45 phút', image: '🥩' },
      { id: 11, name: 'Cá Kho Tộ', price: '120,000đ', time: '40 phút', image: '🐟' },
      { id: 12, name: 'Gà Nướng Mật Ong', price: '160,000đ', time: '55 phút', image: '🍗' }
    ]
  }

  return (
    <section className="budget-section">
      <h2>💰 Theo ngân sách</h2>
      <p className="section-subtitle">Chọn món ăn phù hợp với túi tiền</p>

      <div className="budget-tabs">
        {Object.keys(budgetOptions).map(budget => (
          <button
            key={budget}
            className={`tab-btn ${activeTab === budget ? 'active' : ''}`}
            onClick={() => setActiveTab(budget)}
          >
            {budget}
          </button>
        ))}
      </div>

      <div className="budget-content">
        <div className="food-grid">
          {budgetOptions[activeTab].map(food => (
            <div key={food.id} className="food-card budget-card">
              <div className="food-emoji">{food.image}</div>
              <div className="food-info">
                <h3>{food.name}</h3>
                <div className="food-meta">
                  <span className="price">💰 {food.price}</span>
                  <span className="time">⏱️ {food.time}</span>
                </div>
                <button className="btn-outline">Xem chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BudgetSection