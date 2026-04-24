import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FoodList from './pages/FoodList'
import FoodDetail from './pages/FoodDetail'
import MealPlan from './pages/MealPlan'
import Favorite from './pages/Favorite'
import Login from './pages/Login'
import Register from './pages/Register'
import AIRecommendationPage from './pages/AIRecommendationPage'
import AdminDashboard from './pagesAdmin/AdminDashboard'
import MealsManagement from './pagesAdmin/MealsManagement'
import UsersManagement from './pagesAdmin/UsersManagement'
import Analytics from './pagesAdmin/Analytics'
import Settings from './pagesAdmin/Settings'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'

  console.log('Current path:', location.pathname)
  console.log('Is admin route:', isAdminRoute)
  console.log('Is auth route:', isAuthRoute)

  return (
    <div className="App">
      {!isAdminRoute && !isAuthRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<FoodList />} />
          <Route path="/foods/:id" element={<FoodDetail />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/ai-recommendation" element={<AIRecommendationPage />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/meals" element={<MealsManagement />} />
          <Route path="/admin/users" element={<UsersManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Routes>
      </main>
      {!isAdminRoute && !isAuthRoute && <Footer />}
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