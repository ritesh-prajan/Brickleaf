/**
 * Footer — Site-wide luxury editorial footer.
 *
 * Features:
 * - Clear 3-column architecture (Brand & Ethos, Quick Navigation, Studio Inquiries & Socials).
 * - Direct email and telephone links with warm amber hover accents.
 * - Clean SVG social buttons.
 * - Legal, copyright, and policy links.
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
  {
    name: 'Houzz',
    href: 'https://houzz.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      data-bg="dark"
      className="bg-ink text-cream/75 pt-16 pb-10 px-6 sm:px-10 lg:px-16 border-t border-sand/20 relative z-20 font-body select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Top 3-Column Grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-14 mb-14">

          {/* 1. Brand & Studio Ethos */}
          <div className="space-y-4 max-w-sm">
            <span className="font-display text-2xl font-light text-cream tracking-tight block">
              Brickleaf<span className="inline-block w-1.5 h-1.5 rounded-full bg-amber ml-1 mb-0.5" />
            </span>
            <p className="text-xs sm:text-sm leading-relaxed text-cream/70 font-light">
              A luxury interior architecture studio specializing in high-end residential new builds, spatial renovations, and bespoke material curation.
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-sand font-semibold pt-1">
              Chennai • Hyderabad • Pan-India
            </p>
          </div>

          {/* 2. Navigation Directory */}
          <nav aria-label="Footer navigation" className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-sand font-semibold">
              Navigation
            </p>
            <ul className="space-y-2.5 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="text-xs sm:text-sm text-cream/70 hover:text-amber transition-colors duration-200 tracking-wide inline-block py-0.5"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. Studio Inquiries & Socials */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-sand font-semibold">
              Studio Liaison
            </p>
            <address className="not-italic text-xs sm:text-sm space-y-2 text-cream/80 font-light">
              <p>Kelambakkam Bypass Rd, Chennai</p>
              <p>Tamil Nadu, India</p>
              <p className="pt-1">
                <a href="mailto:hello@brickleaf.co" className="hover:text-amber transition-colors duration-200 font-medium text-cream">
                  hello@brickleaf.co
                </a>
              </p>
              <p>
                <a href="tel:+919876543210" className="hover:text-amber transition-colors duration-200 font-medium text-cream">
                  +91 98765 43210
                </a>
              </p>
            </address>

            {/* Social SVG Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {SOCIAL_LINKS.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  className="p-2 border border-line/40 text-cream/70 hover:border-amber hover:text-amber hover:scale-105 transition-all duration-200 rounded-[2px]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <SectionDivider className="border-line/20" />

        {/* ── Bottom Legal Bar ───────────────────────────────────────── */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-cream/40 tracking-wider">
          <p>© {year} Brickleaf Interior Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <NavLink to="/terms" className="hover:text-cream transition-colors">
              Terms &amp; Privacy
            </NavLink>
            <span className="hidden sm:inline">✦</span>
            <span>Designed with intention.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}