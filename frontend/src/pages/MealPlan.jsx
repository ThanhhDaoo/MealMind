import { useState, useEffect } from 'react'
import { mealPlanService } from '../services/mealPlanService'
import './MealPlan.css'

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [weekPlan, setWeekPlan] = useState({
    breakfast: Array(7).fill(null),
    lunch: Array(7).fill(null),
    dinner: Array(7).fill(null)
  })
  
  const [shoppingList, setShoppingList] = useState([])
  const [weekStartDate, setWeekStartDate] = useState(getMonday(new Date()))

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const daysOfWeekVN = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']

  // Get Monday of current week
  function getMonday(date) {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  // Load meal plan data
  useEffect(() => {
    loadMealPlan()
  }, [weekStartDate])

  const loadMealPlan = async () => {
    try {
      setLoading(true)
      const dateStr = weekStartDate.toISOString().split('T')[0]
      const plans = await mealPlanService.getMealPlansByDate(dateStr)
      
      if (plans && plans.length > 0) {
        const plan = plans[0]
        setMealPlan(plan)
        
        // Organize items by day and meal type
        const organized = {
          breakfast: Array(7).fill(null),
          lunch: Array(7).fill(null),
          dinner: Array(7).fill(null)
        }
        
        plan.items.forEach(item => {
          const dayIndex = daysOfWeek.indexOf(item.dayOfWeek)
          const mealType = item.mealType.toLowerCase()
          
          if (dayIndex !== -1 && organized[mealType]) {
            organized[mealType][dayIndex] = {
              id: item.id,
              name: item.food.name,
              image: item.food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
              calories: item.food.calories,
              foodId: item.food.id
            }
          }
        })
        
        setWeekPlan(organized)
        
        // Generate shopping list
        generateShoppingList(plan.items)
      } else {
        // No meal plan for this week
        setWeekPlan({
          breakfast: Array(7).fill(null),
          lunch: Array(7).fill(null),
          dinner: Array(7).fill(null)
        })
        setShoppingList([])
      }
    } catch (error) {
      console.error('Error loading meal plan:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateShoppingList = (items) => {
    const ingredients = {}
    
    items.forEach(item => {
      if (item.food && item.food.ingredients) {
        item.food.ingredients.forEach(ing => {
          const key = ing.name
          if (ingredients[key]) {
            ingredients[key].amount += parseFloat(ing.amount) || 0
          } else {
            ingredients[key] = {
              name: ing.name,
              amount: parseFloat(ing.amount) || 0,
              unit: ing.unit,
              checked: false
            }
          }
        })
      }
    })
    
    const list = Object.values(ingredients).map(ing => ({
      name: ing.name,
      amount: `${ing.amount}${ing.unit}`,
      checked: false
    }))
    
    setShoppingList(list)
  }

  const removeMealFromDay = async (mealType, dayIndex) => {
    const meal = weekPlan[mealType][dayIndex]
    if (!meal) return
    
    try {
      await mealPlanService.removeFoodFromMealPlan(mealPlan.id, meal.id)
      
      setWeekPlan(prev => ({
        ...prev,
        [mealType]: prev[mealType].map((item, idx) => idx === dayIndex ? null : item)
      }))
    } catch (error) {
      console.error('Error removing meal:', error)
      alert('Không thể xóa món ăn. Vui lòng thử lại.')
    }
  }

  const toggleShoppingItem = (index) => {
    setShoppingList(prev => prev.map((item, idx) => 
      idx === index ? { ...item, checked: !item.checked } : item
    ))
  }

  const handleGenerateMealPlan = async () => {
    try {
      setLoading(true)
      const request = {
        weekStartDate: weekStartDate.toISOString().split('T')[0],
        caloriesPerDay: 2000,
        dietaryPreferences: []
      }
      
      const newPlan = await mealPlanService.generateMealPlan(request)
      await loadMealPlan()
      alert('Đã tạo kế hoạch ăn uống mới!')
    } catch (error) {
      console.error('Error generating meal plan:', error)
      alert('Không thể tạo kế hoạch. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleClearAll = async () => {
    if (!mealPlan) return
    
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ kế hoạch tuần này?')) {
      try {
        await mealPlanService.deleteMealPlan(mealPlan.id)
        await loadMealPlan()
      } catch (error) {
        console.error('Error clearing meal plan:', error)
        alert('Không thể xóa kế hoạch. Vui lòng thử lại.')
      }
    }
  }

  // Calculate stats
  const totalCalories = mealPlan?.totalCalories || 0
  const avgCaloriesPerDay = mealPlan ? Math.round(totalCalories / 7) : 0
  const totalProtein = mealPlan ? Math.round(avgCaloriesPerDay * 0.25 / 4) : 0

  if (loading) {
    return (
      <div className="meal-plan-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Đang tải kế hoạch...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="meal-plan-container">
      {/* Header */}
      <div className="meal-plan-header">
        <div className="header-content">
          <h1>Lên kế hoạch dinh dưỡng cho tuần mới</h1>
          <p>Cân bằng vị giác và sức khỏe với sự hỗ trợ từ AI của MealMind.</p>
        </div>
        <div className="header-actions">
          <button className="btn-refresh" onClick={handleClearAll}>
            <span>🔄</span>
            Xóa tất cả
          </button>
          <button className="btn-generate" onClick={handleGenerateMealPlan}>
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
            {daysOfWeekVN.map((day, idx) => {
              const date = new Date(weekStartDate)
              date.setDate(date.getDate() + idx)
              return (
                <div key={idx} className={`day-header ${idx === new Date().getDay() - 1 ? 'active' : ''}`}>
                  <span className="day-name">{day}</span>
                  <span className="day-number">{date.getDate()}</span>
                </div>
              )
            })}

            {/* Breakfast Row */}
            <div className="meal-row-label">Bữa sáng</div>
            {weekPlan.breakfast.map((meal, dayIdx) => (
              <div key={dayIdx} className="meal-cell">
                {meal ? (
                  <div className="meal-item">
                    <img src={meal.image} alt={meal.name} />
                    <div className="meal-item-info">
                      <span className="meal-item-name">{meal.name}</span>
                      <span className="meal-item-calories">{meal.calories} kcal</span>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeMealFromDay('breakfast', dayIdx)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button className="add-meal-btn">
                    <span className="icon">+</span>
                    <span className="label">Thêm món</span>
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
                    <div className="meal-item-info">
                      <span className="meal-item-name">{meal.name}</span>
                      <span className="meal-item-calories">{meal.calories} kcal</span>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeMealFromDay('lunch', dayIdx)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button className="add-meal-btn">
                    <span className="icon">+</span>
                    <span className="label">Thêm món</span>
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
                    <div className="meal-item-info">
                      <span className="meal-item-name">{meal.name}</span>
                      <span className="meal-item-calories">{meal.calories} kcal</span>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeMealFromDay('dinner', dayIdx)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button className="add-meal-btn">
                    <span className="icon">+</span>
                    <span className="label">Thêm món</span>
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
                  <span>{mealPlan?.totalBudget ? `${mealPlan.totalBudget.toLocaleString()}k ₫` : '0 ₫'}</span>
                </div>
                <div className="budget-bar">
                  <div className="budget-fill" style={{width: '65%'}}></div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-box">
                  <span className="stat-box-label">Calories</span>
                  <span className="stat-box-value">{avgCaloriesPerDay}</span>
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
                  {shoppingList.length > 0 ? (
                    shoppingList.map((item, idx) => (
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
                    ))
                  ) : (
                    <p style={{ fontSize: '11px', color: '#999', textAlign: 'center' }}>
                      Chưa có nguyên liệu
                    </p>
                  )}
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
              <span className="ai-icon">🤖</span>
              <span className="ai-badge">AI Mách Bạn</span>
            </div>
            <p>"Tuần này bạn đang thiếu Vitamin C. Tôi gợi ý thêm một bữa xế với Cam hoặc Kiwi để tăng cường đề kháng!"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlan
