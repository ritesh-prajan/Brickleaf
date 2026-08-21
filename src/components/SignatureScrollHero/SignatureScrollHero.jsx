import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { STAGES, TIMELINE } from './constants'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import './SignatureScrollHero.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * SignatureScrollHero
 *
 * 8 complete full-room images stacked in identical position.
 * Scroll progress drives opacity crossfades between them.
 * The architecture never moves — only the furnishing changes.
 *
 * Implementation:
 *   ONE GSAP ScrollTrigger timeline.
 *   Each image plate gets two tweens: fadeIn and fadeOut.
 *   The last stage stays at opacity 1 (no fadeOut).
 *   No React state updated per scroll frame.
 *   GSAP manipulates DOM opacity directly.
 *   React state only tracks the HUD step index.
 */
export default function SignatureScrollHero() {
  const navigate = useNavigate()

  const sectionRef = useRef(null)
  const plateRefs  = useRef([])
  const ctaRef     = useRef(null)
  const hintRef    = useRef(null)

  const [activeStep, setActiveStep] = useState(0)
  const [isLoaded, setIsLoaded]     = useState(false)

  // ── Preload all stage images ──────────────────────────────────────────
  useEffect(() => {
    let loaded = 0
    const total = STAGES.length
    const fallback = setTimeout(() => setIsLoaded(true), 4000)

    STAGES.forEach((stage, i) => {
      const img = new Image()
      // Eagerly preload first 3, rest can load normally
      if (i < 3) img.fetchPriority = 'high'
      img.src = stage.src
      img.onload = img.onerror = () => {
        loaded++
        if (loaded >= total) {
          clearTimeout(fallback)
          setIsLoaded(true)
        }
      }
    })

    return () => clearTimeout(fallback)
  }, [])

  // ── GSAP ScrollTrigger Timeline ───────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return

    const section = sectionRef.current
    const plates  = plateRefs.current.filter(Boolean)
    if (!section || plates.length === 0) return

    const ctx = gsap.context(() => {
      // Initial: stage 1 visible, all others hidden
      plates.forEach((plate, i) => {
        gsap.set(plate, { opacity: i === 0 ? 1 : 0 })
      })
      gsap.set(ctaRef.current, { opacity: 0, pointerEvents: 'none' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate(self) {
            const p = self.progress
            // Determine which stage is dominant at this progress
            let step = 0
            for (let i = TIMELINE.stages.length - 1; i >= 0; i--) {
              if (p >= TIMELINE.stages[i].fadeIn) { step = i; break }
            }
            setActiveStep(prev => prev !== step ? step : prev)
          },
        },
      })

      // ── Build crossfade tweens for each stage ─────────────────────────
      TIMELINE.stages.forEach((timing, i) => {
        const plate = plates[i]
        if (!plate) return

        const isFirst = i === 0
        const isLast  = i === STAGES.length - 1

        // FADE IN (skip for first — it starts at 1)
        if (!isFirst) {
          tl.to(plate, {
            opacity: 1,
            duration: timing.hold - timing.fadeIn,
            ease: 'power1.inOut',
          }, timing.fadeIn)
        }

        // FADE OUT (skip for last — it stays at 1)
        if (!isLast) {
          tl.to(plate, {
            opacity: 0,
            duration: timing.fadeOut - timing.hold,
            ease: 'power1.inOut',
          }, timing.hold)
        }
      })

      // ── Scroll hint fades out quickly ─────────────────────────────────
      tl.to(hintRef.current, {
        opacity: 0,
        duration: 0.06,
      }, 0.03)

      // ── CTA overlay fades in at the very end ──────────────────────────
      tl.to(ctaRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.06,
        ease: 'power1.out',
      }, 0.95)

    }, section)

    return () => ctx.revert()
  }, [isLoaded])

  // ── Render ────────────────────────────────────────────────────────────
  const currentStage = STAGES[activeStep]

  return (
    <section
      ref={sectionRef}
      className="ssh"
      aria-label="Scroll-driven interior transformation hero"
    >
      <div className="ssh__sticky">

        {/* ── HUD Top ──────────────────────────────────────────────────── */}
        <header className="ssh__hud-top">
          <div className="ssh__tag">
            <span className="ssh__tag-dot" />
            {currentStage.tag}
          </div>
          <div className="ssh__dots" aria-label="Transformation progress">
            {STAGES.map((s, i) => (
              <span
                key={s.id}
                className={`ssh__dot ${
                  i === activeStep ? 'ssh__dot--active' :
                  i < activeStep  ? 'ssh__dot--done' : ''
                }`}
                title={s.title}
              />
            ))}
          </div>
        </header>

        {/* ── Scene — stacked image plates ─────────────────────────────── */}
        <div className="ssh__scene">
          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              ref={(el) => (plateRefs.current[i] = el)}
              className="ssh__plate"
            >
              <img
                src={stage.src}
                alt={stage.alt}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}

          {/* ── Final CTA ──────────────────────────────────────────────── */}
          <div ref={ctaRef} className="ssh__cta">
            <div className="ssh__cta-inner">
              <Eyebrow className="text-sand">[ Brickleaf Interior Studio ]</Eyebrow>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream font-light leading-tight">
                Crafting Timeless Architectural Sanctuary
              </h1>
              <p className="text-cream/75 text-sm sm:text-base max-w-md leading-relaxed font-body">
                From empty canvas to warm, curated interior.
                Brickleaf designs spaces that resonate with warmth and purpose.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" onClick={() => navigate('/services')}>
                  Explore Services
                </Button>
                <Button
                  variant="outline"
                  className="border-cream/50 text-cream hover:bg-cream hover:text-ink"
                  onClick={() => navigate('/contact')}
                >
                  Start Your Brief
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── HUD Bottom ───────────────────────────────────────────────── */}
        <footer className="ssh__hud-bot">
          <div className="ssh__info">
            <span className="ssh__info-title">{currentStage.title}</span>
            <span className="ssh__info-desc">{currentStage.desc}</span>
          </div>

          <div ref={hintRef} className="ssh__hint">
            <span>Scroll to design the space</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </footer>

      </div>
    </section>
  )
}
