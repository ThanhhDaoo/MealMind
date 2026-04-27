import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'
import './UserDetailModal.css'

const UserDetailModal = ({ isOpen, onClose, user }) => {
  const [mealPlans, setMealPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('info')
  const [currentUser, setCurrentUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    if (isOpen && user) {
      fetchUserDetails()
      fetchUserMealPlans()
    }
  }, [isOpen, user])

  const fetchUserDetails = async () => {
    try {
      setUserLoading(true)
      // Fetch fresh user data from server
      const freshUserData = await adminService.getUserById(user.id)
      setCurrentUser(freshUserData)
    } catch (error) {
      console.error('Error fetching user details:', error)
      // Fallback to prop user if fetch fails
      setCurrentUser(user)
    } finally {
      setUserLoading(false)
    }
  }

  const fetchUserMealPlans = async () => {
    try {
      setLoading(true)
      const plans = await adminService.getUserMealPlans(user.id)
      setMealPlans(plans)
    } catch (error) {
      console.error('Error fetching meal plans:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !user) return null

  const displayUser = currentUser || user

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  const getTotalMeals = (plan) => {
    return plan.items?.length || 0
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'ACTIVE': { label: 'Đang hoạt động', color: 'green' },
      'COMPLETED': { label: 'Hoàn thành', color: 'blue' },
      'CANCELLED': { label: 'Đã hủy', color: 'red' }
    }
    const statusInfo = statusMap[status] || { label: status, color: 'gray' }
    return (
      <span className={`status-badge ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="user-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-content">
            <div className="user-avatar-large">
              <span className="material-icons">person</span>
            </div>
            <div className="user-header-info">
              <h2>{userLoading ? 'Đang tải...' : displayUser.name}</h2>
              <p className="user-email">{userLoading ? '' : displayUser.email}</p>
              {!userLoading && (
                <div className="user-badges">
                  <span className={`role-badge ${displayUser.role === 'ADMIN' ? 'green' : 'blue'}`}>
                    {displayUser.role === 'ADMIN' ? 'Admin' : 'User'}
                  </span>
                  <span className={`status-badge ${displayUser.status === 'ACTIVE' ? 'green' : 'gray'}`}>
                    {displayUser.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <span className="material-icons">info</span>
            Thông tin
          </button>
          <button 
            className={`tab-btn ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            <span className="material-icons">calendar_month</span>
            Kế hoạch ({mealPlans.length})
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'info' && (
            <div className="info-section">
              {userLoading ? (
                <div className="loading-state">
                  <span className="material-icons spinning">refresh</span>
                  <p>Đang tải thông tin...</p>
                </div>
              ) : (
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">ID người dùng</span>
                    <span className="info-value">#MM-{displayUser.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{displayUser.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Số điện thoại</span>
                    <span className="info-value">{displayUser.phone || 'Chưa cập nhật'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Ngày tạo</span>
                    <span className="info-value">{formatDate(displayUser.createdAt)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Đăng nhập cuối</span>
                    <span className="info-value">{formatDate(displayUser.lastLogin)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Tổng kế hoạch</span>
                    <span className="info-value">{mealPlans.length} kế hoạch</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="plans-section">
              {loading ? (
                <div className="loading-state">
                  <span className="material-icons spinning">refresh</span>
                  <p>Đang tải kế hoạch...</p>
                </div>
              ) : mealPlans.length === 0 ? (
                <div className="empty-state">
                  <span className="material-icons">event_busy</span>
                  <h3>Chưa có kế hoạch nào</h3>
                  <p>Người dùng này chưa tạo kế hoạch ăn uống nào.</p>
                </div>
              ) : (
                <div className="plans-list">
                  {mealPlans.map((plan) => (
                    <div key={plan.id} className="plan-card">
                      <div className="plan-header">
                        <div className="plan-title">
                          <span className="material-icons">restaurant_menu</span>
                          <h4>{plan.name || `Kế hoạch #${plan.id}`}</h4>
                        </div>
                        {getStatusBadge(plan.status)}
                      </div>
                      <div className="plan-details">
                        <div className="plan-detail-item">
                          <span className="material-icons">calendar_today</span>
                          <span>
                            {formatDate(plan.weekStartDate)} - {formatDate(plan.weekEndDate)}
                          </span>
                        </div>
                        <div className="plan-detail-item">
                          <span className="material-icons">restaurant</span>
                          <span>{getTotalMeals(plan)} món ăn</span>
                        </div>
                        <div className="plan-detail-item">
                          <span className="material-icons">local_fire_department</span>
                          <span>{plan.totalCalories || 0} kcal</span>
                        </div>
                      </div>
                      {plan.items && plan.items.length > 0 && (
                        <div className="plan-meals">
                          <p className="meals-label">Món ăn trong kế hoạch:</p>
                          <div className="meals-grid">
                            {plan.items.slice(0, 4).map((item, idx) => (
                              <div key={idx} className="meal-item-small">
                                <img 
                                  src={item.food?.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'} 
                                  alt={item.food?.name}
                                />
                                <div className="meal-item-info">
                                  <span className="meal-name">{item.food?.name}</span>
                                  <span className="meal-type">{item.mealType}</span>
                                </div>
                              </div>
                            ))}
                            {plan.items.length > 4 && (
                              <div className="meal-item-more">
                                +{plan.items.length - 4} món
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDetailModal
