/**
 * Footer — Site-wide luxury editorial footer.
 *
 * Features:
 * - Brand & Ethos with studio motto "Design spaces , elevate life".
 * - Quick Navigation & Studio Liaison.
 * - Legal, copyright, and policy links.
 * - Instant scroll-to-top on navigation.
 */
import { NavLink } from 'react-router-dom'
import SectionDivider from '../ui/SectionDivider'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Terms & Conditions', to: '/terms' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const handleNavClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  return (
    <footer
      data-bg="dark"
      className="bg-ink text-cream/75 pt-12 sm:pt-16 pb-8 sm:pb-10 px-4 sm:px-10 lg:px-16 border-t border-sand/20 relative z-30 font-body select-none mt-auto"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Top Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-14 mb-10 sm:mb-14">

          {/* 1. Brand & Studio Ethos + Motto */}
          <div className="space-y-3 sm:space-y-4 max-w-sm">
            <div>
              <span className="font-display text-2xl sm:text-3xl font-light text-cream tracking-tight block">
                Brickleaf<span className="inline-block w-1.5 h-1.5 rounded-full bg-amber ml-1 mb-0.5" />
              </span>
              <p className="font-display italic text-amber text-xs sm:text-sm tracking-wide mt-1">
                “Design spaces , elevate life”
              </p>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-cream/70 font-light">
              A luxury interior architecture studio specializing in high-end residential new builds, spatial renovations, and bespoke material curation.
            </p>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-sand font-semibold pt-1">
              Chennai • Pan-India
            </p>
          </div>

          {/* 2. Navigation Directory */}
          <nav aria-label="Footer navigation" className="space-y-3 sm:space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-sand font-semibold">
              Navigation
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-1.5 sm:gap-2.5 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={handleNavClick}
                    className="text-xs sm:text-sm text-cream/70 hover:text-amber transition-colors duration-200 tracking-wide inline-block py-1 sm:py-0.5"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Studio Inquiries */}
          <div className="space-y-3 sm:space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-sand font-semibold">
              Studio Liaison
            </p>
            <address className="not-italic text-xs sm:text-sm space-y-1.5 sm:space-y-2 text-cream/80 font-light">
              <div>
                <p>1/85 OMR Kelambakkam Chennai</p>
                <p className="text-[11px] text-cream/60 font-light pt-0.5">
                  Above Shari Shakthi TVS , 4th Floor
                </p>
              </div>
              <p className="pt-1">
                <a href="mailto:Info@brickleaf.com" className="hover:text-amber transition-colors duration-200 font-medium text-cream inline-block py-0.5">
                  Info@brickleaf.com
                </a>
              </p>
              <p>
                <a href="mailto:help.brickleaf@gmail.com" className="hover:text-amber transition-colors duration-200 text-cream/70 inline-block py-0.5 text-xs">
                  help.brickleaf@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+919876543210" className="hover:text-amber transition-colors duration-200 font-medium text-cream inline-block py-0.5">
                  +91 98765 43210
                </a>
              </p>
            </address>
          </div>

        </div>

        <SectionDivider className="border-line/20" />

        {/* ── Bottom Legal Bar ───────────────────────────────────────── */}
        <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] text-cream/40 tracking-wider text-center md:text-left">
          <p>© {year} Brickleaf Interior Studio. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-sand/80 font-mono tracking-widest uppercase text-[10px]">
              Design spaces , elevate life
            </span>
            <span className="hidden sm:inline">✦</span>
            <NavLink to="/terms" onClick={handleNavClick} className="hover:text-cream transition-colors py-1">
              Terms &amp; Privacy
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}