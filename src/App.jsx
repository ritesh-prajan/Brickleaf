import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LeftRail from './components/layout/LeftRail'
import FlowBackground from './components/ui/FlowBackground'
import ArchPreloader from './components/ui/ArchPreloader'
import ConciergeChatbot from './components/chatbot/ConciergeChatbot'
import Home from './pages/Home'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Terms from './pages/Terms'

/**
 * ScrollToTop — Automatically scrolls window to top (0,0) on any route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function AppContent() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-sand selection:text-ink">
      {/* Editorial Gated Arch Preloader */}
      <ArchPreloader />

      {/* Single global animated gradient background layer */}
      <FlowBackground />

      {/* Global Brand Emblem & Left Rail Navigation (desktop) */}
      <LeftRail />

      {/* Fixed Header Navbar */}
      <Navbar />

      <main className={`flex-1 w-full ${!isHome ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>

      {/* Global Interactive Avatar Design Concierge */}
      <ConciergeChatbot />

      {/* Footer rendered across all pages */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  )
}