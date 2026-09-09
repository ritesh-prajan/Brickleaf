/**
 * Navbar — fixed top bar with logo, nav links, theme switcher, and CTA.
 * Active link state via NavLink. ThemeSwitcher sits between nav links and CTA.
 */
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import ThemeSwitcher from '../ui/ThemeSwitcher'
import VelocityLogo from '../ui/VelocityLogo'
import { useTheme } from '../../hooks/useTheme'

const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'FAQ',      to: '/faq' },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { theme, themes, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-line">
      <nav
        className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* ── Logo with Scroll-Reactive Velocity Mark ── */}
        <NavLink
          to="/"
          aria-label="Brickleaf — go to home"
          className="flex items-center gap-2 group flex-shrink-0"
        >
          <VelocityLogo />
        </NavLink>

        {/* ── Desktop nav links ─────────────────────────── */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-amber border-b border-amber pb-0.5'
                      : 'text-ink-soft hover:text-ink'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right cluster: ThemeSwitcher + CTA ───────── */}
        <div className="hidden md:flex items-center gap-4">
          {/* Vertical separator */}
          <span aria-hidden="true" className="h-4 w-px bg-line" />

          <ThemeSwitcher
            theme={theme}
            themes={themes}
            setTheme={setTheme}
          />

          {/* Vertical separator */}
          <span aria-hidden="true" className="h-4 w-px bg-line" />

          <Button variant="primary" onClick={() => navigate('/contact')} className="text-xs py-2 px-4">
            Get in Touch
          </Button>
        </div>

        {/* ── Mobile: theme cycle + hamburger ──────────── */}
        <div className="flex md:hidden items-center gap-3">
          {/* Compact single-button cycle for mobile */}
          <button
            type="button"
            aria-label={`Current theme: ${theme}. Tap to cycle themes.`}
            onClick={() => {
              const idx = themes.findIndex(t => t.key === theme)
              setTheme(themes[(idx + 1) % themes.length].key)
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-line text-ink-soft text-[10px] tracking-widest uppercase focus-visible:outline-none focus-visible:border-amber"
          >
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: themes.find(t => t.key === theme)?.swatch }}
            />
            Theme
          </button>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2"
          >
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-4 h-px bg-ink" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ──────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-line px-6 py-6 space-y-4 shadow-xl">
          <ul className="space-y-3 list-none p-0 m-0">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-ink hover:text-amber py-1"
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
              className="w-full text-xs justify-center"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
