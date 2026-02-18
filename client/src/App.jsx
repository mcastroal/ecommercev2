import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import './App.css'

export default function App() {
  return (
    <div className='app-shell'>
      <NavBar />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
