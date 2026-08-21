import { forwardRef } from 'react'
import { HERO_ASSETS } from '../constants'

/**
 * LightingLayer — Controls the unlit pendant, lit pendant, and warm radial ambient light overlay.
 * Exposes refs for targeted GSAP opacity/brightness timeline animations.
 */
const LightingLayer = forwardRef(function LightingLayer({ litPendantRef, unlitPendantRef, warmGlowRef, ...props }, ref) {
  return (
    <div ref={ref} className="scene-layer scene-layer--lighting" {...props}>
      {/* 1. Unlit Brass & Alabaster Chandelier */}
      <img
        ref={unlitPendantRef}
        src={HERO_ASSETS.pendantUnlit}
        alt="Unlit architectural brass and alabaster chandelier"
        className="scene-image scene-image--object scene-image--pendant"
        loading="eager"
        decoding="async"
      />

      {/* 2. Lit Glowing Brass & Alabaster Chandelier */}
      <img
        ref={litPendantRef}
        src={HERO_ASSETS.pendantLit}
        alt="Illuminated brass and alabaster chandelier glowing with warm light"
        className="scene-image scene-image--object scene-image--pendant scene-image--pendant-lit"
        loading="eager"
        decoding="async"
      />

      {/* 3. Physical Room Warm Ambient Lighting Radial Flare & Exposure Bloom */}
      <div ref={warmGlowRef} className="warm-light-overlay" />
    </div>
  )
})

export default LightingLayer
