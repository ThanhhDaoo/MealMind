import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FoodList from './pages/FoodList'
import FoodDetail from './pages/FoodDetail'
import MealPlan from './pages/MealPlan'
import Favorite from './pages/Favorite'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foods" element={<FoodList />} />
            <Route path="/foods/:id" element={<FoodDetail />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App