import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FoodList from './pages/FoodList'
import FoodDetail from './pages/FoodDetail'
import MealPlan from './pages/MealPlan'
import Favorite from './pages/Favorite'
import Login from './pages/Login'
import AIRecommendationPage from './pages/AIRecommendationPage'
import AdminDashboard from './pagesAdmin/AdminDashboard'
import MealsManagement from './pagesAdmin/MealsManagement'
import UsersManagement from './pagesAdmin/UsersManagement'
import Analytics from './pagesAdmin/Analytics'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isLoginRoute = location.pathname === '/login'

  return (
    <div className="App">
      {!isAdminRoute && !isLoginRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<FoodList />} />
          <Route path="/foods/:id" element={<FoodDetail />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/ai-recommendation" element={<AIRecommendationPage />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/meals" element={<MealsManagement />} />
          <Route path="/admin/users" element={<UsersManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Routes>
      </main>
      {!isAdminRoute && !isLoginRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  )
}

export default App