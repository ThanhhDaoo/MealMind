import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FoodList.css'

const FoodList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState(['Rau củ'])
  const [timeRange, setTimeRange] = useState([10, 45])
  const [difficulty, setDifficulty] = useState('Trung bình')
  const [dietType, setDietType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Sample data
  const sampleFoods = [
    {
      id: 1,
      name: 'Salad Cầu Vồng',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      time: '20 phút',
      rating: 4.8,
      price: '120,000đ',
      difficulty: 'Dễ',
      tag: 'Healthy'
    },
    {
      id: 2,
      name: 'Buddha Bowl Hải Sản',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      time: '25 phút',
      rating: 4.7,
      price: '185,000đ',
      difficulty: 'Trung bình',
      tag: 'Bán chạy nhất'
    },
    {
      id: 3,
      name: 'Pasta Pesto Hạt Điều',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      time: '30 phút',
      rating: 4.8,
      price: '145,000đ',
      difficulty: 'Dễ',
      tag: 'Nguyên liệu sạch'
    },
    {
      id: 4,
      name: 'Cá Hồi Nướng Măng Tây',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      time: '35 phút',
      rating: 5.0,
      price: '220,000đ',
      difficulty: 'Khó',
      tag: 'Omega-3 cao'
    },
    {
      id: 5,
      name: 'Súp Rau Củ Đậu Phụ',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
      time: '40 phút',
      rating: 4.6,
      price: '95,000đ',
      difficulty: 'Dễ',
      tag: 'Thanh đạm'
    },
    {
      id: 6,
      name: 'Pizza Margherita Tươi',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      time: '45 phút',
      rating: 4.9,
      price: '160,000đ',
      difficulty: 'Trung bình',
      tag: 'Ý truyền thống'
    }
  ]

  const ingredients = ['Nguyên liệu', 'Thịt gà', 'Rau củ', 'Hải sản', 'Đậu hũ']
  const difficulties = ['Dễ', 'Trung bình', 'Khó']

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient))
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  return (
    <div className="food-list-page">
      <div className="food-list-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          {/* Nguyên liệu */}
          <div className="filter-section">
            <h3 className="filter-title">
              <span className="filter-icon">🥬</span>
              Nguyên liệu
            </h3>
            <div className="filter-options">
              {ingredients.map(ingredient => (
                <label key={ingredient} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => toggleIngredient(ingredient)}
                  />
                  <span>{ingredient}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Thời gian nấu */}
          <div className="filter-section">
            <h3 className="filter-title">
              <span className="filter-icon">⏱️</span>
              Thời gian nấu
            </h3>
            <div className="time-range">
              <input
                type="range"
                min="10"
                max="120"
                value={timeRange[1]}
                onChange={(e) => setTimeRange([10, parseInt(e.target.value)])}
                className="range-slider"
              />
              <div className="time-labels">
                <span>10p</span>
                <span>{timeRange[1]}p</span>
                <span>&gt;120p</span>
              </div>
            </div>
          </div>

          {/* Độ khó */}
          <div className="filter-section">
            <h3 className="filter-title">
              <span className="filter-icon">📊</span>
              Độ khó
            </h3>
            <div className="difficulty-buttons">
              {difficulties.map(level => (
                <button
                  key={level}
                  className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Chế độ ăn */}
          <div className="filter-section">
            <h3 className="filter-title">
              <span className="filter-icon">🍽️</span>
              Chế độ ăn
            </h3>
            <div className="filter-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Tất cả chế độ</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="food-list-main">
          {/* Header */}
          <div className="food-list-header">
            <h1>Khám phá thế giới ẩm thực</h1>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Tìm món ăn, nguyên liệu, hoặc phong cách..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">Tìm kiếm</button>
            </div>
          </div>

          {/* Food Grid */}
          <div className="food-grid-list">
            {sampleFoods.map(food => (
              <div key={food.id} className="food-card-list">
                <div className="food-image-wrapper">
                  <img src={food.image} alt={food.name} />
                  <span className="food-tag">{food.tag}</span>
                </div>
                <div className="food-card-body">
                  <h3 className="food-title">{food.name}</h3>
                  <div className="food-info-row">
                    <span className="food-time">⏱️ {food.time}</span>
                    <span className="food-rating">⭐ {food.rating}</span>
                  </div>
                  <div className="food-footer">
                    <span className="food-difficulty">{food.difficulty}</span>
                  </div>
                  <Link to={`/foods/${food.id}`} className="view-detail-btn">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled={currentPage === 1}>
              ‹
            </button>
            <button className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>
              1
            </button>
            <button className={`page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>
              2
            </button>
            <button className={`page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>
              3
            </button>
            <button className="page-btn">
              ›
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FoodList