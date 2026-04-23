import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍜 Hôm Nay Ăn Gì
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/foods" className="nav-link">
              Món ăn
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/meal-plan" className="nav-link">
              Kế hoạch tuần
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ai-suggest" className="nav-link">
              AI gợi ý
            </Link>
          </li>
        </ul>
        <Link to="/ai-suggest" className="cta-primary">
          Gợi ý ngay
        </Link>
      </div>
    </nav>
  )
}

export default Navbar