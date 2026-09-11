import Eyebrow from '../ui/Eyebrow'
import BeforeAfterComparison from './BeforeAfterComparison'
import { HeadlineReveal, LineMaskRise } from '../ui/MotionText'

/**
 * BeforeAfterSection — Editorial Before/After Transformation Section.
 *
 * Seamlessly responsive on all screen sizes (mobile to widescreen).
 */
export default function BeforeAfterSection() {
  return (
    <section
      id="transformations"
      className="relative z-10 w-full py-14 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 text-ink border-t border-line/40 overflow-hidden"
      aria-label="Spatial Transformations"
    >
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">

        {/* ── Editorial Header with Symmetrical Type Motion ───────── */}
        <header className="space-y-3 sm:space-y-4 max-w-2xl text-left">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <Eyebrow className="text-sand">01 / Transformations</Eyebrow>
          </div>

          {/* Type as terrain: Character Rotation & Symmetrical Exit */}
          <HeadlineReveal
            as="h2"
            className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-ink leading-tight tracking-tight"
          >
            From existing space to considered living.
          </HeadlineReveal>

          {/* Line mask blind lift */}
          <LineMaskRise className="text-ink-soft text-xs sm:text-base leading-relaxed max-w-xl font-body">
            Every transformation begins with revealing a space’s inherent geometry. We strip away dated ornamentation to introduce bespoke architectural millwork, layered ambient lighting, and organic material warmth.
          </LineMaskRise>
        </header>

        {/* ── Interactive Comparison Slider ──────────────────────── */}
        <BeforeAfterComparison
          beforeImage="/transformations/living-room-before.jpg"
          afterImage="/transformations/living-room-after.jpg"
          beforeLabel="Original State"
          afterLabel="Brickleaf Completed Living Room"
          aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
          initialPosition={50}
        />

      </div>
    </section>
  )
}