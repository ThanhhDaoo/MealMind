import { useState, useEffect } from 'react'
import './UserModal.css'

const UserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
    status: 'ACTIVE'
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Don't populate password for editing
        role: user.role || 'USER',
        status: user.status || 'ACTIVE'
      })
    } else {
      // Reset form for new user
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'USER',
        status: 'ACTIVE'
      })
    }
    setErrors({})
  }, [user, isOpen])

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tên người dùng là bắt buộc'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }
    
    // Password is required only for new users
    if (!user && !formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc'
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)
    try {
      // Prepare data - don't send password if it's empty (for updates)
      const dataToSend = { ...formData }
      if (user && !formData.password) {
        delete dataToSend.password
      }
      
      await onSave(dataToSend)
      onClose()
    } catch (error) {
      console.error('Error saving user:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lưu người dùng!'
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{user ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h2>
          <button className="modal-close" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-section">
            <div className="form-group">
              <label>Tên người dùng *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên người dùng"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>
                Mật khẩu {user ? '(để trống nếu không đổi)' : '*'}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={user ? 'Nhập mật khẩu mới' : 'Nhập mật khẩu'}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Vai trò</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
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

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Hủy
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Đang lưu...' : (user ? 'Cập nhật' : 'Thêm mới')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal
