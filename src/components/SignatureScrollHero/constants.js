/**
 * SignatureScrollHero — Scene Configuration
 *
 * ──────────────────────────────────────────────────────────────────────────
 * POSITIONING SYSTEM
 *
 * All coordinates are normalized fractions of the scene container (0.0–1.0).
 * Scene container always matches the room image (aspect ratio 1024/682 ≈ 1.5:1).
 *
 * FINAL POSITIONS derived from visual analysis of 10-final-room.jpg blueprint:
 *   x: left edge of the object's bounding box / scene width
 *   y: top edge of the object's bounding box / scene height
 *   w: object width / scene width
 *
 * Each asset preserves its natural aspect ratio — no forced full-cover stretching.
 *
 * ASSET DIMENSIONS (all at 1024px wide):
 *   01-empty-room-dim.jpg  : 1024 × 682  (JPEG, no alpha) — THE STAGE
 *   02-wall-texture.jpg    : 1024 × 682  (JPEG, no alpha) — warm overlay
 *   03-rug.png             : 1024 × 682  (PNG, RGBA)
 *   04-sofa.png            : 1024 × 341  (PNG, RGBA)  ← narrow height
 *   05-table.png           : 1024 × 512  (PNG, RGBA)
 *   06-armchairs.png       : 1024 × 682  (PNG, RGBA)  ← both chairs together
 *   07-decor.png           : 1024 × 682  (PNG, RGBA)  ← olive tree + decor sprite
 *   08-pendant-unlit.png   : 1024 × 682  (PNG, RGBA)
 *   09-pendant-lit.png     : 1024 × 682  (PNG, RGBA)
 *   10-final-room.jpg      : 1024 × 682  (JPEG)        — BLUEPRINT ONLY, not displayed
 * ──────────────────────────────────────────────────────────────────────────
 */

// ── Scroll progress thresholds for each assembly stage ──────────────────
export const STAGES = {
  EMPTY_START:      0.00,
  EMPTY_END:        0.10,
  RUG_START:        0.10,
  RUG_END:          0.25,
  SOFA_START:       0.25,
  SOFA_END:         0.42,
  CHAIRS_START:     0.42,
  CHAIRS_END:       0.56,
  TABLE_START:      0.56,
  TABLE_END:        0.68,
  DECOR_START:      0.68,
  DECOR_END:        0.82,
  PENDANT_START:    0.82,
  PENDANT_END:      0.92,
  LIGHT_ON_START:   0.92,
  LIGHT_ON_END:     1.00,
}

// ── Asset paths ──────────────────────────────────────────────────────────
export const ASSETS = {
  emptyRoom:     '/hero/01-empty-room-dim.jpg',
  warmRoom:      '/hero/02-wall-texture.jpg',
  rug:           '/hero/03-rug.png',
  sofa:          '/hero/04-sofa.png',
  table:         '/hero/05-table.png',
  armchairs:     '/hero/06-armchairs.png',
  decor:         '/hero/07-decor.png',
  pendantUnlit:  '/hero/08-pendant-unlit.png',
  pendantLit:    '/hero/09-pendant-lit.png',
  // finalRoom intentionally NOT rendered — blueprint only
}

/**
 * OBJECT PLACEMENT
 *
 * Final positions measured from the final-room.jpg blueprint.
 * x, y: normalized position of object's center within the scene
 * w:    normalized width of object relative to scene width
 *
 * Room dimensions reference: 1024 × 682 px
 *
 * ─── How to read the final room blueprint ───
 *
 * The chandelier center is at roughly px 512, 170 → x=0.50, y=0.25
 * The sofa spans roughly px 185–840, top at ~285px → center x=0.50, y≈0.52 (centred y of sofa body)
 * The rug spans roughly px 185–850, top at ~400px
 * Left chair center: px ~195, 480 → x=0.19, y=0.70
 * Right chair center: px ~835, 480 → x=0.82, y=0.70
 * Table center: px ~510, 490 → x=0.50, y=0.72
 * Olive tree center: px ~100, 300 → x=0.10, y=0.44
 * Decor sprite: positioned to land on table area
 */

