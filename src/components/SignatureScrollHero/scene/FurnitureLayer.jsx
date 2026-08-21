import { forwardRef } from 'react'
import { HERO_ASSETS } from '../constants'

/**
 * FurnitureLayer — Holds the sofa, travertine coffee table, and armchairs.
 * Exposes individual element refs for GSAP timeline targeting.
 */
const FurnitureLayer = forwardRef(function FurnitureLayer({ sofaRef, tableRef, armchairsRef, ...props }, ref) {
  return (
    <div ref={ref} className="scene-layer scene-layer--furniture" {...props}>
      {/* 1. Bouclé Sectional Sofa */}
      <img
        ref={sofaRef}
        src={HERO_ASSETS.sofa}
        alt="Modular bouclé sectional sofa"
        className="scene-image scene-image--object scene-image--sofa"
        loading="eager"
        decoding="async"
      />

      {/* 2. Travertine Oval Coffee Table */}
      <img
        ref={tableRef}
        src={HERO_ASSETS.table}
        alt="Travertine stone oval coffee table"
        className="scene-image scene-image--object scene-image--table"
        loading="eager"
        decoding="async"
      />

      {/* 3. Walnut-framed Armchairs Pair */}
      <img
        ref={armchairsRef}
        src={HERO_ASSETS.armchairs}
        alt="Pair of rounded bouclé armchairs with walnut wood legs"
        className="scene-image scene-image--object scene-image--armchairs"
        loading="eager"
        decoding="async"
      />
    </div>
  )
})

export default FurnitureLayer
