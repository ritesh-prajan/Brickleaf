import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionDivider from '../ui/SectionDivider'
import { HeadlineReveal, SubheadingFlip, LineMaskRise } from '../ui/MotionText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

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
  const sentinelRef = useRef(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sentinel.parentElement,
        { scale: 0.97, transformOrigin: 'bottom center' },
        {
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sentinel,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 0.8,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer
      data-bg="dark"
      className="bg-ink text-cream/70 pt-16 pb-8 px-6 border-t border-sand/20 will-change-transform relative"
    >
      <div ref={sentinelRef} className="absolute -top-2 left-0 w-full h-px pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <HeadlineReveal
              as="span"
              className="font-display text-2xl font-medium text-cream tracking-tight block"
            >
              Brickleaf
            </HeadlineReveal>
            <LineMaskRise as="p" className="text-sm leading-relaxed max-w-xs text-cream/75">
              A luxury interior architecture studio specializing in high-end residential new builds, spatial renovations, and bespoke material curation.
            </LineMaskRise>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <SubheadingFlip as="p" className="text-xs tracking-[0.2em] uppercase text-sand mb-4 font-semibold">
              Navigation
            </SubheadingFlip>
            <ul className="space-y-2.5 list-none m-0 p-0">
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
            <SubheadingFlip as="p" className="text-xs tracking-[0.2em] uppercase text-sand mb-4 font-semibold">
              Studio
            </SubheadingFlip>
            <address className="not-italic text-sm space-y-2 text-cream/80 font-body">
              <p>Kelambakkam Bypass Rd</p>
              <p>Chennai, Tamil Nadu, India</p>
              <p>
                <a href="mailto:hello@brickleaf.co" className="hover:text-amber transition-colors duration-200">
                  hello@brickleaf.co
                </a>
              </p>
              <p>
                <a href="tel:+919876543210" className="hover:text-amber transition-colors duration-200">
                  +91 98765 43210
                </a>
              </p>
            </address>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 border border-line/60 text-cream/60 hover:border-sand hover:text-cream transition-all duration-200 hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 border border-line/60 text-cream/60 hover:border-sand hover:text-cream transition-all duration-200 hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="p-2 border border-line/60 text-cream/60 hover:border-sand hover:text-cream transition-all duration-200 hover:scale-105"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
                  <path d="M10.7 15.7A6 6 0 1 1 18 10.4c-.1 2.4-1.2 4.4-3.4 5.1-1.3.4-2.8-.2-3.3-1.4" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <SectionDivider className="border-line/30" />

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40 tracking-wide">
          <p>© {year} Brickleaf Interior Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <NavLink to="/terms" className="hover:text-cream transition-colors">
              Terms &amp; Privacy
            </NavLink>
            <span>Designed with intention.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}