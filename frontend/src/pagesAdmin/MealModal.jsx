import { useState, useEffect } from 'react'
import './MealModal.css'

const MealModal = ({ isOpen, onClose, meal, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    calories: '',
    prepTime: '',
    cookTime: '',
    totalTime: '',
    servings: '',
    difficulty: 'EASY',
    category: '',
    cuisine: '',
    mealType: 'BREAKFAST',
    dietType: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    status: 'ACTIVE'
  })

  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }])
  const [instructions, setInstructions] = useState([{ instruction: '', stepOrder: 1 }])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (meal) {
      setFormData({
        name: meal.name || '',
        description: meal.description || '',
        image: meal.image || meal.imageUrl || '',
        calories: meal.calories || '',
        prepTime: meal.prepTime || '',
        cookTime: meal.cookTime || '',
        totalTime: meal.totalTime || '',
        servings: meal.servings || '',
        difficulty: meal.difficulty || 'EASY',
        category: meal.category || '',
        cuisine: meal.cuisine || '',
        mealType: meal.mealType || 'BREAKFAST',
        dietType: meal.dietType || '',
        protein: meal.protein || '',
        carbs: meal.carbs || '',
        fat: meal.fat || '',
        fiber: meal.fiber || '',
        status: meal.status || 'ACTIVE'
      })
      
      // Load ingredients
      if (meal.ingredients && meal.ingredients.length > 0) {
        setIngredients(meal.ingredients.map(ing => ({
          name: ing.name || '',
          amount: ing.amount || '',
          unit: ing.unit || ''
        })))
      } else {
        setIngredients([{ name: '', amount: '', unit: '' }])
      }
      
      // Load instructions
      if (meal.instructions && meal.instructions.length > 0) {
        setInstructions(meal.instructions.map((inst, idx) => ({
          instruction: inst.instruction || '',
          stepOrder: inst.stepOrder || idx + 1
        })))
      } else {
        setInstructions([{ instruction: '', stepOrder: 1 }])
      }
    } else {
      // Reset form for new meal
      setFormData({
        name: '',
        description: '',
        image: '',
        calories: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        servings: '',
        difficulty: 'EASY',
        category: '',
        cuisine: '',
        mealType: 'BREAKFAST',
        dietType: '',
        protein: '',
        carbs: '',
        fat: '',
        fiber: '',
        status: 'ACTIVE'
      })
      setIngredients([{ name: '', amount: '', unit: '' }])
      setInstructions([{ instruction: '', stepOrder: 1 }])
    }
    setErrors({})
  }, [meal, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle meal type checkbox changes
  const handleMealTypeChange = (mealType) => {
    setFormData(prev => {
      const currentMealTypes = prev.mealType || []
      const isSelected = currentMealTypes.includes(mealType)
      
      return {
        ...prev,
        mealType: isSelected
          ? currentMealTypes.filter(type => type !== mealType)
          : [...currentMealTypes, mealType]
      }
    })
  }

  // Handle ingredient changes
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index][field] = value
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }])
  }

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
    }
  }

  // Handle instruction changes
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions]
    newInstructions[index].instruction = value
    newInstructions[index].stepOrder = index + 1
    setInstructions(newInstructions)
  }

  const addInstruction = () => {
    setInstructions([...instructions, { instruction: '', stepOrder: instructions.length + 1 }])
  }

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const newInstructions = instructions.filter((_, i) => i !== index)
      // Update step orders
      newInstructions.forEach((inst, idx) => {
        inst.stepOrder = idx + 1
      })
      setInstructions(newInstructions)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Tên món ăn là bắt buộc'
    if (!formData.description.trim()) newErrors.description = 'Mô tả là bắt buộc'
    if (!formData.calories || Number(formData.calories) <= 0) newErrors.calories = 'Calories phải lớn hơn 0'
    
    // Check if at least one ingredient has a name
    const hasIngredients = ingredients.some(ing => ing.name.trim())
    if (!hasIngredients) {
      alert('Vui lòng thêm ít nhất 1 nguyên liệu')
      return false
    }
    
    // Check if at least one instruction exists
    const hasInstructions = instructions.some(inst => inst.instruction.trim())
    if (!hasInstructions) {
      alert('Vui lòng thêm ít nhất 1 bước hướng dẫn')
      return false
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    try {
      // Clean up data before sending - convert empty strings to null for numeric fields
      const cleanedData = {
        ...formData,
        calories: formData.calories ? Number(formData.calories) : null,
        prepTime: formData.prepTime ? Number(formData.prepTime) : null,
        cookTime: formData.cookTime ? Number(formData.cookTime) : null,
        totalTime: formData.totalTime ? Number(formData.totalTime) : null,
        servings: formData.servings ? Number(formData.servings) : null,
        protein: formData.protein ? Number(formData.protein) : null,
        carbs: formData.carbs ? Number(formData.carbs) : null,
        fat: formData.fat ? Number(formData.fat) : null,
        fiber: formData.fiber ? Number(formData.fiber) : null,
        // Remove empty strings for text fields
        category: formData.category || null,
        cuisine: formData.cuisine || null,
        dietType: formData.dietType || null,
        image: formData.image || null,
        mealType: formData.mealType || 'BREAKFAST',
        // Add ingredients and instructions
        ingredients: ingredients.filter(ing => ing.name.trim()).map(ing => ({
          name: ing.name,
          amount: ing.amount || null,
          unit: ing.unit || null
        })),
        instructions: instructions.filter(inst => inst.instruction.trim()).map((inst, idx) => ({
          instruction: inst.instruction,
          stepOrder: idx + 1
        }))
      }
      
      await onSave(cleanedData)
      onClose()
    } catch (error) {
      console.error('Error saving meal:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lưu món ăn!'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{meal ? 'Chỉnh sửa món ăn' : 'Thêm món ăn mới'}</h2>
          <button className="modal-close" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Basic Info - Left Column */}
            <div className="form-section">
              <h3>Thông tin cơ bản</h3>
              
              <div className="form-group">
                <label>Tên món ăn *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên món ăn"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Mô tả *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả món ăn"
                  rows="3"
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label>URL hình ảnh</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phân loại</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Vegan, Keto, etc."
                  />
                </div>

                <div className="form-group">
                  <label>Ẩm thực</label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    placeholder="Việt Nam, Ý, etc."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Bữa ăn</label>
                  <select name="mealType" value={formData.mealType} onChange={handleChange}>
                    <option value="BREAKFAST">Sáng</option>
                    <option value="LUNCH">Trưa</option>
                    <option value="DINNER">Tối</option>
                    <option value="SNACK">Ăn vặt</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Độ khó</label>
                  <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                    <option value="EASY">Dễ</option>
                    <option value="MEDIUM">Trung bình</option>
                    <option value="HARD">Khó</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Nutrition & Time - Right Column */}
            <div className="form-section">
              <h3>Dinh dưỡng & Thời gian</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Calories *</label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                    placeholder="0"
                    className={errors.calories ? 'error' : ''}
                  />
                  {errors.calories && <span className="error-text">{errors.calories}</span>}
                </div>

                <div className="form-group">
                  <label>Khẩu phần</label>
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Protein (g)</label>
                  <input
                    type="number"
                    name="protein"
                    value={formData.protein}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Carbs (g)</label>
                  <input
                    type="number"
                    name="carbs"
                    value={formData.carbs}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fat (g)</label>
                  <input
                    type="number"
                    name="fat"
                    value={formData.fat}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Fiber (g)</label>
                  <input
                    type="number"
                    name="fiber"
                    value={formData.fiber}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Thời gian chuẩn bị (phút)</label>
                  <input
                    type="number"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>Thời gian nấu (phút)</label>
                  <input
                    type="number"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Chế độ ăn</label>
                  <input
                    type="text"
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleChange}
                    placeholder="Low-carb, High-protein, etc."
                  />
                </div>

                <div className="form-group">
                  <label>Trạng thái</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="ACTIVE">Hoạt động</option>
                    <option value="INACTIVE">Không hoạt động</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="form-section full-width" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Nguyên liệu</h3>
              <button type="button" onClick={addIngredient} className="btn-add-item">
                <span className="material-icons">add</span>
                Thêm nguyên liệu
              </button>
            </div>
            
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row" style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                <div className="form-group" style={{ flex: 2, margin: 0, minHeight: 'auto' }}>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    placeholder="Tên nguyên liệu"
                  />
                </div>
                <div className="form-group" style={{ flex: 1, margin: 0, minHeight: 'auto' }}>
                  <input
                    type="text"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                    placeholder="Số lượng"
                  />
                </div>
                <div className="form-group" style={{ flex: 1, margin: 0, minHeight: 'auto' }}>
                  <input
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    placeholder="Đơn vị"
                  />
                </div>
                {ingredients.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeIngredient(index)}
                    className="btn-remove-item"
                  >
                    <span className="material-icons">delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Instructions Section */}
          <div className="form-section full-width" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Hướng dẫn nấu</h3>
              <button type="button" onClick={addInstruction} className="btn-add-item">
                <span className="material-icons">add</span>
                Thêm bước
              </button>
            </div>
            
            {instructions.map((instruction, index) => (
              <div key={index} className="instruction-row" style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                <div style={{ 
                  minWidth: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #008000 0%, #72de5e 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  boxShadow: '0 2px 8px rgba(0, 128, 0, 0.2)',
                  flexShrink: 0
                }}>
                  {index + 1}
                </div>
                <div className="form-group" style={{ flex: 1, margin: 0, minHeight: 'auto' }}>
                  <textarea
                    value={instruction.instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder={`Bước ${index + 1}: Mô tả chi tiết...`}
                    rows="2"
                    style={{ minHeight: '60px' }}
                  />
                </div>
                {instructions.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeInstruction(index)}
                    className="btn-remove-item"
                  >
                    <span className="material-icons">delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="modal-footer" style={{ gridColumn: '1 / -1' }}>
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Hủy
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Đang lưu...' : (meal ? 'Cập nhật' : 'Thêm mới')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MealModal
