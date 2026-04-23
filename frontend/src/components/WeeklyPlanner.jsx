import { useState } from 'react'

const WeeklyPlanner = () => {
  const [weekPlan, setWeekPlan] = useState({
    'Thứ 2': null,
    'Thứ 3': null,
    'Thứ 4': null,
    'Thứ 5': null,
    'Thứ 6': null,
    'Thứ 7': null,
    'Chủ nhật': null
  })

  const sampleDishes = [
    { id: 1, name: 'Phở Bò', image: '🍜' },
    { id: 2, name: 'Bún Chả', image: '🍲' },
    { id: 3, name: 'Cơm Tấm', image: '🍚' },
    { id: 4, name: 'Bánh Mì', image: '🥖' },
    { id: 5, name: 'Gỏi Cuốn', image: '🥗' }
  ]

  const handleDrop = (day, dish) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: dish
    }))
  }

  const autoGenerate = () => {
    const newPlan = {}
    Object.keys(weekPlan).forEach((day, index) => {
      newPlan[day] = sampleDishes[index % sampleDishes.length]
    })
    setWeekPlan(newPlan)
  }

  return (
    <section className="weekly-planner">
      <div className="section-header">
        <h2>📅 Kế hoạch tuần</h2>
        <button className="btn-primary" onClick={autoGenerate}>
          👉 Tạo plan tự động
        </button>
      </div>

      <div className="planner-container glass-card">
        <div className="planner-grid">
          {Object.entries(weekPlan).map(([day, dish]) => (
            <div key={day} className="day-slot">
              <h3>{day}</h3>
              <div 
                className="dish-drop-zone"
                onDrop={(e) => {
                  e.preventDefault()
                  const dishData = JSON.parse(e.dataTransfer.getData('text/plain'))
                  handleDrop(day, dishData)
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {dish ? (
                  <div className="planned-dish">
                    <span className="dish-emoji">{dish.image}</span>
                    <span className="dish-name">{dish.name}</span>
                  </div>
                ) : (
                  <div className="empty-slot">
                    <span>+</span>
                    <p>Kéo món ăn vào đây</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="dish-palette">
          <h4>Kéo thả món ăn:</h4>
          <div className="dish-list">
            {sampleDishes.map(dish => (
              <div
                key={dish.id}
                className="draggable-dish"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', JSON.stringify(dish))
                }}
              >
                <span className="dish-emoji">{dish.image}</span>
                <span>{dish.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeeklyPlanner