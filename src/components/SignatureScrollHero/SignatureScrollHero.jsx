import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import EmptyRoom from './scene/EmptyRoom'
import WallLayer from './scene/WallLayer'
import RugLayer from './scene/RugLayer'
import FurnitureLayer from './scene/FurnitureLayer'
import DecorLayer from './scene/DecorLayer'
import LightingLayer from './scene/LightingLayer'

import { HERO_ASSETS, SCENE_STAGES, SEQUENCE_STEPS_HUD } from './constants'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import './SignatureScrollHero.css'

// Register ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SignatureScrollHero() {
  const navigate = useNavigate()

  // Master Container & Scene Refs
  const sectionRef = useRef(null)
  const stickyRef  = useRef(null)
  const stageRef   = useRef(null)

  // Layer Refs
  const emptyRoomRef     = useRef(null)
  const wallLayerRef     = useRef(null)
  const rugLayerRef      = useRef(null)
  const furnitureLayerRef= useRef(null)
  const sofaRef          = useRef(null)
  const tableRef         = useRef(null)
  const armchairsRef     = useRef(null)
  const decorLayerRef    = useRef(null)
  const lightingLayerRef = useRef(null)
  const unlitPendantRef  = useRef(null)
  const litPendantRef    = useRef(null)
  const warmGlowRef      = useRef(null)
  const finalRoomRef     = useRef(null)
  const ctaOverlayRef    = useRef(null)
  const scrollHintRef    = useRef(null)

  // State Management outside scroll loops
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // 1. Asset Preloading
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const imageUrls = Object.values(HERO_ASSETS)
    let loadedCount = 0

    imageUrls.forEach((url) => {
      const img = new Image()
      img.src = url
      img.onload = img.onerror = () => {
        loadedCount++
        if (loadedCount >= imageUrls.length) {
          setIsLoaded(true)
        }
      }
    })

    // Timeout fallback in case of slow network
    const timer = setTimeout(() => setIsLoaded(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // 2. GSAP ScrollTrigger Master Timeline Setup
  useEffect(() => {
    if (!isLoaded || isReducedMotion) return

    const sectionEl = sectionRef.current
    const stageEl   = stageRef.current
    if (!sectionEl || !stageEl) return

    // Context for easy GSAP cleanup
    const ctx = gsap.context(() => {
      // Master Scroll-Driven Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6, // Smooth progress interpolation
          onUpdate: (self) => {
            // Update HUD active step index outside React state loop
            const progress = self.progress
            const stepIdx = SEQUENCE_STEPS_HUD.findIndex(
              (step, idx) =>
                progress >= step.stage &&
                (idx === SEQUENCE_STEPS_HUD.length - 1 || progress < SEQUENCE_STEPS_HUD[idx + 1].stage)
            )
            if (stepIdx !== -1) {
              setCurrentStepIndex(stepIdx)
            }
          },
        },
      })

      // -------------------------------------------------------------------
      // TIMELINE STAGE SEQUENCE (0.00 -> 1.00)
      // -------------------------------------------------------------------

      // 1. Initial State Setups
      gsap.set(wallLayerRef.current,      { opacity: 0 })
      gsap.set(rugLayerRef.current,       { opacity: 0, scale: 0.92, transformOrigin: 'center bottom' })
      gsap.set(sofaRef.current,           { opacity: 0, y: 30 })
      gsap.set(tableRef.current,          { opacity: 0, y: 20 })
      gsap.set(armchairsRef.current,      { opacity: 0, y: 25 })
      gsap.set(decorLayerRef.current,     { opacity: 0, y: 15 })
      gsap.set(unlitPendantRef.current,   { opacity: 0, y: -20 })
      gsap.set(litPendantRef.current,     { opacity: 0 })
      gsap.set(warmGlowRef.current,       { opacity: 0 })
      gsap.set(finalRoomRef.current,      { opacity: 0 })
      gsap.set(ctaOverlayRef.current,     { opacity: 0, pointerEvents: 'none' })

      // Scroll hint fade out immediately on start
      tl.to(scrollHintRef.current, { opacity: 0, duration: 0.05 }, 0.02)

      // 2. WALL LAYER (0.00 -> 0.20) — Warm plaster wall texture appears
      tl.to(wallLayerRef.current, { opacity: 1, duration: 0.18, ease: 'power1.inOut' }, SCENE_STAGES.WALLS)

      // 3. RUG LAYER (0.18 -> 0.35) — Rug enters and unrolls
      tl.to(
        rugLayerRef.current,
        { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' },
        SCENE_STAGES.RUG
      )

      // 4. SOFA LAYER (0.32 -> 0.50) — Bouclé sofa appears and settles
      tl.to(
        sofaRef.current,
        { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' },
        SCENE_STAGES.SOFA
      )

      // 5. FURNITURE PIECES (0.45 -> 0.65) — Travertine table & armchairs appear
      tl.to(
        tableRef.current,
        { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
        SCENE_STAGES.FURNITURE
      ).to(
        armchairsRef.current,
        { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
        SCENE_STAGES.FURNITURE + 0.05
      )

      // 6. DECOR & BOTANICALS (0.60 -> 0.78) — Olive tree & table styling accessories appear
      tl.to(
        decorLayerRef.current,
        { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' },
        SCENE_STAGES.DECOR
      )

      // 7. LIGHTING FIXTURE & ILLUMINATION (0.75 -> 0.90)
      // Unlit pendant lowers -> Lit pendant glows -> Warm ambient lighting fills room
      tl.to(
        unlitPendantRef.current,
        { opacity: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        SCENE_STAGES.LIGHTING_UNLIT
      )
      .to(
        litPendantRef.current,
        { opacity: 1, duration: 0.10, ease: 'power1.in' },
        SCENE_STAGES.LIGHTING_ON
      )
      .to(
        warmGlowRef.current,
        { opacity: 1, duration: 0.12, ease: 'power1.out' },
        SCENE_STAGES.LIGHTING_ON + 0.02
      )

      // 8. CAMERA SETTLE & FINAL ROOM COMPOSITE (0.88 -> 1.00)
      // Extremely subtle camera settling scale (1.0 -> 1.025) & blend into final high-res shot
      tl.to(
        finalRoomRef.current,
        { opacity: 1, duration: 0.12, ease: 'power1.inOut' },
        SCENE_STAGES.CAMERA_SETTLE
      ).to(
        stageEl,
        { scale: 1.025, y: -4, duration: 0.15, ease: 'sine.out' },
        SCENE_STAGES.CAMERA_SETTLE
      )

      // 9. FINAL CTA OVERLAY (0.94 -> 1.00)
      tl.to(
        ctaOverlayRef.current,
        { opacity: 1, pointerEvents: 'auto', duration: 0.08, ease: 'power1.out' },
        0.94
      )

    }, sectionEl)

    return () => ctx.revert()
  }, [isLoaded, isReducedMotion])

  const activeStep = SEQUENCE_STEPS_HUD[currentStepIndex] || SEQUENCE_STEPS_HUD[0]

  return (
    <section ref={sectionRef} className="signature-scroll" aria-label="Interactive interior transformation hero">
      {/* ── Asset Preloader ──────────────────────────────────────────────── */}
      <div className={`hero-preloader ${isLoaded ? 'hero-preloader--hidden' : ''}`}>
        <div className="hero-preloader__spinner" />
        <p className="text-xs uppercase tracking-widest text-ink-soft">
          Loading Architectural Scene…
        </p>
      </div>

      {/* ── Sticky Viewport Container ───────────────────────────────────── */}
      <div ref={stickyRef} className="signature-scroll__sticky">

        {/* ── Top HUD Header ─────────────────────────────────────────────── */}
        <header className="hero-hud-header">
          <div className="hero-hud-header__tag">
            <span className="hero-hud-header__dot" />
            <Eyebrow className="text-sand">{activeStep.tag}</Eyebrow>
          </div>

          {/* Progress Step Indicators */}
          <div className="hero-hud-dots" aria-label="Scene progress">
            {SEQUENCE_STEPS_HUD.map((step, idx) => {
              const isActive = idx === currentStepIndex
              const isCompleted = idx < currentStepIndex
              return (
                <span
                  key={step.id}
                  className={`hero-hud-dots__item ${
                    isActive
                      ? 'hero-hud-dots__item--active'
                      : isCompleted
                      ? 'hero-hud-dots__item--completed'
                      : ''
                  }`}
                  title={step.title}
                />
              )
            })}
          </div>
        </header>

        {/* ── Master Room Scene ─────────────────────────────────────────── */}
        <div className="room-scene">
          <div ref={stageRef} className="room-scene__stage">

            {/* Layer 1: Dim Base Empty Room */}
            <EmptyRoom ref={emptyRoomRef} />

            {/* Layer 2: Warm Plaster Wall Texture */}
            <WallLayer ref={wallLayerRef} />

            {/* Layer 3: Woven Textured Rug */}
            <RugLayer ref={rugLayerRef} />

            {/* Layer 4: Bouclé Sofa, Travertine Table & Armchairs */}
            <FurnitureLayer
              ref={furnitureLayerRef}
              sofaRef={sofaRef}
              tableRef={tableRef}
              armchairsRef={armchairsRef}
            />

            {/* Layer 5: Botanicals & Decor */}
            <DecorLayer ref={decorLayerRef} />

            {/* Layer 6: Chandelier & Ambient Lighting Flare */}
            <LightingLayer
              ref={lightingLayerRef}
              unlitPendantRef={unlitPendantRef}
              litPendantRef={litPendantRef}
              warmGlowRef={warmGlowRef}
            />

            {/* Layer 7: Final Master Composite Room Photograph */}
            <div ref={finalRoomRef} className="scene-layer scene-layer--final">
              <img
                src={HERO_ASSETS.finalRoom}
                alt="Finished luxury interior architectural photography"
                className="scene-image"
                loading="eager"
              />
            </div>

          </div>

          {/* ── Final Transformation CTA Content Overlay ──────────────── */}
          <div
            ref={ctaOverlayRef}
            className={`hero-final-overlay ${isReducedMotion ? 'hero-final-overlay--visible' : ''}`}
          >
            <div className="hero-final-overlay__content space-y-6">
              <Eyebrow className="text-sand">[ Brickleaf Interior Studio ]</Eyebrow>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream font-light leading-tight">
                Crafting Timeless Architectural Sanctuary
              </h1>

              <p className="text-cream/80 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-body">
                From raw spatial blueprints to bespoke material curation, we design refined interiors that resonate with warmth and purpose.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Button variant="primary" onClick={() => navigate('/services')}>
                  Explore Services
                </Button>
                <Button
                  variant="outline"
                  className="border-cream/60 text-cream hover:bg-cream hover:text-ink"
                  onClick={() => navigate('/contact')}
                >
                  Start Project Brief
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom HUD Footer & Scroll Hint ───────────────────────────── */}
        <footer className="hero-hud-footer">
          <div className="hero-hud-footer__info">
            <span className="hero-hud-footer__title">{activeStep.title}</span>
            <span className="hero-hud-footer__desc">{activeStep.desc}</span>
          </div>

          {/* Scroll Hint (Fades out when scrolling begins) */}
          {!isReducedMotion && (
            <div ref={scrollHintRef} className="hero-scroll-hint">
              <span>Scroll to design the space</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </footer>

      </div>
    </section>
  )
}
