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
  const [activeTab, setActiveTab] = useState('ingredients')

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const foodData = await foodService.getFoodById(id)
        setFood(foodData)
      } catch (error) {
        console.error('Error fetching food:', error)
        // Fallback to mock data for demo
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
              title: 'Chuẩn bị thịt',
              description: 'Lấy thịt bò ra để khỏi tủ lạnh 15 phút trước khi nấu để thịt đạt nhiệt độ phòng. Thái thịt thành từng miếng vừa ăn, tẩm ướp với muối và tiêu đen.'
            },
            {
              title: 'Áp chảo',
              description: 'Làm nóng chảo với dầu olive đến khi bắt khói nhẹ. Cho thịt vào áp chảo mỗi mặt 2-3 phút cho đến khi có màu nâu đẹp mắt.'
            },
            {
              title: 'Hoàn tất bò',
              description: 'Tắt bếp, thêm bơ tỏi đậu xanh và hương thảo. Dùng thìa tẩm nước thịt lên chảy đều để thịt mềm mịn và thơm hương.'
            }
          ],
          nutrition: {
            protein: 40,
            carbs: 25,
            fat: 15,
            fiber: 5
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFood()
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
              <span>{food.prepTime || 30} phút</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-users"></i>
              <span>{food.servings || 'Trung bình'}</span>
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
          {/* Navigation Tabs */}
          <div className="content-tabs">
            <button 
              className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              🥬 Nguyên liệu
            </button>
            <button 
              className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructions')}
            >
              📋 Các bước thực hiện
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'ingredients' && (
            <div className="ingredients-section">
              <div className="ingredients-grid">
                {food.ingredients?.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <input type="checkbox" id={`ingredient-${index}`} />
                    <label htmlFor={`ingredient-${index}`}>
                      <span className="ingredient-name">{ingredient.name}</span>
                      <span className="ingredient-amount">{ingredient.amount} {ingredient.unit}</span>
                    </label>
                  </div>
                )) || [
                  { name: '500g Thịt thăn bò Mỹ', amount: '', unit: '' },
                  { name: 'Sốt đậu xanh', amount: '', unit: '' },
                  { name: '3 lát Tỏi băm', amount: '', unit: '' },
                  { name: '2 muỗng nước thần (Rosemary)', amount: '', unit: '' },
                  { name: 'Muối dầu ăn Tiêu đen', amount: '', unit: '' },
                  { name: '2 muỗng canh Dầu Oliu', amount: '', unit: '' }
                ].map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <input type="checkbox" id={`ingredient-${index}`} />
                    <label htmlFor={`ingredient-${index}`}>
                      <span className="ingredient-name">{ingredient.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="instructions-section">
              {food.instructions?.map((step, index) => (
                <div key={index} className="instruction-step">
                  <div className="step-image">
                    <img src={`/api/placeholder/80/80`} alt={`Bước ${index + 1}`} />
                  </div>
                  <div className="step-content">
                    <h4>Bước {index + 1}: {step.title || `Chuẩn bị thịt`}</h4>
                    <p>{step.description || step}</p>
                  </div>
                </div>
              )) || [
                {
                  title: 'Chuẩn bị thịt',
                  description: 'Lấy thịt bò ra để khỏi tủ lạnh 15 phút trước khi nấu để thịt đạt nhiệt độ phòng. Thái thịt thành từng miếng vừa ăn, tẩm ướp với muối và tiêu đen.'
                },
                {
                  title: 'Áp chảo',
                  description: 'Làm nóng chảo với dầu olive đến khi bắt khói nhẹ. Cho thịt vào áp chảo mỗi mặt 2-3 phút cho đến khi có màu nâu đẹp mắt.'
                },
                {
                  title: 'Hoàn tất bò',
                  description: 'Tắt bếp, thêm bơ tỏi đậu xanh và hương thảo. Dùng thìa tẩm nước thịt lên chảy đều để thịt mềm mịn và thơm hương.'
                }
              ].map((step, index) => (
                <div key={index} className="instruction-step">
                  <div className="step-image">
                    <img src={`/api/placeholder/80/80`} alt={`Bước ${index + 1}`} />
                  </div>
                  <div className="step-content">
                    <h4>Bước {index + 1}: {step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Nutrition Info */}
          <div className="nutrition-card">
            <h3>📊 Giá trị dinh dưỡng</h3>
            <div className="nutrition-bars">
              <div className="nutrition-item">
                <span className="nutrition-label">Protein</span>
                <div className="nutrition-bar">
                  <div className="nutrition-fill protein" style={{width: '70%'}}></div>
                </div>
                <span className="nutrition-value">{food.nutrition?.protein || 40}g</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Carbs</span>
                <div className="nutrition-bar">
                  <div className="nutrition-fill carbs" style={{width: '50%'}}></div>
                </div>
                <span className="nutrition-value">{food.nutrition?.carbs || 25}g</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-label">Chất béo</span>
                <div className="nutrition-bar">
                  <div className="nutrition-fill fat" style={{width: '30%'}}></div>
                </div>
                <span className="nutrition-value">{food.nutrition?.fat || 15}g</span>
              </div>
            </div>
            <p className="nutrition-note">
              Chúng tôi tính toán dinh dưỡng dựa trên 1 người ăn
            </p>
          </div>

          {/* Recommended Dishes */}
          <div className="recommended-card">
            <h3>🍽️ Gợi ý kèm theo</h3>
            <div className="recommended-list">
              <div className="recommended-item">
                <img src="/api/placeholder/50/50" alt="Bánh mì nướng" />
                <div>
                  <h5>Bánh mì nướng</h5>
                  <p>Bánh mì - Sáng sớm</p>
                </div>
              </div>
              <div className="recommended-item">
                <img src="/api/placeholder/50/50" alt="Salad xanh" />
                <div>
                  <h5>Salad xanh</h5>
                  <p>Rau củ - Trưa</p>
                </div>
              </div>
              <div className="recommended-item">
                <img src="/api/placeholder/50/50" alt="Vang đỏ Merlot" />
                <div>
                  <h5>Vang đỏ Merlot</h5>
                  <p>Đồ uống - Tối</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="ai-assistant-card">
            <div className="ai-header">
              <span className="ai-icon">🤖</span>
              <span>MealMind AI trợ lý</span>
            </div>
            <p>
              Bạn có muốn tôi gợi ý thêm các món ăn khác phù hợp với khẩu vị và chế độ dinh dưỡng của bạn không?
            </p>
            <button className="ai-chat-btn">Trò chuyện với AI</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetail