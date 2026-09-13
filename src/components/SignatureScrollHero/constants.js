/**
 * SignatureScrollHero — Constants
 *
 * 8 complete full-room photorealistic transformation stages.
 * Sourced as high-efficiency WebP with responsive mobile and blur-up variants.
 * Zero dark gaps. Each image plate fades in over the previous and stays opaque.
 */

export const STAGES = [
  {
    id: 'empty-dark',
    src: '/hero/stage-1-empty-dark.webp',
    mobileSrc: '/hero/stage-1-empty-dark-mobile.webp',
    blurSrc: '/hero/stage-1-empty-dark-blur.webp',
    alt: 'Empty architectural shell in moody ambient light with Brickleaf wall emblem',
    tag: '01 / CANVAS',
    title: 'Raw Architectural Shell',
    desc: 'The room before intention — dim, quiet, waiting.',
  },
  {
    id: 'empty-bright',
    src: '/hero/stage-2-empty-bright.webp',
    mobileSrc: '/hero/stage-2-empty-bright-mobile.webp',
    blurSrc: '/hero/stage-2-empty-bright-blur.webp',
    alt: 'Empty room with warm natural daylight streaming through floor-to-ceiling windows',
    tag: '02 / LIGHT',
    title: 'Natural Light Emerges',
    desc: 'Warm sunlight enters through expansive glass, revealing plaster texture.',
  },
  {
    id: 'rug',
    src: '/hero/stage-3-rug.webp',
    mobileSrc: '/hero/stage-3-rug-mobile.webp',
    blurSrc: '/hero/stage-3-rug-blur.webp',
    alt: 'Room with a hand-woven organic jute area rug on the oak floor',
    tag: '03 / FOUNDATION',
    title: 'Woven Textile Rug',
    desc: 'Hand-woven organic jute rug grounds the oak floor with tactile warmth.',
  },
  {
    id: 'sofa',
    src: '/hero/stage-4-sofa.webp',
    mobileSrc: '/hero/stage-4-sofa-mobile.webp',
    blurSrc: '/hero/stage-4-sofa-blur.webp',
    alt: 'Room with rug and cream modular sectional sofa against the plaster wall',
    tag: '04 / ANCHOR',
    title: 'Modular Sectional Sofa',
    desc: 'Cream modular sectional takes its place against the plaster wall.',
  },
  {
    id: 'chairs-table',
    src: '/hero/stage-5-chairs-table.webp',
    mobileSrc: '/hero/stage-5-chairs-table-mobile.webp',
    blurSrc: '/hero/stage-5-chairs-table-blur.webp',
    alt: 'Room with sofa, two walnut lounge armchairs, and solid travertine coffee table',
    tag: '05 / FORM',
    title: 'Armchairs & Travertine Table',
    desc: 'Curved lounge armchairs and solid travertine table center the composition.',
  },
  {
    id: 'chandelier-off',
    src: '/hero/stage-6-chandelier-off.webp',
    mobileSrc: '/hero/stage-6-chandelier-off-mobile.webp',
    blurSrc: '/hero/stage-6-chandelier-off-blur.webp',
    alt: 'Room with sculptural multi-globe brass chandelier descending from recessed ceiling',
    tag: '06 / FIXTURE',
    title: 'Sculptural Brass Chandelier',
    desc: 'Organic multi-globe brass pendant anchors the ceiling architecture.',
  },
  {
    id: 'dusk-cove',
    src: '/hero/stage-7-dusk-cove.webp',
    mobileSrc: '/hero/stage-7-dusk-cove-mobile.webp',
    blurSrc: '/hero/stage-7-dusk-cove-blur.webp',
    alt: 'Room at twilight with 2700K warm indirect perimeter ceiling cove lighting',
    tag: '07 / TWILIGHT',
    title: 'Perimeter Cove Illumination',
    desc: '2700K warm architectural cove lighting bathes the ceiling perimeter in amber tones.',
  },
  {
    id: 'full-lighting',
    src: '/hero/stage-8-full-lighting.webp',
    mobileSrc: '/hero/stage-8-full-lighting-mobile.webp',
    blurSrc: '/hero/stage-8-full-lighting-blur.webp',
    alt: 'Final room — glowing chandelier, potted olive tree, ceramic pottery, and botanicals',
    tag: '08 / ATMOSPHERE',
    title: 'Full Radiance & Botanicals',
    desc: 'Lustrous chandelier activates alongside indoor olive botanicals and curated pottery.',
  },
]

/**
 * REVEAL TIMELINE (Normalized 0.0 -> 1.0)
 *
 * Each stage fades in gently and stays opaque.
 * Generous holds between reveals create an expansive, luxurious rhythm.
 */
export const REVEALS = [
  null,          // Stage 1: always visible (opacity 1)
  [0.06, 0.18],  // Stage 2: empty bright
  [0.22, 0.34],  // Stage 3: rug
  [0.38, 0.50],  // Stage 4: sofa
  [0.54, 0.64],  // Stage 5: chairs + table
  [0.68, 0.77],  // Stage 6: chandelier off
  [0.80, 0.89],  // Stage 7: dusk & cove glow
  [0.91, 0.98],  // Stage 8: full lighting & styling
]

/**
 * Full page scroll distance for the cinematic experience
 */
export const SCROLL_HEIGHT = '750vh'