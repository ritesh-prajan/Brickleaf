/**
 * Navbar — Fixed luxury header.
 *
 * Features:
 * - Static, elegant architectural leaf brand mark + "Brickleaf" typography (non-spinning).
 * - Clean editorial navigation links with active state indicators.
 * - Primary "Get in Touch" CTA button.
 * - Adaptive scroll theme transitions over dark/light sections.
 * - Responsive mobile drawer menu.
 */
import { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)

  // Adapts navbar background / text color as user scrolls past dark/light sections
  useScrollTheme(headerRef)

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-line transition-all duration-500"
    >
      <nav
        className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between gap-6"
        aria-label="Main navigation"
      >
        {/* ── Static Brand Logo (Clean, non-spinning) ── */}
        <NavLink
          to="/"
          aria-label="Brickleaf Studio — Home"
          className="flex items-center gap-2.5 group flex-shrink-0"
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

          <span className="nav-brand-text font-display text-xl font-medium text-ink tracking-tight transition-colors duration-500 flex items-center">
            Brickleaf
            <span className="nav-dot inline-block w-1.5 h-1.5 rounded-full bg-amber ml-1 mb-0.5 transition-colors duration-500" />
          </span>
        </NavLink>

        {/* ── Desktop Navigation Links ─────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
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

        {/* ── Right Cluster: Primary CTA ───────────────────────── */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="primary"
            onClick={() => navigate('/contact')}
            className="text-xs py-2 px-5 tracking-wider uppercase"
          >
            Get in Touch
          </Button>
        </div>

        {/* ── Mobile Hamburger Button ──────────────────────────── */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2 text-ink focus:outline-none"
          >
            <span
              className={`block w-6 h-0.5 bg-ink transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-ink transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-ink transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ──────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-line px-6 py-6 space-y-5 shadow-2xl animate-in slide-in-from-top duration-300">
          <ul className="space-y-3.5 list-none p-0 m-0">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-[0.2em] text-ink hover:text-amber py-1 font-medium"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Button
              variant="primary"
              onClick={() => {
                setMobileMenuOpen(false)
                navigate('/contact')
              }}
              className="w-full text-xs justify-center uppercase tracking-wider py-3"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}