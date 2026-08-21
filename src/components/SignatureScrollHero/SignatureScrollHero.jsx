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
 * SignatureScrollHero — Fullscreen Homepage Experience
 *
 * The ENTIRE homepage is this scroll-driven interior transformation.
 * 8 full-bleed photorealistic room images stacked edge-to-edge.
 * Fixed header above, full-screen room filling the viewport.
 * Zero cards, zero outer borders, zero dark gaps.
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
    const fallback = setTimeout(() => setIsLoaded(true), 4000)

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
      // ── Initial state: Stage 1 visible (opacity 1), all others invisible
      plates.forEach((plate, i) => {
        gsap.set(plate, { opacity: i === 0 ? 1 : 0 })
      })
      gsap.set(ctaRef.current, { opacity: 0, pointerEvents: 'none' })

      // ── Master timeline driven strictly by scroll ─────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8, // Smooth cinematic scrub
          onUpdate(self) {
            const p = self.progress
            // Determine active stage for HUD
            let step = 0
            for (let i = REVEALS.length - 1; i >= 0; i--) {
              const reveal = REVEALS[i]
              if (reveal === null) { if (i === 0) step = 0; continue }
              const mid = (reveal[0] + reveal[1]) / 2
              if (p >= mid) { step = i; break }
            }
            setActiveStep(prev => prev !== step ? step : prev)
          },
        },
      })

      // ── Build progressive reveal tweens (0 → 1) ───────────────────────
      REVEALS.forEach((reveal, i) => {
        if (reveal === null) return // Stage 1 is permanent base
        const plate = plates[i]
        if (!plate) return

        const [start, end] = reveal
        const duration = end - start

        tl.to(plate, {
          opacity: 1,
          duration: duration,
          ease: 'power2.inOut',
        }, start)
      })

      // ── Scroll hint fades out early on scroll ─────────────────────────
      tl.to(hintRef.current, {
        opacity: 0,
        duration: 0.04,
        ease: 'power1.out',
      }, 0.02)

      // ── Final CTA overlay emerges at the very end ─────────────────────
      tl.to(ctaRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.06,
        ease: 'power2.out',
      }, 0.96)

    }, section)

    return () => ctx.revert()
  }, [isLoaded])

  const currentStage = STAGES[activeStep]

  return (
    <div
      ref={sectionRef}
      className="ssh-page"
      style={{ height: SCROLL_HEIGHT }}
      aria-label="Immersive full-screen interior transformation"
    >
      {/* ── Sticky Fullscreen Viewport Beneath Fixed Header ─────────────── */}
      <div className="ssh-viewport">

        {/* ── Floating HUD Header (Upper Overlay) ───────────────────────── */}
        <div className="ssh-hud-top">
          <div className="ssh-tag">
            <span className="ssh-tag-dot" />
            {currentStage.tag}
          </div>

          <div className="ssh-dots" aria-label="Transformation progress">
            {STAGES.map((s, i) => (
              <span
                key={s.id}
                className={`ssh-dot ${
                  i === activeStep ? 'ssh-dot--active' :
                  i < activeStep  ? 'ssh-dot--done' : ''
                }`}
                title={s.title}
              />
            ))}
          </div>
        </div>

        {/* ── Fullscreen Room Stage ─────────────────────────────────────── */}
        <div className="ssh-stage">
          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              ref={(el) => (plateRefs.current[i] = el)}
              className="ssh-plate"
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

          {/* ── Final Transformation Call-to-Action Overlay ────────────── */}
          <div ref={ctaRef} className="ssh-cta-overlay">
            <div className="ssh-cta-content">
              <Eyebrow className="text-sand">[ Brickleaf Interior Studio ]</Eyebrow>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream font-light leading-tight">
                Crafting Timeless Architectural Sanctuary
              </h1>
              <p className="text-cream/80 text-sm sm:text-base max-w-md leading-relaxed font-body">
                From empty architectural canvas to bespoke material curation. Brickleaf designs spaces that resonate with warmth and permanence.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-2">
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

        {/* ── Floating HUD Footer (Lower Overlay) ───────────────────────── */}
        <div className="ssh-hud-bottom">
          <div className="ssh-info">
            <span className="ssh-info-title">{currentStage.title}</span>
            <span className="ssh-info-desc">{currentStage.desc}</span>
          </div>

          <div ref={hintRef} className="ssh-hint">
            <span>Scroll to design the space</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  )
}
