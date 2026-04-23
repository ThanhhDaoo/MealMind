import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-logo">🍜 MealMind</h3>
            <p className="footer-desc">
              Giải pháp lập kế hoạch ăn uống thông minh với AI, 
              giúp bạn tiết kiệm thời gian và chi phí.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Liên kết nhanh</h4>
            <ul className="footer-links">
              <li><Link to="/">Trang tổng quan</Link></li>
              <li><Link to="/foods">Món ăn</Link></li>
              <li><Link to="/meal-plan">Kế hoạch tuần</Link></li>
              <li><Link to="/favorites">Yêu thích</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-title">Hỗ trợ</h4>
            <ul className="footer-links">
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Liên hệ</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4 className="footer-title">Liên hệ</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <span>tranthanhdao82@gmail.com</span>
              </li>
              <li>
                <span className="contact-icon">📱</span>
                <span>0362 625 218</span>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>Đà Nẵng, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2026 Hôm Nay Ăn Gì. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Điều khoản sử dụng</a>
            <span>•</span>
            <a href="#">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer