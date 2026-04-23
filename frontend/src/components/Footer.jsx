const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <span className="footer-logo">🍜 MealMind</span>
              <p className="footer-desc">
                Nền tảng AI hàng đầu giúp bạn lên kế hoạch dinh dưỡng thông minh, 
                tiết kiệm thời gian và tối ưu hóa sức khỏe.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <span>📘</span>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <span>📷</span>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <span>🐦</span>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <span>📺</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Khám phá</h4>
            <ul className="footer-links">
              <li><a href="/foods">Món ăn</a></li>
              <li><a href="/meal-plan">Kế hoạch tuần</a></li>
              <li><a href="/ai-recommendation">AI gợi ý</a></li>
              <li><a href="/favorites">Yêu thích</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h4 className="footer-title">Công ty</h4>
            <ul className="footer-links">
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Tuyển dụng</a></li>
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Đối tác</a></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="footer-section">
            <h4 className="footer-title">Hỗ trợ</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <span>tranthanhdao82@gmail.com</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>0362 625 218</span>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>Đà Nẵng, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; 2026 MealMind. Tất cả quyền được bảo lưu.</p>
          </div>
          <div className="footer-bottom-links">
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer