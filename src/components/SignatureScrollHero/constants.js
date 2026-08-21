/**
 * SignatureScrollHero — Constants
 *
 * 8 complete full-room photographs crossfading via scroll.
 * Each image is the ENTIRE room at that stage of furnishing.
 * No transparent PNGs. No positioned furniture. Just photographic dissolves.
 */

// ── Stage images (complete full-frame room shots) ──────────────────────
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
    alt: 'Room with a hand-woven jute area rug placed on the oak floor',
    tag: '03 / FOUNDATION',
    title: 'Woven Textile Rug',
    desc: 'Grounding the floor with organic textile warmth.',
  },
  {
    id: 'sofa',
    src: '/hero/stage-4-sofa.jpg',
    alt: 'Room with rug and a bouclé modular sofa against the back wall',
    tag: '04 / ANCHOR',
    title: 'Bouclé Sectional Sofa',
    desc: 'The living composition finds its center.',
  },
  {
    id: 'chairs-table',
    src: '/hero/stage-5-chairs-table.jpg',
    alt: 'Room with rug, sofa, two lounge armchairs and a travertine coffee table',
    tag: '05 / FORM',
    title: 'Armchairs & Table',
    desc: 'Walnut frames. Travertine stone. The room takes shape.',
  },
  {
    id: 'decor',
    src: '/hero/stage-6-decor.jpg',
    alt: 'Fully decorated room with olive tree, pottery and books on the coffee table',
    tag: '06 / LIFE',
    title: 'Botanicals & Artware',
    desc: 'Olive tree. Ceramic vases. Dried stems. Books.',
  },
  {
    id: 'pendant-off',
    src: '/hero/stage-7-pendant-off.jpg',
    alt: 'Complete room with brass pendant chandelier, light turned off',
    tag: '07 / FIXTURE',
    title: 'Pendant Descends',
    desc: 'Brass and glass chandelier finds its ceiling mark.',
  },
  {
    id: 'pendant-on',
    src: '/hero/stage-8-pendant-on.jpg',
    alt: 'Final room — pendant chandelier glowing warm, entire space bathed in golden light',
    tag: '08 / ATMOSPHERE',
    title: 'Light Activates',
    desc: '2700K warmth fills the architectural space.',
  },
]

// ── Crossfade timeline (normalized 0.0 – 1.0) ─────────────────────────
// Each stage has a range during which it is the PRIMARY visible image.
// Transitions overlap slightly for smooth dissolves.
export const TIMELINE = {
  // Stage becomes visible → Stage fully shown → Stage begins to fade
  stages: [
    { fadeIn: 0.00, hold: 0.04, fadeOut: 0.12 },  // 1: empty dark
    { fadeIn: 0.08, hold: 0.14, fadeOut: 0.24 },  // 2: empty bright
    { fadeIn: 0.20, hold: 0.28, fadeOut: 0.38 },  // 3: rug
    { fadeIn: 0.34, hold: 0.40, fadeOut: 0.52 },  // 4: sofa
    { fadeIn: 0.48, hold: 0.55, fadeOut: 0.67 },  // 5: chairs + table
    { fadeIn: 0.63, hold: 0.69, fadeOut: 0.80 },  // 6: decor
    { fadeIn: 0.76, hold: 0.82, fadeOut: 0.93 },  // 7: pendant off
    { fadeIn: 0.88, hold: 0.94, fadeOut: 1.00 },  // 8: pendant on (stays)
  ],
}
