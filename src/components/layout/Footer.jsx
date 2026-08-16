/**
 * Footer — site-wide footer with logo, nav, socials, contact info, copyright.
 */
import { NavLink } from 'react-router-dom'
import SectionDivider from '../ui/SectionDivider'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

const SOCIAL_PLACEHOLDERS = ['Instagram', 'Pinterest', 'LinkedIn', 'Houzz']

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream/70 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand column */}
          <div className="space-y-4">
            <span className="font-display text-2xl font-medium text-cream tracking-tight block">
              Brickleaf<span className="inline-block w-1.5 h-1.5 rounded-full bg-amber ml-1 mb-1" />
            </span>
            <p className="text-sm leading-relaxed max-w-xs">
              [Tagline placeholder — one-sentence brand promise goes here.]
            </p>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <p className="text-xs tracking-[0.2em] uppercase text-sand mb-4 font-semibold">
              Navigation
            </p>
            <ul className="space-y-3 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="text-sm hover:text-cream transition-colors duration-200"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-sand mb-4 font-semibold">
              Studio
            </p>
            <address className="not-italic text-sm space-y-2">
              <p>[Studio Address Placeholder]</p>
              <p>[City, Postcode]</p>
              <p>
                <a href="mailto:hello@brickleaf.co" className="hover:text-cream transition-colors duration-200">
                  hello@brickleaf.co
                </a>
              </p>
              <p>
                <a href="tel:+00000000000" className="hover:text-cream transition-colors duration-200">
                  +00 000 000 0000
                </a>
              </p>
            </address>

            {/* Social row */}
            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIAL_PLACEHOLDERS.map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={`${name} — placeholder link`}
                  className="
                    text-xs tracking-widest uppercase border border-line px-3 py-1.5
                    hover:border-sand hover:text-cream transition-all duration-200
                  "
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

        </div>

        <SectionDivider className="border-line/30" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40 tracking-wide">
          <p>© {year} Brickleaf Interior Studio. All rights reserved.</p>
          <p>Designed with intention.</p>
        </div>
      </div>
    </footer>
  )
}
