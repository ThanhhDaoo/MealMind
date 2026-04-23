import { useState, useEffect } from 'react'
import './MealPlan.css'

const MealPlan = () => {
  const [weekPlan, setWeekPlan] = useState({
    breakfast: [
      { id: 1, name: 'Smoothie yến mạch', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=200' },
      null,
      { id: 3, name: 'Bánh mì quả bơ', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200' },
      null,
      { id: 5, name: 'Yogurt Hy Lạp', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200' },
      null,
      { id: 7, name: 'Trứng khuấy thảo mộc', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200' }
    ],
    lunch: [
      null,
      { id: 2, name: 'Salad cá hồi', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' },
      { id: 3, name: 'Bowl ngũ cốc', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' },
      null,
      { id: 5, name: 'Súp gà rau củ', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200' },
      null,
      { id: 7, name: 'Ức gà áp chảo', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200' }
    ],
    dinner: [
      { id: 1, name: 'Bít tết thảo mộc', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200' },
      null,
      null,
      { id: 4, name: 'Cá hấp gừng', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200' },
      null,
      { id: 6, name: 'Salad tổng hợp', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' },
      null
    ]
  })
  
  const [shoppingList, setShoppingList] = useState([
    { name: 'Ức gà', amount: '2kg', checked: true },
    { name: 'Cá hồi', amount: '500g', checked: false },
    { name: 'Súp lơ xanh', amount: '2 cây', checked: false },
    { name: 'Dầu ô-liu', amount: '1 chai', checked: false }
  ])

  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
  const meals = ['Bữa sáng', 'Bữa trưa', 'Bữa tối']

  const sampleMeals = [
    { id: 1, name: 'Smoothie yến mạch', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=200', meal: 'breakfast' },
    { id: 2, name: 'Bánh mì quả bơ', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=200', meal: 'breakfast' },
    { id: 3, name: 'Yogurt Hy Lạp', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', meal: 'breakfast' },
    { id: 4, name: 'Salad cá hồi', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200', meal: 'lunch' },
    { id: 5, name: 'Bowl ngũ cốc', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200', meal: 'lunch' },
    { id: 6, name: 'Súp gà rau củ', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200', meal: 'lunch' },
    { id: 7, name: 'Bò lát thảo mộc', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=200', meal: 'dinner' },
    { id: 8, name: 'Cá hấp gừng', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200', meal: 'dinner' },
    { id: 9, name: 'Salad tổng hợp', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200', meal: 'dinner' }
  ]

  const addMealToDay = (mealType, dayIndex, meal) => {
    setWeekPlan(prev => ({
      ...prev,
      [mealType]: prev[mealType].map((item, idx) => idx === dayIndex ? meal : item)
    }))
  }

  const removeMealFromDay = (mealType, dayIndex) => {
    setWeekPlan(prev => ({
      ...prev,
      [mealType]: prev[mealType].map((item, idx) => idx === dayIndex ? null : item)
    }))
  }

  const toggleShoppingItem = (index) => {
    setShoppingList(prev => prev.map((item, idx) => 
      idx === index ? { ...item, checked: !item.checked } : item
    ))
  }

  const totalCalories = 1850
  const totalProtein = 120

  return (
    <div className="meal-plan-container">
      {/* Header */}
      <div className="meal-plan-header">
        <div className="header-content">
          <h1>Lên kế hoạch dinh dưỡng cho tuần mới</h1>
          <p>Cân bằng vị giác và sức khỏe với sự hỗ trợ từ AI của MealMind.</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh">
            <span>🔄</span>
            Xóa tất cả
          </button>
          <button className="btn-generate">
            <span>⚡</span>
            Tạo plan tự động
          </button>
        </div>
      </div>

      <div className="meal-plan-content">
        {/* Weekly Calendar */}
        <div className="weekly-calendar">
          <div className="meal-table-wrapper">
            {/* Header Row */}
            <div className="meal-row-label">Buổi</div>
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className={`day-header ${idx === 0 ? 'active' : ''}`}>
                {day}
              </div>
            ))}

            {/* Breakfast Row */}
            <div className="meal-row-label">Bữa sáng</div>
            {weekPlan.breakfast.map((meal, dayIdx) => (
              <div key={dayIdx} className="meal-cell">
                {meal ? (
                  <div className="meal-item">
                    <img src={meal.image} alt={meal.name} />
                    <span>{meal.name}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeMealFromDay('breakfast', dayIdx)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button className="add-meal-btn">
                    <span>+</span>
                  </button>
                )}
              </div>
            ))}

            {/* Lunch Row */}
            <div className="meal-row-label">Bữa trưa</div>
            {weekPlan.lunch.map((meal, dayIdx) => (
              <div key={dayIdx} className="meal-cell">
                {meal ? (
                  <div className="meal-item">
                    <img src={meal.image} alt={meal.name} />
                    <span>{meal.name}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeMealFromDay('lunch', dayIdx)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button className="add-meal-btn">
                    <span>+</span>
                  </button>
                )}
              </div>
            ))}

            {/* Dinner Row */}
            <div className="meal-row-label">Bữa tối</div>
            {weekPlan.dinner.map((meal, dayIdx) => (
              <div key={dayIdx} className="meal-cell">
                {meal ? (
                  <div className="meal-item">
                    <img src={meal.image} alt={meal.name} />
                    <span>{meal.name}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeMealFromDay('dinner', dayIdx)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button className="add-meal-btn">
                    <span>+</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="meal-plan-sidebar">
          {/* Weekly Summary */}
          <div className="summary-card">
            <div className="summary-header">
              <h3>
                <span>Tổng quan tuần</span>
                <span>📊</span>
              </h3>
            </div>
            <div className="summary-stats">
              <div className="budget-stat">
                <div className="budget-label">
                  <span>Ngân sách ước tính</span>
                  <span>1.200k ₫</span>
                </div>
                <div className="budget-bar">
                  <div className="budget-fill" style={{width: '65%'}}></div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-box">
                  <span className="stat-box-label">Calories</span>
                  <span className="stat-box-value">{totalCalories}</span>
                  <span className="stat-box-unit">kcal / ngày</span>
                </div>
                <div className="stat-box">
                  <span className="stat-box-label">Protein</span>
                  <span className="stat-box-value">{totalProtein}</span>
                  <span className="stat-box-unit">g / ngày</span>
                </div>
              </div>

              <div className="shopping-list-section">
                <h3>DANH SÁCH ĐI CHỢ</h3>
                <div className="shopping-items">
                  {shoppingList.map((item, idx) => (
                    <div key={idx} className="shopping-item">
                      <input 
                        type="checkbox" 
                        checked={item.checked}
                        onChange={() => toggleShoppingItem(idx)}
                        id={`shopping-${idx}`}
                      />
                      <label 
                        htmlFor={`shopping-${idx}`}
                        className={item.checked ? 'checked' : ''}
                      >
                        {item.name} ({item.amount})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button className="share-btn">
              <span>📤</span>
              Chia sẻ kế hoạch
            </button>
          </div>

          {/* AI Recommendation */}
          <div className="ai-recommendation-card">
            <div className="ai-header">
              <span className="ai-badge">AI MÁCH BẠN</span>
            </div>
            <p>"Tuần này bạn đang thiếu Vitamin C. Tôi gợi ý thêm một bữa xế với Cam hoặc Kiwi để tăng cường đề kháng!"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlan