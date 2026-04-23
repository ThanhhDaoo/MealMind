import { useState, useEffect } from 'react'
import MealPlanCard from '../components/MealPlanCard'
import { mealPlanService } from '../services/mealPlanService'

const MealPlan = () => {
  const [mealPlans, setMealPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const plans = await mealPlanService.getMealPlansByDate(selectedDate)
        setMealPlans(plans)
      } catch (error) {
        console.error('Error fetching meal plans:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMealPlans()
  }, [selectedDate])

  const generateMealPlan = async () => {
    try {
      setLoading(true)
      const newPlan = await mealPlanService.generateMealPlan({
        date: selectedDate,
        preferences: {
          calories: 2000,
          diet: 'balanced'
        }
      })
      setMealPlans([newPlan])
    } catch (error) {
      console.error('Error generating meal plan:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="meal-plan">
      <div className="meal-plan-header">
        <h1>Kế hoạch ăn uống</h1>
        <div className="meal-plan-controls">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
          <button onClick={generateMealPlan} className="generate-btn">
            Tạo kế hoạch mới
          </button>
        </div>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : mealPlans.length > 0 ? (
        <div className="meal-plan-list">
          {mealPlans.map(plan => (
            <MealPlanCard key={plan.id} mealPlan={plan} />
          ))}
        </div>
      ) : (
        <div className="no-meal-plans">
          <p>Chưa có kế hoạch ăn cho ngày này</p>
          <button onClick={generateMealPlan} className="generate-btn">
            Tạo kế hoạch đầu tiên
          </button>
        </div>
      )}
    </div>
  )
}

export default MealPlan