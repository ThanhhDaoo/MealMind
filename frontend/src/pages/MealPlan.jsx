import { useState, useEffect } from 'react'
import './MealPlan.css'

const MealPlan = () => {
  const [weekPlan, setWeekPlan] = useState({
    breakfast: Array(7).fill(null),
    lunch: Array(7).fill(null),
    dinner: Array(7).fill(null)
  })
  
  const [shoppingList, setShoppingList] = useState([
    { name: 'Ức gà', amount: '2kg', checked: true },
    { name: 'Cá hồi', amount: '500g', checked: false },
    { name: 'Súp lơ xanh', amount: '2 cây', checked: false },
    { name: 'Dầu ô-liu', amount: '1 chai', checked: false }
  ])

  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
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
            <i className="fas fa-sync-alt"></i>
            Xóa tất cả
          </button>
          <button className="btn-generate">
            <i className="fas fa-magic"></i>
            Tạo plan tự động
          </button>
        </div>
      </div>

      <div className="meal-plan-content">
        {/* Weekly Calendar */}
        <div className="weekly-calendar">
          <table className="meal-table">
            <thead>
              <tr>
                <th className="meal-label">BUỔI</th>
                {daysOfWeek.map((day, idx) => (
                  <th key={idx}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Breakfast Row */}
              <tr>
                <td className="meal-label">Bữa sáng</td>
                {weekPlan.breakfast.map((meal, dayIdx) => (
                  <td key={dayIdx} className="meal-cell">
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
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                  </td>
                ))}
              </tr>

              {/* Lunch Row */}
              <tr>
                <td className="meal-label">Bữa trưa</td>
                {weekPlan.lunch.map((meal, dayIdx) => (
                  <td key={dayIdx} className="meal-cell">
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
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                  </td>
                ))}
              </tr>

              {/* Dinner Row */}
              <tr>
                <td className="meal-label">Bữa tối</td>
                {weekPlan.dinner.map((meal, dayIdx) => (
                  <td key={dayIdx} className="meal-cell">
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
                        <i className="fas fa-plus"></i>
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sidebar */}
        <div className="meal-plan-sidebar">
          {/* Weekly Summary */}
          <div className="summary-card">
            <div className="summary-header">
              <h3>Tổng quan tuần</h3>
              <button className="edit-btn">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Ngân sách ước tính</span>
                <span className="stat-value">{totalCalories.toLocaleString()}đ</span>
              </div>
              <div className="stat-item">
                <span className="stat-value large">{totalCalories}</span>
                <span className="stat-label">kcal / ngày</span>
              </div>
              <div className="stat-item">
                <span className="stat-value large">{totalProtein}</span>
                <span className="stat-label">g / ngày</span>
              </div>
            </div>
          </div>

          {/* Shopping List */}
          <div className="shopping-list-card">
            <h3>DANH SÁCH ĐI CHỢ</h3>
            <div className="shopping-items">
              {shoppingList.map((item, idx) => (
                <div key={idx} className="shopping-item">
                  <input 
                    type="checkbox" 
                    checked={item.checked}
                    onChange={() => toggleShoppingItem(idx)}
                  />
                  <label className={item.checked ? 'checked' : ''}>
                    {item.name} ({item.amount})
                  </label>
                </div>
              ))}
            </div>
            <button className="share-btn">
              <i className="fas fa-share-alt"></i>
              Chia sẻ kế hoạch
            </button>
          </div>

          {/* AI Recommendation */}
          <div className="ai-recommendation-card">
            <div className="ai-header">
              <i className="fas fa-robot"></i>
              <span>AI MÁCH BẠN</span>
            </div>
            <p>"Tuần này bạn đang thiếu Vitamin C. Tôi gợi ý thêm một bữa xế với Cam hoặc Kiwi để tăng cường đề kháng!"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlan