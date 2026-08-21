import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { STAGES, REVEALS, SCROLL_HEIGHT } from './constants'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import './SignatureScrollHero.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * SignatureScrollHero — Luxury Crossfade
 *
 * ARCHITECTURE:
 *   8 identical-sized complete-room images stacked at the same position.
 *   Stage 1 (empty dark) starts at opacity 1 — always visible at the bottom.
 *   Each subsequent stage fades IN from 0 → 1 on top of the previous.
 *   No image ever fades OUT. It stays at opacity 1, covered by the next.
 *
 * GUARANTEE:
 *   At every scroll position, a fully-opaque room image is visible.
 *   The page background is NEVER exposed.
 *   The room NEVER darkens between stages.
 *   The architecture remains pixel-locked.
 *
 * PERFORMANCE:
 *   One GSAP ScrollTrigger timeline. No React state per scroll frame.
 *   GSAP sets opacity directly on DOM elements.
 *   Only the HUD step index uses React state (updated only when it changes).
 */
export default function SignatureScrollHero() {
  const navigate = useNavigate()

  const sectionRef = useRef(null)
  const plateRefs  = useRef([])
  const ctaRef     = useRef(null)
  const hintRef    = useRef(null)

  const [activeStep, setActiveStep] = useState(0)
  const [isLoaded, setIsLoaded]     = useState(false)

  // ── Preload images ────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0
    const total = STAGES.length
    const fallback = setTimeout(() => setIsLoaded(true), 5000)

    STAGES.forEach((stage, i) => {
      const img = new Image()
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

  // ── GSAP Timeline ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return

    const section = sectionRef.current
    const plates  = plateRefs.current.filter(Boolean)
    if (!section || plates.length === 0) return

    const ctx = gsap.context(() => {
      // ── Initial state: Stage 1 visible, all others invisible ──────────
      plates.forEach((plate, i) => {
        gsap.set(plate, { opacity: i === 0 ? 1 : 0 })
      })
      gsap.set(ctaRef.current, { opacity: 0, pointerEvents: 'none' })

      // ── Master timeline driven by scroll ──────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,  // slight cinematic lag for premium feel
          onUpdate(self) {
            const p = self.progress
            // Determine dominant stage for HUD display
            let step = 0
            for (let i = REVEALS.length - 1; i >= 0; i--) {
              const reveal = REVEALS[i]
              if (reveal === null) { if (i === 0) step = 0; continue }
              // Stage is dominant once its reveal is past the midpoint
              const mid = (reveal[0] + reveal[1]) / 2
              if (p >= mid) { step = i; break }
            }
            setActiveStep(prev => prev !== step ? step : prev)
          },
        },
      })

      // ── Build reveal tweens ───────────────────────────────────────────
      // Each image ONLY fades IN. Never fades out. This is the key.
      REVEALS.forEach((reveal, i) => {
        if (reveal === null) return  // Stage 1 — always visible
        const plate = plates[i]
        if (!plate) return

        const [start, end] = reveal
        const duration = end - start

        tl.to(plate, {
          opacity: 1,
          duration: duration,
          ease: 'power2.inOut',   // smooth luxury ease — starts imperceptibly
        }, start)
      })

      // ── Scroll hint fades out as user begins scrolling ────────────────
      tl.to(hintRef.current, {
        opacity: 0,
        duration: 0.04,
        ease: 'power1.out',
      }, 0.02)

      // ── CTA fades in at the very end ──────────────────────────────────
      tl.to(ctaRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.06,
        ease: 'power2.out',
      }, 0.96)

    }, section)

    return () => ctx.revert()
  }, [isLoaded])

  // ── Render ────────────────────────────────────────────────────────────
  const currentStage = STAGES[activeStep]

  return (
    <section
      ref={sectionRef}
      className="ssh"
      style={{ height: SCROLL_HEIGHT }}
      aria-label="Scroll-driven interior transformation"
    >
      <div className="ssh__sticky">

        {/* ── HUD Top ─────────────────────────────────────────────────── */}
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

        {/* ── Scene — stacked image plates ────────────────────────────── */}
        <div className="ssh__scene">
          {/*
            Image stacking order:
            Stage 1 at the bottom (z-index 1) — always opacity 1.
            Stage 2 above it (z-index 2) — fades in over Stage 1.
            Stage 3 above that (z-index 3) — fades in over Stage 2.
            ...
            Stage 8 on top (z-index 8) — fades in last.

            At any point: the highest fully-opaque image is the visible room.
            Lower images are harmlessly hidden beneath.
            The dark background is NEVER exposed.
          */}
          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              ref={(el) => (plateRefs.current[i] = el)}
              className="ssh__plate"
              style={{ zIndex: i + 1 }}
            >
              <img
                src={stage.src}
                alt={stage.alt}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}

          {/* ── CTA overlay — appears at 96%+ scroll ──────────────────── */}
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

        {/* ── HUD Bottom ──────────────────────────────────────────────── */}
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
