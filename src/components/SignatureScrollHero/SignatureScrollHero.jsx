import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ASSETS, STAGES, SCENE_OBJECTS, HUD_STEPS } from './constants'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import './SignatureScrollHero.css'

// Register GSAP plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Helper: Preload all image assets ──────────────────────────────────────
function preloadAssets(urls) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = resolve // don't block on missing assets
        })
    )
  )
}

// ── Main Component ────────────────────────────────────────────────────────
export default function SignatureScrollHero() {
  const navigate = useNavigate()

  // ── Container refs ────────────────────────────────────────────────────
  const sectionRef    = useRef(null)
  const sceneRef      = useRef(null)

  // ── Object refs — each transparent PNG gets its own ───────────────────
  const rugRef        = useRef(null)
  const rugShadowRef  = useRef(null)
  const sofaRef       = useRef(null)
  const sofaShadowRef = useRef(null)
  const chairsRef     = useRef(null)
  const chairsShadRef = useRef(null)
  const tableRef      = useRef(null)
  const tableShadRef  = useRef(null)
  const decorRef      = useRef(null)
  const pendantRef    = useRef(null)
  const pendantLitRef = useRef(null)
  const warmOverRef   = useRef(null)
  const lightBloomRef = useRef(null)
  const ctaRef        = useRef(null)
  const hintRef       = useRef(null)

  // ── State (minimal — never updated per scroll frame) ──────────────────
  const [isLoaded, setIsLoaded]         = useState(false)
  const [activeStep, setActiveStep]     = useState(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // ── Asset Preloading ──────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mq.matches)

    const allUrls = Object.values(ASSETS)
    const fallback = setTimeout(() => setIsLoaded(true), 3500)

    preloadAssets(allUrls).then(() => {
      clearTimeout(fallback)
      setIsLoaded(true)
    })

    return () => clearTimeout(fallback)
  }, [])

  // ── GSAP ScrollTrigger Master Timeline ───────────────────────────────
  useEffect(() => {
    if (!isLoaded) return

    const section = sectionRef.current
    const scene   = sceneRef.current
    if (!section || !scene) return

    // If reduced motion: snap everything to final state immediately
    if (isReducedMotion) {
      gsap.set([
        rugRef.current, sofaRef.current, chairsRef.current,
        tableRef.current, decorRef.current,
        pendantRef.current, pendantLitRef.current,
        rugShadowRef.current, sofaShadowRef.current,
        chairsShadRef.current, tableShadRef.current,
        warmOverRef.current, lightBloomRef.current,
      ], { opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1 })
      gsap.set(ctaRef.current,  { opacity: 1, pointerEvents: 'auto' })
      gsap.set(hintRef.current, { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {

      // ── INITIAL STATES: place objects at their OFF-SCREEN entry positions
      // IMPORTANT: opacity starts at 0 for immediate entry objects, small > 0
      // so they become real before they enter the visible frame.

      // RUG — starts below scene, clips up
      gsap.set(rugRef.current,       { y: '42%', opacity: 0, scale: 0.96, transformOrigin: 'center bottom' })
      gsap.set(rugShadowRef.current, { opacity: 0, scaleY: 0.2 })

      // SOFA — starts below, rises
      gsap.set(sofaRef.current,       { y: '35%', opacity: 0 })
      gsap.set(sofaShadowRef.current, { opacity: 0, scaleY: 0.2 })

      // ARMCHAIRS — starts below, slightly pushed down
      gsap.set(chairsRef.current,     { y: '30%', opacity: 0 })
      gsap.set(chairsShadRef.current, { opacity: 0, scaleY: 0.2 })

      // COFFEE TABLE — starts just below its final position
      gsap.set(tableRef.current,      { y: '18%', opacity: 0 })
      gsap.set(tableShadRef.current,  { opacity: 0, scaleY: 0.2 })

      // DECOR — starts from slight left and slightly above
      gsap.set(decorRef.current,      { x: '-6%', y: '5%', opacity: 0 })

      // PENDANT — starts above frame, descends
      gsap.set(pendantRef.current,    { y: '-32%', opacity: 0 })
      gsap.set(pendantLitRef.current, { y: '-32%', opacity: 0 })

      // OVERLAYS — fully transparent
      gsap.set(warmOverRef.current,   { opacity: 0 })
      gsap.set(lightBloomRef.current, { opacity: 0 })
      gsap.set(ctaRef.current,        { opacity: 0, pointerEvents: 'none' })

      // ── MASTER TIMELINE (controlled entirely by scroll position) ──────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end:   'bottom bottom',
          scrub: 0.8,   // slight lag for cinematic feel; set to true for 1:1
          pin:   false, // sticky is done via CSS position:sticky on .ssh__sticky
          onUpdate(self) {
            // Update HUD step — only setState when step changes (not every frame)
            const p = self.progress
            let newStep = 0
            for (let i = HUD_STEPS.length - 1; i >= 0; i--) {
              if (p >= HUD_STEPS[i].stage) { newStep = i; break }
            }
            setActiveStep(prev => prev !== newStep ? newStep : prev)
          },
        },
      })

      // ── TIMELINE DEFINITION ──────────────────────────────────────────
      //    Each stage is expressed as a fraction (0.0–1.0) of total timeline.
      //    We convert to label positions using addLabel().

      // 0.00 – 0.10: Room reveal (already visible as base)
      //   → Hint text fades
      tl.to(hintRef.current,
        { opacity: 0, duration: STAGES.EMPTY_END - STAGES.EMPTY_START },
        STAGES.EMPTY_START
      )

      // 0.10 – 0.25: RUG slides up and lands ────────────────────────────
      tl.to(rugRef.current,
        {
          y: '0%',
          opacity: 1,
          scale: 1,
          duration: STAGES.RUG_END - STAGES.RUG_START,
          ease: 'power2.out',
        },
        STAGES.RUG_START
      )
      // Shadow strengthens as rug lands
      tl.to(rugShadowRef.current,
        { opacity: 1, scaleY: 1, duration: (STAGES.RUG_END - STAGES.RUG_START) * 0.7, ease: 'power1.out' },
        STAGES.RUG_START + (STAGES.RUG_END - STAGES.RUG_START) * 0.4
      )

      // 0.25 – 0.42: SOFA enters from below ────────────────────────────
      tl.to(sofaRef.current,
        {
          y: '0%',
          opacity: 1,
          duration: STAGES.SOFA_END - STAGES.SOFA_START,
          ease: 'power3.out',
        },
        STAGES.SOFA_START
      )
      tl.to(sofaShadowRef.current,
        { opacity: 1, scaleY: 1, duration: (STAGES.SOFA_END - STAGES.SOFA_START) * 0.6, ease: 'power1.out' },
        STAGES.SOFA_START + (STAGES.SOFA_END - STAGES.SOFA_START) * 0.5
      )

      // 0.42 – 0.56: ARMCHAIRS rise from below ─────────────────────────
      tl.to(chairsRef.current,
        {
          y: '0%',
          opacity: 1,
          duration: STAGES.CHAIRS_END - STAGES.CHAIRS_START,
          ease: 'power2.out',
        },
        STAGES.CHAIRS_START
      )
      tl.to(chairsShadRef.current,
        { opacity: 1, scaleY: 1, duration: (STAGES.CHAIRS_END - STAGES.CHAIRS_START) * 0.6, ease: 'power1.out' },
        STAGES.CHAIRS_START + (STAGES.CHAIRS_END - STAGES.CHAIRS_START) * 0.5
      )

      // 0.56 – 0.68: COFFEE TABLE ascends ──────────────────────────────
      tl.to(tableRef.current,
        {
          y: '0%',
          opacity: 1,
          duration: STAGES.TABLE_END - STAGES.TABLE_START,
          ease: 'power2.out',
        },
        STAGES.TABLE_START
      )
      tl.to(tableShadRef.current,
        { opacity: 1, scaleY: 1, duration: (STAGES.TABLE_END - STAGES.TABLE_START) * 0.6, ease: 'power1.out' },
        STAGES.TABLE_START + (STAGES.TABLE_END - STAGES.TABLE_START) * 0.5
      )

      // 0.68 – 0.82: DECOR slides in (olive tree from left + settle) ───
      tl.to(decorRef.current,
        {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: STAGES.DECOR_END - STAGES.DECOR_START,
          ease: 'power2.out',
        },
        STAGES.DECOR_START
      )

      // 0.82 – 0.92: PENDANT descends from ceiling ──────────────────────
      // Unlit pendant comes down first
      tl.to(pendantRef.current,
        {
          y: '0%',
          opacity: 1,
          duration: (STAGES.PENDANT_END - STAGES.PENDANT_START) * 0.85,
          ease: 'power3.out',
        },
        STAGES.PENDANT_START
      )

      // 0.92 – 1.00: LIGHTS ON + warm atmosphere ────────────────────────
      // Swap to lit pendant image
      tl.to(pendantLitRef.current,
        {
          y: '0%',
          opacity: 1,
          duration: (STAGES.LIGHT_ON_END - STAGES.LIGHT_ON_START) * 0.4,
          ease: 'power1.in',
        },
        STAGES.LIGHT_ON_START
      )
      // Fade out unlit pendant simultaneously
      tl.to(pendantRef.current,
        {
          opacity: 0,
          duration: (STAGES.LIGHT_ON_END - STAGES.LIGHT_ON_START) * 0.3,
          ease: 'power1.in',
        },
        STAGES.LIGHT_ON_START
      )
      // Warm atmosphere overlay (room image blended multiply)
      tl.to(warmOverRef.current,
        {
          opacity: 0.85,
          duration: (STAGES.LIGHT_ON_END - STAGES.LIGHT_ON_START) * 0.7,
          ease: 'power1.out',
        },
        STAGES.LIGHT_ON_START + 0.04
      )
      // Localized light bloom
      tl.to(lightBloomRef.current,
        {
          opacity: 1,
          duration: (STAGES.LIGHT_ON_END - STAGES.LIGHT_ON_START) * 0.6,
          ease: 'power2.out',
        },
        STAGES.LIGHT_ON_START + 0.05
      )
      // CTA overlay appears at the very end
      tl.to(ctaRef.current,
        {
          opacity: 1,
          pointerEvents: 'auto',
          duration: (STAGES.LIGHT_ON_END - STAGES.LIGHT_ON_START) * 0.35,
          ease: 'power1.out',
        },
        STAGES.LIGHT_ON_START + 0.07
      )

    }, section)

    return () => ctx.revert()
  }, [isLoaded, isReducedMotion])

  // ── Derived HUD state ─────────────────────────────────────────────────
  const currentStep = HUD_STEPS[activeStep] || HUD_STEPS[0]
  const O = SCENE_OBJECTS  // shorthand

  return (
    <>
      {/* ── Preloader ─────────────────────────────────────────────────── */}
      <div className={`ssh__preloader ${isLoaded ? 'ssh__preloader--hidden' : ''}`}>
        <div className="ssh__preloader-ring" />
        <span className="ssh__preloader-text">Preparing the Space…</span>
      </div>

      {/* ── Main scroll section ───────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="ssh"
        aria-label="Scroll-driven interior room assembly hero"
      >
        <div className="ssh__sticky">

          {/* ── HUD Header ────────────────────────────────────────────── */}
          <header className="ssh__hud-header">
            <div className="ssh__hud-tag">
              <span className="ssh__hud-tag-dot" />
              {currentStep.tag}
            </div>
            <div className="ssh__hud-dots" aria-label="Assembly stage progress">
              {HUD_STEPS.map((step, idx) => (
                <span
                  key={step.tag}
                  className={`ssh__hud-dot ${
                    idx === activeStep ? 'ssh__hud-dot--active' :
                    idx < activeStep  ? 'ssh__hud-dot--completed' : ''
                  }`}
                  title={step.title}
                />
              ))}
            </div>
          </header>

          {/* ── Scene Frame ───────────────────────────────────────────── */}
          <div ref={sceneRef} className="ssh__scene">

            {/* === LAYER 1: ROOM BASE — the permanent fixed stage ========= */}
            <div className="ssh__room-base">
              <img
                src={ASSETS.emptyRoom}
                alt="Empty architectural living room — bare stage before furnishing"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>

            {/* Warm room overlay (blends in during lighting phase) */}
            <div ref={warmOverRef} className="ssh__warm-overlay ssh__obj">
              <img
                src={ASSETS.warmRoom}
                alt=""
                aria-hidden="true"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* === LAYER 2: RUG — slides up from bottom =================== */}
            {/* Shadow beneath rug */}
            <div
              ref={rugShadowRef}
              className="ssh__shadow"
              style={{
                bottom: '33%',
                left: '18%',
                width: '64%',
                height: '2%',
                transformOrigin: 'center center',
              }}
            />
            <div
              ref={rugRef}
              className="ssh__obj ssh__obj--rug"
              style={{
                left: O.rug.finalLeft,
                top:  O.rug.finalTop,
                width: O.rug.finalWidth,
              }}
            >
              <img
                src={ASSETS.rug}
                alt="Textured neutral area rug placed on the oak floor"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* === LAYER 3: SOFA — rises from below ======================= */}
            <div
              ref={sofaShadowRef}
              className="ssh__shadow"
              style={{
                bottom: '38%',
                left: '22%',
                width: '56%',
                height: '1.5%',
                transformOrigin: 'center center',
              }}
            />
            <div
              ref={sofaRef}
              className="ssh__obj ssh__obj--sofa"
              style={{
                left:  O.sofa.finalLeft,
                top:   O.sofa.finalTop,
                width: O.sofa.finalWidth,
              }}
            >
              <img
                src={ASSETS.sofa}
                alt="Modular bouclé sectional sofa against the back wall"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* === LAYER 4: ARMCHAIRS — rise from below =================== */}
            <div
              ref={chairsShadRef}
              className="ssh__shadow"
              style={{
                bottom: '28%',
                left: '1%',
                width: '55%',
                height: '1.5%',
                transformOrigin: 'center center',
              }}
            />
            <div
              ref={chairsRef}
              className="ssh__obj ssh__obj--armchairs"
              style={{
                left:  O.armchairs.finalLeft,
                top:   O.armchairs.finalTop,
                width: O.armchairs.finalWidth,
              }}
            >
              <img
                src={ASSETS.armchairs}
                alt="Pair of rounded bouclé armchairs with walnut wood frames"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* === LAYER 5: COFFEE TABLE — ascends into position ========== */}
            <div
              ref={tableShadRef}
              className="ssh__shadow"
              style={{
                bottom: '24%',
                left: '33%',
                width: '34%',
                height: '1.5%',
                transformOrigin: 'center center',
              }}
            />
            <div
              ref={tableRef}
              className="ssh__obj ssh__obj--table"
              style={{
                left:  O.table.finalLeft,
                top:   O.table.finalTop,
                width: O.table.finalWidth,
              }}
            >
              <img
                src={ASSETS.table}
                alt="Travertine stone oval coffee table"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* === LAYER 6: DECOR — olive tree + table objects ============ */}
            <div
              ref={decorRef}
              className="ssh__obj ssh__obj--decor"
              style={{
                left:  O.decor.finalLeft,
                top:   O.decor.finalTop,
                width: O.decor.finalWidth,
              }}
            >
              <img
                src={ASSETS.decor}
                alt="Potted olive tree beside window, stone sculpture, ceramic vases and dried botanicals on coffee table"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* === LAYER 7: PENDANT UNLIT — descends from above =========== */}
            <div
              ref={pendantRef}
              className="ssh__obj ssh__obj--pendant"
              style={{
                left:  O.pendant.finalLeft,
                top:   O.pendant.finalTop,
                width: O.pendant.finalWidth,
              }}
            >
              <img
                src={ASSETS.pendantUnlit}
                alt="Brass and alabaster chandelier descending to mounting position"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* === LAYER 7b: PENDANT LIT — swapped in when light turns on = */}
            <div
              ref={pendantLitRef}
              className="ssh__obj ssh__obj--light-lit"
              style={{
                left:  O.pendant.finalLeft,
                top:   O.pendant.finalTop,
                width: O.pendant.finalWidth,
              }}
            >
              <img
                src={ASSETS.pendantLit}
                alt="Illuminated brass and alabaster chandelier radiating warm light"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* === LAYER 8: AMBIENT LIGHT BLOOM ============================ */}
            <div ref={lightBloomRef} className="ssh__light-bloom" aria-hidden="true" />

            {/* === LAYER 9: FINAL CTA OVERLAY ============================== */}
            <div ref={ctaRef} className="ssh__cta">
              <div className="ssh__cta-content">
                <Eyebrow className="text-sand">[ Brickleaf Interior Studio ]</Eyebrow>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-cream font-light leading-tight">
                  Crafting Timeless Architectural Sanctuary
                </h1>
                <p className="text-cream/75 text-sm sm:text-base max-w-md leading-relaxed font-body">
                  From empty canvas to curated spatial poetry. Brickleaf designs spaces that are warm, considered, and built to endure.
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

          </div>{/* end .ssh__scene */}

          {/* ── HUD Footer ────────────────────────────────────────────── */}
          <footer className="ssh__hud-footer">
            <div className="ssh__hud-info">
              <span className="ssh__hud-title">{currentStep.title}</span>
              <span className="ssh__hud-desc">{currentStep.desc}</span>
            </div>

            {/* Scroll hint — fades immediately when user starts scrolling */}
            <div ref={hintRef} className="ssh__scroll-hint">
              <span>Scroll to design the space</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </footer>

        </div>{/* end .ssh__sticky */}
      </section>
    </>
  )
}
