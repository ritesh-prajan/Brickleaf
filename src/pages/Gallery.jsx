import Eyebrow from '../components/ui/Eyebrow'
import SectionDivider from '../components/ui/SectionDivider'
import GalleryGrid from '../components/gallery/GalleryGrid'
import { HeadlineReveal, LineMaskRise, WordSpacingStretch } from '../components/ui/MotionText'

export default function Gallery() {
  return (
    <div className="w-full py-12 md:py-20 px-6 max-w-7xl mx-auto space-y-12">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <Eyebrow className="text-sand">[ Curated Portfolio ]</Eyebrow>
        <HeadlineReveal as="h1" className="font-display text-5xl sm:text-6xl md:text-7xl text-ink font-light leading-none">
          Gallery
        </HeadlineReveal>
        <WordSpacingStretch className="text-xs uppercase tracking-[0.25em] text-sand font-mono pt-1">
          Residential - Commercial - Renovation
        </WordSpacingStretch>
        <LineMaskRise as="p" className="text-ink-soft text-sm sm:text-base leading-relaxed font-body">
          Explore our collection of bespoke residential estates, contemporary living pavilions, and executive creative studios.
        </LineMaskRise>
        <SectionDivider className="w-20 mx-auto border-sand" />
      </header>
      <GalleryGrid />
    </div>
  )
}