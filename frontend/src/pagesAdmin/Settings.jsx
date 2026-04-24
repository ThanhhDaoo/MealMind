import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminService } from '../services/adminService'
import './AdminLayout.css'
import './Settings.css'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [loggingOut, setLoggingOut] = useState(false)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  // Profile state
  const [profileData, setProfileData] = useState({
    name: 'Quản trị viên',
    email: 'mealmind@admin.vn',
    phone: '',
    avatar: 'https://i.pravatar.cc/150?img=68'
  })

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    dateFormat: 'DD/MM/YYYY',
    itemsPerPage: 10
  })

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserAlert: true,
    newMealAlert: false,
    systemUpdates: true,
    weeklyReport: true
  })

  useEffect(() => {
    fetchCurrentProfile()
  }, [])

  const fetchCurrentProfile = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/profile')
      if (response.ok) {
        const data = await response.json()
        setProfileData({
          name: data.name || 'Quản trị viên',
          email: data.email || 'mealmind@admin.vn',
          phone: data.phone || '',
          avatar: data.avatar || 'https://i.pravatar.cc/150?img=68'
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleLogout = async () => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất?')
    if (!confirmed) return

    try {
      setLoggingOut(true)
      await adminService.logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error during logout:', error)
      localStorage.clear()
      navigate('/login', { replace: true })
    } finally {
      setLoggingOut(false)
    }
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const response = await fetch('http://localhost:8080/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone
        })
      })
      
      if (response.ok) {
        alert('Cập nhật thông tin thành công!')
      } else {
        const error = await response.text()
        alert('Có lỗi: ' + error)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Có lỗi khi cập nhật thông tin!')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }

    if (passwordData.newPassword.length < 6) {
      alert('Mật khẩu mới phải có ít nhất 6 ký tự!')
      return
    }

    try {
      setSaving(true)
      const response = await fetch('http://localhost:8080/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })
      
      if (response.ok) {
        alert('Đổi mật khẩu thành công!')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        const error = await response.text()
        alert('Có lỗi: ' + error)
      }
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Có lỗi khi đổi mật khẩu!')
    } finally {
      setSaving(false)
    }
  }

  const handleSystemSettingsUpdate = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      // TODO: Call API to update system settings
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      alert('Cập nhật cài đặt hệ thống thành công!')
    } catch (error) {
      console.error('Error updating system settings:', error)
      alert('Có lỗi khi cập nhật cài đặt!')
    } finally {
      setSaving(false)
    }
  }

  const handleNotificationSettingsUpdate = async () => {
    try {
      setSaving(true)
      // TODO: Call API to update notification settings
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      alert('Cập nhật cài đặt thông báo thành công!')
    } catch (error) {
      console.error('Error updating notification settings:', error)
      alert('Có lỗi khi cập nhật cài đặt!')
    } finally {
      setSaving(false)
    }
  }

  const handleExportData = () => {
    alert('Chức năng xuất dữ liệu đang được phát triển!')
  }

  const handleImportData = () => {
    alert('Chức năng nhập dữ liệu đang được phát triển!')
  }

  return (
    <div className="settings-page">
      {/* Sidebar */}
      <aside className="settings-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="material-icons">restaurant_menu</span>
          </div>
          <div className="sidebar-brand">
            <h1>MealMind</h1>
            <p>Admin Control</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item">
            <span className="material-icons">dashboard</span>
            <span>Overview</span>
          </Link>
          <Link to="/admin/meals" className="nav-item">
            <span className="material-icons">restaurant</span>
            <span>Meals</span>
          </Link>
          <Link to="/admin/users" className="nav-item">
            <span className="material-icons">group</span>
            <span>Users</span>
          </Link>
          <Link to="/admin/analytics" className="nav-item">
            <span className="material-icons">insights</span>
            <span>Analytics</span>
          </Link>
          <Link to="/admin/settings" className="nav-item active">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button 
            onClick={handleLogout} 
            disabled={loggingOut}
            className="nav-item logout" 
            style={{ 
              background: 'none', 
              border: 'none', 
              width: '100%', 
              textAlign: 'left', 
              cursor: loggingOut ? 'not-allowed' : 'pointer',
              opacity: loggingOut ? 0.6 : 1
            }}
          >
            <span className="material-icons">
              {loggingOut ? 'hourglass_empty' : 'logout'}
            </span>
            <span>{loggingOut ? 'Đang đăng xuất...' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="settings-main">
        {/* Header */}
        <header className="settings-header">
          <div className="header-left">
            <h1 className="header-title">Cài đặt</h1>
            <p className="header-subtitle">Quản lý thông tin và cấu hình hệ thống</p>
          </div>

          <div className="header-actions">
            <button className="icon-btn">
              <span className="material-icons">notifications</span>
            </button>
            <button className="icon-btn">
              <span className="material-icons">help</span>
            </button>
            <div className="header-divider"></div>
            <div className="header-profile">
              <div className="profile-info">
                <p className="profile-name">Quản trị viên</p>
                <p className="profile-role">mealmind@admin.vn</p>
              </div>
              <img
                src="https://i.pravatar.cc/150?img=68"
                alt="Admin"
                className="profile-avatar"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="settings-content">
          {/* Tabs */}
          <div className="settings-tabs">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="material-icons">person</span>
              Thông tin cá nhân
            </button>
            <button 
              className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              <span className="material-icons">lock</span>
              Đổi mật khẩu
            </button>
            <button 
              className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`}
              onClick={() => setActiveTab('system')}
            >
              <span className="material-icons">tune</span>
              Hệ thống
            </button>
            <button 
              className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <span className="material-icons">notifications_active</span>
              Thông báo
            </button>
            <button 
              className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
              onClick={() => setActiveTab('data')}
            >
              <span className="material-icons">storage</span>
              Dữ liệu
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="settings-card">
                <div className="card-header">
                  <h3>Thông tin cá nhân</h3>
                  <p>Cập nhật thông tin tài khoản quản trị viên</p>
                </div>
                <form onSubmit={handleProfileUpdate}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Họ và tên *</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="0123456789"
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn" disabled={saving}>
                      {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="settings-card">
                <div className="card-header">
                  <h3>Đổi mật khẩu</h3>
                  <p>Cập nhật mật khẩu để bảo mật tài khoản</p>
                </div>
                <form onSubmit={handlePasswordChange}>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Mật khẩu hiện tại *</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mật khẩu mới *</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        required
                        minLength={6}
                      />
                      <small>Tối thiểu 6 ký tự</small>
                    </div>
                    <div className="form-group">
                      <label>Xác nhận mật khẩu mới *</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn" disabled={saving}>
                      {saving ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="settings-card">
                <div className="card-header">
                  <h3>Cài đặt hệ thống</h3>
                  <p>Cấu hình chung cho hệ thống</p>
                </div>
                <form onSubmit={handleSystemSettingsUpdate}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Ngôn ngữ</label>
                      <select
                        value={systemSettings.language}
                        onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                      >
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Múi giờ</label>
                      <select
                        value={systemSettings.timezone}
                        onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                      >
                        <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
                        <option value="Asia/Bangkok">Bangkok (GMT+7)</option>
                        <option value="Asia/Singapore">Singapore (GMT+8)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Định dạng ngày</label>
                      <select
                        value={systemSettings.dateFormat}
                        onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Số mục mỗi trang</label>
                      <select
                        value={systemSettings.itemsPerPage}
                        onChange={(e) => setSystemSettings({...systemSettings, itemsPerPage: parseInt(e.target.value)})}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn" disabled={saving}>
                      {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="settings-card">
                <div className="card-header">
                  <h3>Cài đặt thông báo</h3>
                  <p>Quản lý các loại thông báo bạn muốn nhận</p>
                </div>
                <div className="notification-settings">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Thông báo qua Email</h4>
                      <p>Nhận thông báo qua địa chỉ email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Người dùng mới</h4>
                      <p>Thông báo khi có người dùng mới đăng ký</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.newUserAlert}
                        onChange={(e) => setNotificationSettings({...notificationSettings, newUserAlert: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Món ăn mới</h4>
                      <p>Thông báo khi có món ăn mới được thêm</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.newMealAlert}
                        onChange={(e) => setNotificationSettings({...notificationSettings, newMealAlert: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Cập nhật hệ thống</h4>
                      <p>Thông báo về các bản cập nhật và bảo trì</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.systemUpdates}
                        onChange={(e) => setNotificationSettings({...notificationSettings, systemUpdates: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Báo cáo hàng tuần</h4>
                      <p>Nhận báo cáo thống kê hàng tuần</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReport}
                        onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReport: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                <div className="form-actions">
                  <button onClick={handleNotificationSettingsUpdate} className="save-btn" disabled={saving}>
                    {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                  </button>
                </div>
              </div>
            )}

            {/* Data Tab */}
            {activeTab === 'data' && (
              <div className="settings-card">
                <div className="card-header">
                  <h3>Quản lý dữ liệu</h3>
                  <p>Sao lưu và khôi phục dữ liệu hệ thống</p>
                </div>
                <div className="data-management">
                  <div className="data-section">
                    <div className="data-icon">
                      <span className="material-icons">cloud_download</span>
                    </div>
                    <div className="data-info">
                      <h4>Xuất dữ liệu</h4>
                      <p>Tải xuống toàn bộ dữ liệu hệ thống dưới dạng file JSON</p>
                      <button onClick={handleExportData} className="action-btn">
                        <span className="material-icons">download</span>
                        Xuất dữ liệu
                      </button>
                    </div>
                  </div>
                  <div className="data-section">
                    <div className="data-icon">
                      <span className="material-icons">cloud_upload</span>
                    </div>
                    <div className="data-info">
                      <h4>Nhập dữ liệu</h4>
                      <p>Khôi phục dữ liệu từ file sao lưu</p>
                      <button onClick={handleImportData} className="action-btn">
                        <span className="material-icons">upload</span>
                        Nhập dữ liệu
                      </button>
                    </div>
                  </div>
                  <div className="data-section danger">
                    <div className="data-icon">
                      <span className="material-icons">delete_forever</span>
                    </div>
                    <div className="data-info">
                      <h4>Xóa dữ liệu</h4>
                      <p>Xóa toàn bộ dữ liệu hệ thống (không thể khôi phục)</p>
                      <button className="action-btn danger">
                        <span className="material-icons">warning</span>
                        Xóa tất cả dữ liệu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
