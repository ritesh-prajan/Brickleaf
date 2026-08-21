/**
 * SignatureScrollHero Scene Configuration & Constants
 *
 * Centralized timing stages, asset paths, and sequence descriptors.
 * Allows fine-tuning scroll triggers without touching animation logic.
 */

export const SCENE_STAGES = {
  EMPTY: 0.0,
  WALLS: 0.14,
  RUG: 0.28,
  SOFA: 0.42,
  FURNITURE: 0.56,
  DECOR: 0.70,
  LIGHTING_UNLIT: 0.80,
  LIGHTING_ON: 0.88,
  CAMERA_SETTLE: 0.95,
  FINAL: 1.0,
}

export const HERO_ASSETS = {
  emptyRoomDim: '/hero/01-empty-room-dim.jpg',
  wallTexture: '/hero/02-wall-texture.jpg',
  rug: '/hero/03-rug.png',
  sofa: '/hero/04-sofa.png',
  table: '/hero/05-table.png',
  armchairs: '/hero/06-armchairs.png',
  decor: '/hero/07-decor.png',
  pendantUnlit: '/hero/08-pendant-unlit.png',
  pendantLit: '/hero/09-pendant-lit.png',
  finalRoom: '/hero/10-final-room.jpg',
}

export const SEQUENCE_STEPS_HUD = [
  { id: 1, stage: 0.0,  tag: '01 / RAW CANVAS',   title: 'Bare Architectural Shell', desc: 'Cold monochrome structure before interior vision.' },
  { id: 2, stage: 0.14, tag: '02 / SURFACES',     title: 'Warm Plaster & Wall Finish', desc: 'Tactile limestone plaster and rich warm wall tones.' },
  { id: 3, stage: 0.28, tag: '03 / FOUNDATION',   title: 'Hand-Woven Textile Rug',   desc: 'Grounding the spatial geometry with organic weave.' },
  { id: 4, stage: 0.42, tag: '04 / SEATING',       title: 'Bouclé Sectional Sofa',     desc: 'Sculptural curved seating forming the focal hub.' },
  { id: 5, stage: 0.56, tag: '05 / FURNISHINGS',   title: 'Travertine & Armchairs',   desc: 'Natural stone table & walnut-framed armchairs.' },
  { id: 6, stage: 0.70, tag: '06 / STYLING',       title: 'Botanicals & Artware',     desc: 'Olive tree, stone sculpture, and ceramic decor.' },
  { id: 7, stage: 0.88, tag: '07 / ATMOSPHERE',    title: 'Warm Architectural Light', desc: 'Illuminating textures and casting ambient warmth.' },
]
