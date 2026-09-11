import Eyebrow from '../components/ui/Eyebrow'
import SectionDivider from '../components/ui/SectionDivider'
import GalleryGrid from '../components/gallery/GalleryGrid'
import { HeadlineReveal, LineMaskRise, WordSpacingStretch } from '../components/ui/MotionText'

export default function Gallery() {
  return (
    <div className="w-full py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-10 sm:space-y-14 text-ink font-body">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <header className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
        <Eyebrow className="text-sand">[ Curated Portfolio ]</Eyebrow>

        {/* Type as terrain — headline rotates in character by character */}
        <HeadlineReveal
          as="h1"
          className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-light leading-none tracking-tight"
        >
          Gallery
        </HeadlineReveal>

        {/* Word spacing stretch — pulls apart on scroll */}
        <WordSpacingStretch className="text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-sand font-mono pt-1">
          Residential • Commercial • Renovation
        </WordSpacingStretch>

        {/* Line mask rise — blind lifts on description */}
        <LineMaskRise as="p" className="text-ink-soft text-xs sm:text-base leading-relaxed font-body">
          Explore our collection of bespoke residential estates, contemporary living pavilions, and executive creative studios.
        </LineMaskRise>

        <SectionDivider className="w-16 sm:w-20 mx-auto border-sand" />
      </header>

      {/* ── Filterable Project Catalog Grid ───────────────────────── */}
      <GalleryGrid />
    </div>
  )
}