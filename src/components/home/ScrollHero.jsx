/**
 * ScrollHero — Flagship homepage hero sequence tied to scroll position.
 *
 * As the user scrolls down through the pinned 320vh container:
 * 1. Room begins as a dim, empty architectural canvas.
 * 2. Walls get color, texture, & wainscoting moldings.
 * 3. A luxury textured rug unrolls onto the floor.
 * 4. Curated furniture pieces (sofa, coffee table, art) slide into place.
 * 5. Warm pendant lighting turns on, illuminating the space.
 * 6. Camera settles and the final hero headline & CTAs fade into focus.
 */

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomCanvas from './RoomCanvas'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'

const SEQUENCE_STEPS = [
  { id: 1, tag: '01 / RAW CANVAS',       title: 'Architectural Blueprint',      desc: 'An empty space awaiting form, light, and narrative.' },
  { id: 2, tag: '02 / SURFACES',         title: 'Wall Texture & Plaster',      desc: 'Tactile plaster finishes and refined wood trim.' },
  { id: 3, tag: '03 / FOUNDATION',       title: 'Hand-Woven Rug Unrolling',    desc: 'Grounding the room with organic textile warmth.' },
  { id: 4, tag: '04 / SPATIAL FORM',     title: 'Curated Designer Furniture',  desc: 'Sculptural seating and artisanal coffee table.' },
  { id: 5, tag: '05 / ATMOSPHERE',       title: 'Warm Illumination',           desc: 'Architectural lighting turning space into sanctuary.' },
]

export default function ScrollHero() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Calculate scroll progress (0.0 to 1.0)
  useEffect(() => {
    if (isReducedMotion) return

    let rafId = null

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight

      if (totalScrollable <= 0) return

      // Distance scrolled into the container
      const scrolled = -rect.top
      const calculated = Math.min(Math.max(scrolled / totalScrollable, 0), 1)

      rafId = requestAnimationFrame(() => {
        setProgress(calculated)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isReducedMotion])

  // Current active step index (0 to 4)
  const effectiveProgress = isReducedMotion ? 1 : progress
  const currentStepIndex = Math.min(
    Math.floor(effectiveProgress * SEQUENCE_STEPS.length),
    SEQUENCE_STEPS.length - 1
  )
  const activeStep = SEQUENCE_STEPS[currentStepIndex]

  // Hero reveal opacity (fades in during final 20% of scroll)
  const heroRevealOpacity = isReducedMotion
    ? 1
    : Math.min(Math.max((effectiveProgress - 0.75) / 0.20, 0), 1)

  return (
    <div
      ref={containerRef}
      id="scroll-hero-container"
      className="relative w-full h-[320vh] bg-cream text-ink"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center py-6 px-4 md:px-8 overflow-hidden">

        {/* ── TOP HUD HEADER ─────────────────────────────────────── */}
        <header className="w-full max-w-6xl flex items-center justify-between z-20 pt-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
            <Eyebrow className="text-sand">{activeStep.tag}</Eyebrow>
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center gap-2" aria-label="Build sequence steps">
            {SEQUENCE_STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex
              return (
                <div
                  key={step.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6 bg-amber'
                      : idx < currentStepIndex
                      ? 'w-2 bg-sand'
                      : 'w-2 bg-line/40'
                  }`}
                  title={step.title}
                />
              )
            })}
          </div>
        </header>

        {/* ── CENTER VISUAL FRAME ─────────────────────────────────── */}
        <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2">

          {/* Canvas Room Sequence */}
          <RoomCanvas progress={effectiveProgress} />

          {/* Final Hero Title & Action Overlay (Appears as sequence completes) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-ink/75 backdrop-blur-sm rounded-lg transition-opacity duration-500 z-10"
            style={{
              opacity: heroRevealOpacity,
              pointerEvents: heroRevealOpacity > 0.5 ? 'auto' : 'none',
            }}
          >
            <div className="max-w-xl space-y-5">
              <Eyebrow className="text-sand">[ Luxury Interior Design Studio ]</Eyebrow>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream font-light leading-tight">
                Let&rsquo;s Design Your Next Space
              </h1>
              <p className="text-cream/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Crafting timeless architectural sanctuaries through tailored interior design, material richness, and spatial harmony.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-3">
                <Button
                  variant="primary"
                  onClick={() => navigate('/services')}
                  id="hero-reveal-services-btn"
                >
                  Explore Services
                </Button>
                <Button
                  variant="outline"
                  className="border-cream/60 text-cream hover:bg-cream hover:text-ink"
                  onClick={() => navigate('/contact')}
                  id="hero-reveal-contact-btn"
                >
                  Start Project Brief
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM HUD FOOTER / CAPTION ─────────────────────────── */}
        <footer className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pb-2 border-t border-line/40 pt-3">
          <div className="text-left space-y-0.5">
            <p className="text-xs uppercase tracking-widest text-ink font-semibold">
              {activeStep.title}
            </p>
            <p className="text-xs text-ink-soft">
              {activeStep.desc}
            </p>
          </div>

          {/* Scroll Prompt indicator */}
          {!isReducedMotion && effectiveProgress < 0.9 && (
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-sand animate-bounce">
              <span>Scroll to build space</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}

          {effectiveProgress >= 0.9 && (
            <div className="text-xs tracking-widest uppercase text-amber font-medium">
              ✓ Space Complete
            </div>
          )}
        </footer>

      </div>
    </div>
  )
}
