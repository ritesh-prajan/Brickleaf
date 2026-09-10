import Eyebrow from '../ui/Eyebrow'
import BeforeAfterComparison from './BeforeAfterComparison'
import { HeadlineReveal, LineMaskRise, WordSpacingStretch } from '../ui/MotionText'

/**
 * BeforeAfterSection — Editorial Before/After Transformation Section.
 *
 * Implements "Type as terrain" character reveals and reversible scroll transitions.
 */
export default function BeforeAfterSection() {
  return (
    <section
      id="transformations"
      className="relative z-10 w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-12 bg-cream/95 text-ink border-t border-line/40"
      aria-label="Spatial Transformations"
    >
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-14">

        {/* ── Editorial Header with Symmetrical Type Motion ───────── */}
        <header className="space-y-4 max-w-2xl text-left">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <Eyebrow className="text-sand">01 / Transformations</Eyebrow>
          </div>

          {/* Type as terrain: Character Rotation & Symmetrical Exit */}
          <HeadlineReveal
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ink leading-tight tracking-tight"
          >
            From existing space to considered living.
          </HeadlineReveal>

          {/* Line mask blind lift */}
          <LineMaskRise className="text-ink-soft text-sm sm:text-base leading-relaxed max-w-xl font-body">
            Every transformation begins with revealing a space’s inherent geometry. We strip away dated ornamentation to introduce bespoke architectural millwork, layered ambient lighting, and organic material warmth.
          </LineMaskRise>
        </header>

        {/* ── Interactive Comparison Slider ──────────────────────── */}
        <div className="w-full space-y-4">
          <BeforeAfterComparison
            beforeImage="/transformations/living-room-before.jpg"
            afterImage="/transformations/living-room-after.jpg"
            beforeLabel="Existing Space"
            afterLabel="Brickleaf"
            initialPosition={50}
          />

          {/* ── Metadata & Caption Bar ─────────────────────────────── */}
          <footer className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs border-b border-line/30 pb-4 font-body">
            <div className="flex items-center gap-3">
              <span className="font-semibold tracking-wider text-ink uppercase">
                Project 01: Grand Living Pavilion
              </span>
              <span className="text-line">•</span>
              <span className="text-ink-soft">
                Residential / Living Room
              </span>
            </div>

            <div className="flex items-center gap-2 text-ink-soft text-[11px] tracking-wide">
              <span className="text-sand">Scope:</span>
              <span>Architectural Coving, Custom Media Joinery, Furnishing &amp; Finishes</span>
            </div>
          </footer>
        </div>

        {/* ── Word Spacing Pull Parallax Detail ─────────────────────── */}
        <div className="pt-4 text-center">
          <WordSpacingStretch className="font-display text-sm sm:text-base uppercase tracking-[0.2em] text-sand/80 font-light">
            Crafted to Endure • Light &amp; Flow • Your Private Sanctuary
          </WordSpacingStretch>
        </div>

      </div>
    </section>
  )
}
