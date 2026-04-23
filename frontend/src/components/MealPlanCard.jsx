const MealPlanCard = ({ mealPlan }) => {
  return (
    <div className="meal-plan-card">
      <div className="meal-plan-header">
        <h3>{mealPlan.name}</h3>
        <span className="meal-plan-date">{mealPlan.date}</span>
      </div>
      <div className="meal-plan-content">
        <div className="meal-section">
          <h4>Sáng</h4>
          <ul>
            {mealPlan.breakfast?.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className="meal-section">
          <h4>Trưa</h4>
          <ul>
            {mealPlan.lunch?.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className="meal-section">
          <h4>Tối</h4>
          <ul>
            {mealPlan.dinner?.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="meal-plan-stats">
        <span>Tổng calories: {mealPlan.totalCalories}</span>
      </div>
    </div>
  )
}

export default MealPlanCard