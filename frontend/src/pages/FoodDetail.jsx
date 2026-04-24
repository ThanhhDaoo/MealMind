import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { foodService } from '../services/foodService'
import './FoodDetail.css'

const FoodDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true)
        console.log('Fetching food with ID:', id)
        const foodData = await foodService.getFoodById(id)
        console.log('Food data received:', foodData)
        setFood(foodData)
      } catch (error) {
        console.error('Error fetching food:', error)
        // Chỉ fallback khi thực sự không load được
        if (error.response?.status === 404) {
          setFood(null) // Không tìm thấy món ăn
        } else {
          // Fallback to mock data for demo chỉ khi có lỗi server
          setFood({
            id: id,
            name: 'Bò Áp Chảo Sốt Bơ Tỏi',
            description: 'Món bò áp chảo với hương vị đậm đà từ bơ tỏi. Tôi thích ăn và là hương thức. Mình sẽ luôn chọn món này cho bữa tối, sáng trong tuần tại gia.',
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
            prepTime: 30,
            servings: 'Trung bình',
            calories: 650,
            ingredients: [
              { name: '500g Thịt thăn bò Mỹ', amount: '500', unit: 'g' },
              { name: 'Sốt đậu xanh', amount: '2', unit: 'muỗng' },
              { name: '3 lát Tỏi băm', amount: '3', unit: 'lát' },
              { name: '2 muỗng nước thần (Rosemary)', amount: '2', unit: 'muỗng' },
              { name: 'Muối dầu ăn Tiêu đen', amount: '1', unit: 'muỗng' },
              { name: '2 muỗng canh Dầu Oliu', amount: '2', unit: 'muỗng canh' }
            ],
            instructions: [
              {
                stepOrder: 1,
                instruction: 'Lấy thịt bò ra để khỏi tủ lạnh 15 phút trước khi nấu để thịt đạt nhiệt độ phòng. Thái thịt thành từng miếng vừa ăn, tẩm ướp với muối và tiêu đen.'
              },
              {
                stepOrder: 2,
                instruction: 'Làm nóng chảo với dầu olive đến khi bắt khói nhẹ. Cho thịt vào áp chảo mỗi mặt 2-3 phút cho đến khi có màu nâu đẹp mắt.'
              },
              {
                stepOrder: 3,
                instruction: 'Tắt bếp, thêm bơ tỏi đậu xanh và hương thảo. Dùng thìa tẩm nước thịt lên chảy đều để thịt mềm mịn và thơm hương.'
              }
            ],
            nutrition: {
              protein: 40,
              carbs: 25,
              fat: 15,
              fiber: 5
            }
          })
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchFood()
    }
  }, [id])

  const handleAddToPlan = () => {
    // Logic thêm vào kế hoạch bữa ăn
    console.log('Thêm vào kế hoạch:', food.name)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải...</p>
      </div>
    )
  }

  if (!food) {
    return (
      <div className="error-container">
        <p>Không tìm thấy món ăn</p>
        <button onClick={() => navigate('/foods')} className="back-btn">
          Quay lại danh sách
        </button>
      </div>
    )
  }

  return (
    <div className="food-detail-container">
      {/* Header Section */}
      <div className="food-detail-header">
        <div className="food-image-container">
          <img src={food.image || '/api/placeholder/400/300'} alt={food.name} className="food-detail-image" />
          <button className="back-button" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
        
        <div className="food-info-section">
          <div className="food-category">
            <span className="category-tag">🍽️ CÔNG THỨC MEALMIND</span>
          </div>
          
          <h1 className="food-title">{food.name}</h1>
          
          <div className="food-meta">
            <div className="meta-item">
              <i className="fas fa-clock"></i>
              <span>{food.prepTime || food.totalTime || 30} phút</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-users"></i>
              <span>{food.servings || 'Trung bình'} khẩu phần</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-fire"></i>
              <span>{food.calories || 650} kcal</span>
            </div>
          </div>
          
          <p className="food-description">
            {food.description || 'Món bò áp chảo với hương vị đậm đà từ bơ tỏi. Tôi thích ăn và là hương thức. Mình sẽ luôn chọn món này cho bữa tối, sáng trong tuần tại gia.'}
          </p>
          
          <div className="action-buttons">
            <button className="add-to-plan-btn" onClick={handleAddToPlan}>
              <i className="fas fa-plus"></i>
              Thêm vào kế hoạch
            </button>
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
            >
              <i className={`fas fa-heart ${isFavorite ? 'filled' : ''}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="food-detail-content">
        <div className="main-content">
          {/* Ingredients Section */}
          <div className="ingredients-section">
            <h2>
              <span>🛒</span>
              Nguyên liệu
            </h2>
            <div className="ingredients-grid">
              {food.ingredients && food.ingredients.length > 0 ? (
                food.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <input type="checkbox" id={`ingredient-${index}`} />
                    <label htmlFor={`ingredient-${index}`}>
                      <span className="ingredient-name">{ingredient.name}</span>
                      {ingredient.amount && ingredient.unit && (
                        <span className="ingredient-amount">
                          {ingredient.amount} {ingredient.unit}
                        </span>
                      )}
                    </label>
                  </div>
                ))
              ) : (
                // Fallback ingredients nếu không có data
                [
                  { name: '500g Thịt thăn bò Mỹ', amount: 'Tươi', unit: '' },
                  { name: '50g Bơ lạt', amount: '', unit: '' },
                  { name: '3 tép Tỏi tươi', amount: '', unit: '' },
                  { name: '2 nhánh Hương thảo (Rosemary)', amount: '', unit: '' },
                  { name: 'Muối biển và Tiêu đen', amount: '', unit: '' },
                  { name: '2 muỗng canh Dầu Olive', amount: '', unit: '' }
                ].map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <input type="checkbox" id={`ingredient-${index}`} />
                    <label htmlFor={`ingredient-${index}`}>
                      <span className="ingredient-name">{ingredient.name}</span>
                      {ingredient.amount && (
                        <span className="ingredient-amount">{ingredient.amount}</span>
                      )}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="instructions-section">
            <h2>
              <span>📋</span>
              Các bước thực hiện
            </h2>
            {food.instructions && food.instructions.length > 0 ? (
              food.instructions.map((step, index) => (
                <div key={index} className="instruction-step">
                  <div className="step-image">
                    <img 
                      src={step.image || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200'} 
                      alt={`Bước ${step.stepOrder || index + 1}`} 
                    />
                  </div>
                  <div className="step-content">
                    <h4>Bước {step.stepOrder || index + 1}</h4>
                    <p>{step.instruction}</p>
                  </div>
                </div>
              ))
            ) : (
              [
                {
                  description: 'Lấy thịt bò ra khỏi tủ lạnh ít nhất 30 phút trước khi nấu để thịt đạt nhiệt độ phòng. Thấm khô thịt bằng khăn giấy và ướp muối, tiêu đều hai mặt.',
                  image: 'https://images.unsplash.com/photo-1588347818036-8fc5e6d9e0e8?w=200'
                },
                {
                  description: 'Làm nóng chảo với dầu olive đến khi bốc khói nhẹ. Cho thịt vào áp chảo mỗi mặt 2-3 phút cho đến khi có lớp vỏ màu nâu đẹp mắt.',
                  image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200'
                },
                {
                  description: 'Hạ lửa, thêm bơ, tỏi đập dập và hương thảo. Dùng thìa liên tục rưới bơ tan chảy lên miếng thịt trong 2 phút cuối để thịt mọng nước và thơm hương.',
                  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200'
                }
              ].map((step, index) => (
                <div key={index} className="instruction-step">
                  <div className="step-image">
                    <img src={step.image} alt={`Bước ${index + 1}`} />
                  </div>
                  <div className="step-content">
                    <h4>Bước {index + 1}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Nutrition Info */}
          <div className="nutrition-card">
            <h3>📊 Giá trị dinh dưỡng</h3>
            <div className="nutrition-bars">
              <div className="nutrition-item">
                <div className="nutrition-label">
                  <span>Protein</span>
                  <span className="nutrition-value">{food.protein || 45}g</span>
                </div>
                <div className="nutrition-bar">
                  <div className="nutrition-fill protein" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-label">
                  <span>Fat</span>
                  <span className="nutrition-value">{food.fat || 32}g</span>
                </div>
                <div className="nutrition-bar">
                  <div className="nutrition-fill fat" style={{width: '60%'}}></div>
                </div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-label">
                  <span>Carbs</span>
                  <span className="nutrition-value">{food.carbs || 8}g</span>
                </div>
                <div className="nutrition-bar">
                  <div className="nutrition-fill carbs" style={{width: '15%'}}></div>
                </div>
              </div>
            </div>
            <p className="nutrition-note">
              * Giá trị dựa trên khẩu phần 1 người ăn.
            </p>
          </div>

          {/* Recommended Dishes */}
          <div className="recommended-card">
            <h3>🍷 Gợi ý kèm theo</h3>
            <div className="recommended-list">
              <div className="recommended-item">
                <img src="https://images.unsplash.com/photo-1585238341710-4a1b0d2d1b5f?w=100" alt="Khoai tây nghiền" />
                <div>
                  <h5>Khoai tây nghiền</h5>
                  <p>Mềm mịn, béo ngậy</p>
                </div>
              </div>
              <div className="recommended-item">
                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100" alt="Salad vườn" />
                <div>
                  <h5>Salad vườn</h5>
                  <p>Tươi mát, thanh đạm</p>
                </div>
              </div>
              <div className="recommended-item">
                <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100" alt="Vang đỏ Merlot" />
                <div>
                  <h5>Vang đỏ Merlot</h5>
                  <p>Cân bằng vị đậm đà</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="ai-assistant-card">
            <div className="ai-header">
              <span className="ai-icon">🤖</span>
              <span>MealMind AI nói:</span>
            </div>
            <p>
              "Món này chứa nhiều đạm và sắt, rất tốt cho việc phục hồi cơ bắp sau khi tập luyện. Hãy thử ăn kèm măng tây nướng để tăng thêm chất xơ nhé!"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetail