import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FlowBackground from './components/ui/FlowBackground'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'

function AppContent() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Single global background layer */}
      <FlowBackground />
      <Navbar />
      <main className={`flex-1 w-full ${!isHome ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {/* Footer rendered on sub-pages only — homepage is the pure immersive room experience */}
      {!isHome && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
