/**
 * Navbar — Fixed translucent luxury glass header.
 *
 * Fully Responsive:
 * - Desktop: Translucent glass bar with brand logo, inline navigation, and CTA.
 * - Mobile: Minimalist animated hamburger triggering a luxury frosted drawer.
 * - Mobile Drawer: Body scroll lock, ESC close, backdrop tap-to-close, 48px+ touch targets, active route indicator, full-width CTA.
 */
import { useRef, useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Button from '../ui/Button'
import { useScrollTheme } from '../../hooks/useScrollTheme'

const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'FAQ',      to: '/faq' },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)

  // Adapts navbar translucent glass color as user scrolls past dark/light sections
  useScrollTheme(headerRef)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      id="site-navbar"
      ref={headerRef}
      className="site-navbar fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-500"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* ── Static Brand Logo ── */}
        <NavLink
          to="/"
          aria-label="Brickleaf Studio — Home"
          className="flex items-center gap-2.5 group flex-shrink-0 py-1"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-amber fill-amber/20 stroke-amber transition-transform duration-300 group-hover:scale-105"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C8.5 7 7.5 12 10.5 16.5C12 18.8 14 20.5 15.5 22C16.5 20.5 17.5 18 17.5 14.5C17.5 9 15 4 12 2Z" />
            <path d="M12 2C13 8 14 14 15.5 22" strokeWidth="1.2" />
          </svg>

          <span className="nav-brand-text font-display text-lg sm:text-xl font-medium text-ink tracking-tight transition-colors duration-500 flex items-center">
            Brickleaf
            <span className="nav-dot inline-block w-1.5 h-1.5 rounded-full bg-amber ml-1 mb-0.5 transition-colors duration-500" />
          </span>
        </NavLink>

        {/* ── Desktop Navigation Links ─────────────────────────── */}
        <ul className="hidden md:flex items-center gap-7 lg:gap-9 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 py-1 ${
                    isActive
                      ? 'active text-amber border-b border-amber pb-0.5 font-semibold'
                      : 'text-ink-soft hover:text-ink'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right Cluster: Primary CTA (Desktop) ─────────────── */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/contact')}
            className="text-xs py-2 px-5 tracking-wider uppercase shadow-sm"
          >
            Get in Touch
          </Button>
        </div>

        {/* ── Mobile Hamburger Button ──────────────────────────── */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 -mr-1.5 text-ink focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center flex-col gap-1.5 cursor-pointer"
          >
            <span
              className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2 bg-ink' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-ink transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-ink' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown & Full Drawer ─────────────────────── */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="md:hidden fixed inset-x-0 top-16 bg-cream/95 backdrop-blur-2xl border-b border-line shadow-2xl h-[calc(100vh-4rem)] h-[calc(100dvh-4rem)] flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-top-2 duration-300 overflow-y-auto"
        >
          {/* Main Mobile Navigation Links */}
          <div className="space-y-6 pt-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-sand font-semibold block">
              [ Studio Directory ]
            </span>
            <ul className="space-y-4 list-none p-0 m-0">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between text-lg uppercase tracking-[0.18em] py-2 border-b border-line/40 transition-colors ${
                        isActive
                          ? 'text-amber font-semibold border-amber'
                          : 'text-ink hover:text-amber'
                      }`
                    }
                  >
                    <span>{label}</span>
                    <span className="text-sand text-xs font-mono">→</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Drawer Actions */}
          <div className="pt-6 space-y-4 border-t border-line/60">
            <Button
              variant="primary"
              onClick={() => {
                setMobileMenuOpen(false)
                navigate('/contact')
              }}
              className="w-full text-xs justify-center uppercase tracking-wider py-3.5 shadow-md"
            >
              Get in Touch — Start Brief
            </Button>

            <div className="flex flex-col text-[11px] text-ink-soft/80 pt-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <span>1/85 OMR Kelambakkam Chennai</span>
                <a href="tel:+919876543210" className="text-amber font-medium">
                  +91 98765 43210
                </a>
              </div>
              <span className="text-[10px] text-sand">[ above Shri SHakthi tvs showroom , 4th floor ]</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}