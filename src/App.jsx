import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FlowBackground from './components/ui/FlowBackground'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      {/* Single global gradient — fixed, sits below everything */}
      <FlowBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
