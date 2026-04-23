import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FoodList from './pages/FoodList'
import FoodDetail from './pages/FoodDetail'
import MealPlan from './pages/MealPlan'
import Favorite from './pages/Favorite'
import Login from './pages/Login'
import AIRecommendationPage from './pages/AIRecommendationPage'
import './App.css'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foods" element={<FoodList />} />
            <Route path="/foods/:id" element={<FoodDetail />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/ai-recommendation" element={<AIRecommendationPage />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App