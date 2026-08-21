/**
 * SignatureScrollHero — Constants
 *
 * 8 complete full-room photographs.
 * The entire homepage IS this scroll transformation.
 * Zero dark gaps. Each image plate fades in over the previous and stays opaque.
 */

export const STAGES = [
  {
    id: 'empty-dark',
    src: '/hero/stage-1-empty-dark.jpg',
    alt: 'Empty architectural room in dim, moody light',
    tag: '01 / CANVAS',
    title: 'Raw Architectural Shell',
    desc: 'The room before intention — dim, cold, waiting.',
  },
  {
    id: 'empty-bright',
    src: '/hero/stage-2-empty-bright.jpg',
    alt: 'Empty room with warm natural daylight revealing plaster walls',
    tag: '02 / LIGHT',
    title: 'Natural Light Reveals',
    desc: 'Warm daylight enters. Plaster textures emerge.',
  },
  {
    id: 'rug',
    src: '/hero/stage-3-rug.jpg',
    alt: 'Room with a hand-woven jute area rug on the oak floor',
    tag: '03 / FOUNDATION',
    title: 'Woven Textile Rug',
    desc: 'Grounding the floor with organic textile warmth.',
  },
  {
    id: 'sofa',
    src: '/hero/stage-4-sofa.jpg',
    alt: 'Room with rug and bouclé modular sofa against the back wall',
    tag: '04 / ANCHOR',
    title: 'Bouclé Sectional Sofa',
    desc: 'The living composition finds its center.',
  },
  {
    id: 'chairs-table',
    src: '/hero/stage-5-chairs-table.jpg',
    alt: 'Room with sofa, two lounge armchairs and travertine coffee table',
    tag: '05 / FORM',
    title: 'Armchairs & Table',
    desc: 'Walnut frames. Travertine stone. The room takes shape.',
  },
  {
    id: 'decor',
    src: '/hero/stage-6-decor.jpg',
    alt: 'Decorated room with olive tree, books, pottery on the coffee table',
    tag: '06 / LIFE',
    title: 'Botanicals & Artware',
    desc: 'Olive tree. Ceramic vases. Dried stems. Books.',
  },
  {
    id: 'pendant-off',
    src: '/hero/stage-7-pendant-off.jpg',
    alt: 'Complete room with brass pendant chandelier, light off',
    tag: '07 / FIXTURE',
    title: 'Pendant Descends',
    desc: 'Brass and glass chandelier finds its ceiling mark.',
  },
  {
    id: 'pendant-on',
    src: '/hero/stage-8-pendant-on.jpg',
    alt: 'Final room — pendant glowing warm, entire space bathed in golden light',
    tag: '08 / ATMOSPHERE',
    title: 'Light Activates',
    desc: '2700K warmth fills the architectural space.',
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
  [0.24, 0.36],  // Stage 3: rug
  [0.40, 0.52],  // Stage 4: sofa
  [0.56, 0.66],  // Stage 5: chairs + table
  [0.70, 0.80],  // Stage 6: decor + plant
  [0.83, 0.90],  // Stage 7: pendant off
  [0.92, 1.00],  // Stage 8: pendant on (warm final payoff)
]

/**
 * Full page scroll distance for the cinematic experience
 */
export const SCROLL_HEIGHT = '750vh'
