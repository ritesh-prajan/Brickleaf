/**
 * LeftRail — Global architectural brand emblem & Contact social pill.
 *
 * Appears fixed on the left rail (desktop).
 * - Circular rotating seal ("• BRICKLEAF • BRICKLEAF • BRICKLEAF") with logo:
 *   Present on ALL pages with scroll-to-top interaction. Always visible.
 * - Social icons floating pill (Instagram, LinkedIn, Pinterest) + vertical indicator:
 *   Displayed ONLY on the Contact page.
 */
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'


const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <line x1="12" y1="9" x2="12" y2="21" />
        <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
        <path d="M10.7 15.7A6 6 0 1 1 18 10.4c-.1 2.4-1.2 4.4-3.4 5.1-1.3.4-2.8-.2-3.3-1.4" />
      </svg>
    ),
  },
]

export default function LeftRail() {
  const location = useLocation()
  const isContactPage = location.pathname === '/contact'
  const railRef = useRef(null)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // (scroll fade-out removed — seal stays visible at all times)

  return (
    <aside
      ref={railRef}
      aria-label="Studio brand seal"
      className="hidden lg:flex flex-col justify-between fixed left-4 xl:left-6 top-24 bottom-10 z-20 pointer-events-none select-none transition-opacity duration-300"
    >
      {/* ── 1. Circular Rotating Seal (On ALL Pages) ── */}
      <div className="pointer-events-auto">
        <button
          type="button"
          onClick={handleScrollTop}
          title="Brickleaf Studio — Back to Top"
          aria-label="Back to top"
          className="relative w-28 h-28 xl:w-36 xl:h-36 flex items-center justify-center group cursor-pointer focus:outline-none"
        >
          {/* SVG Circular Rotating Text */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-[spin_26s_linear_infinite] group-hover:animate-[spin_10s_linear_infinite] transition-all"
          >
            <path
              id="globalLeafPath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[8.5px] uppercase tracking-[0.24em] fill-ink-soft group-hover:fill-amber transition-colors font-medium">
              <textPath href="#globalLeafPath" startOffset="0%">
                • BRICKLEAF • BRICKLEAF • BRICKLEAF
              </textPath>
            </text>
          </svg>

          {/* Center Logo Image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="w-9 h-9 xl:w-11 xl:h-11 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
            />
          </div>
        </button>
      </div>

      {/* ── 2. Social Icons Floating Pill (ONLY ON CONTACT PAGE) ── */}
      {isContactPage && (
        <div className="pointer-events-auto flex flex-col items-center gap-3.5 py-3.5 px-2.5 bg-cream/85 backdrop-blur-md border border-line/80 rounded-full text-ink-soft shadow-lg animate-in fade-in duration-500">
          {SOCIAL_LINKS.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              title={name}
              className="p-1 text-ink-soft hover:text-amber hover:scale-110 transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </div>
      )}

      {/* ── 3. Page Indicator (ONLY ON CONTACT PAGE) ── */}
      {isContactPage && (
        <div className="pointer-events-auto -rotate-90 origin-bottom-left translate-y-6 text-[9.5px] tracking-[0.3em] uppercase text-ink-soft font-semibold animate-in fade-in duration-500">
          <Link to="/" className="hover:text-ink transition-colors">BRICKLEAF</Link>
          <span className="mx-2 text-sand">/</span>
          <span className="text-amber">CONTACT</span>
        </div>
      )}
    </aside>
  )
}