export const SCENE_OBJECTS = {
  // ── RUG ─────────────────────────────────────────────────────────────
  // The rug PNG (1024×682) contains the rug in perspective in the lower-center.
  // In the final room it occupies the entire central floor zone.
  // It's the same 1:1 canvas size as the room — it composites perfectly at 100% w.
  rug: {
    // Fills the scene at its natural size (same canvas = exact alignment)
    finalLeft:   '0%',
    finalTop:    '0%',
    finalWidth:  '100%',
    zIndex: 2,
    // Enters from below
    enterFromY:  '40%',
    enterOpacity: 0,
    // Shadow element
    shadow: {
      bottom: '33%', left: '18%', width: '64%', height: '3%',
    }
  },

  // ── SOFA ─────────────────────────────────────────────────────────────
  // PNG 1024×341 — sofa photographed on white background, transparent.
  // In final room: sofa sits at back wall center, top at ~42% scene height.
  // The PNG needs to be sized to match its apparent scale in the final room.
  // Sofa in final room spans ~60% scene width, centered.
  // Since image is 1024×341 (aspect 3:1), to get width=60%, height auto = 60% × (341/1024) = ~20%
  sofa: {
    finalLeft:   '20%',
    finalTop:    '40%',
    finalWidth:  '60%',
    zIndex: 3,
    enterFromY:  '30%',   // enters rising from below
    enterOpacity: 0,
    shadow: {
      bottom: '-1%', left: '5%', width: '90%', height: '3%',
    }
  },

  // ── ARMCHAIRS ────────────────────────────────────────────────────────
  // PNG 1024×682 — both chairs rendered together in one image.
  // Left chair occupies left ~40% of the PNG, right chair right ~40%.
  // In the final room: chairs sit at front corners, wide spread.
  // Map the PNG at ~75% width centered, shifted so chairs align correctly.
  armchairs: {
    finalLeft:   '-2%',
    finalTop:    '45%',
    finalWidth:  '75%',
    zIndex: 4,
    enterFromY:  '30%',   // rises from below
    enterOpacity: 0,
    shadow: {
      bottom: '-1%', left: '2%', width: '95%', height: '2.5%',
    }
  },

  // ── TABLE ────────────────────────────────────────────────────────────
  // PNG 1024×512 — travertine oval table on white.
  // In final room: table is centered, in front of sofa.
  // Table width in room ≈ 38% scene width; aspect 1024/512=2:1, so height ≈ 19%.
  table: {
    finalLeft:   '31%',
    finalTop:    '56%',
    finalWidth:  '38%',
    zIndex: 5,
    enterFromY:  '15%',   // rises from slightly below final
    enterOpacity: 0,
    shadow: {
      bottom: '-2%', left: '10%', width: '80%', height: '3%',
    }
  },

  // ── DECOR ────────────────────────────────────────────────────────────
  // PNG 1024×682 — sprite sheet: olive tree left, objects right.
  // The olive tree is at left ~30% of PNG. Table decor at center-right.
  // In the final room: olive tree at far left near window, decor on table.
  // We map at 90% width so the tree aligns with the window-left zone.
  decor: {
    finalLeft:   '-4%',
    finalTop:    '14%',
    finalWidth:  '72%',
    zIndex: 4,   // behind table, but olive tree in front of left wall
    enterFromX:  '-8%',   // drifts in from slightly left
    enterFromY:  '5%',
    enterOpacity: 0,
  },

  // ── PENDANT ──────────────────────────────────────────────────────────
  // PNGs 1024×682 — chandelier is at center of canvas, top-to-mid region.
  // Pendant mounting position in final room: center, top 25% of scene.
  // Since PNG canvas = same as scene (1024×682), we size at 100% width
  // so the pendant sits at exactly the right x position automatically.
  // Y entry: start above frame (negative translateY), descend to final.
  pendant: {
    finalLeft:   '0%',
    finalTop:    '0%',
    finalWidth:  '100%',
    zIndex: 6,
    enterFromY:  '-30%',   // descends from above frame
    enterOpacity: 0,
  },
}

// ── HUD step descriptors for the progress indicator ─────────────────────
export const HUD_STEPS = [
  { stage: STAGES.EMPTY_START,   tag: '01 / CANVAS',      title: 'Bare Architectural Shell',    desc: 'The room before intention.' },
  { stage: STAGES.RUG_START,     tag: '02 / FOUNDATION',  title: 'Hand-Woven Textile Rug',      desc: 'Grounding the floor with organic warmth.' },
  { stage: STAGES.SOFA_START,    tag: '03 / SEATING',     title: 'Bouclé Sectional Sofa',       desc: 'The anchor of the living composition.' },
  { stage: STAGES.CHAIRS_START,  tag: '04 / FORM',        title: 'Lounge Armchairs',            desc: 'Walnut-framed bouclé — front and flanking.' },
  { stage: STAGES.TABLE_START,   tag: '05 / SURFACE',     title: 'Travertine Coffee Table',     desc: 'Stone oval — mass, texture, presence.' },
  { stage: STAGES.DECOR_START,   tag: '06 / LIFE',        title: 'Botanicals & Artware',        desc: 'Olive tree. Sculpture. Vase. Dried stems.' },
  { stage: STAGES.PENDANT_START, tag: '07 / LIGHT',       title: 'Brass Chandelier Descends',   desc: 'Alabaster shades finding their ceiling mark.' },
  { stage: STAGES.LIGHT_ON_START,tag: '08 / ATMOSPHERE',  title: 'Light Activates',             desc: '2700K warmth fills the architectural space.' },
]
