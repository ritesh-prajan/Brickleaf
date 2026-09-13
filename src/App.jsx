import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LeftRail from './components/layout/LeftRail'
import FlowBackground from './components/ui/FlowBackground'
import ArchPreloader from './components/ui/ArchPreloader'
import ConciergeChatbot from './components/chatbot/ConciergeChatbot'

// Route-level code splitting
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Faq = lazy(() => import('./pages/Faq'))
const Contact = lazy(() => import('./pages/Contact'))
const Terms = lazy(() => import('./pages/Terms'))

/**
 * Minimalist luxury loading fallback for lazy-loaded route transitions.
 */
function PageFallback() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center" aria-busy="true">
      <div className="w-5 h-5 rounded-full border border-sand/40 border-t-amber animate-spin" />
    </div>
  )
}

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
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Suspense>
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