import Eyebrow from '../components/ui/Eyebrow'
import SectionDivider from '../components/ui/SectionDivider'
import FaqAccordion from '../components/faq/FaqAccordion'
import { HeadlineReveal, LineMaskRise, WordSpacingStretch } from '../components/ui/MotionText'

export default function Faq() {
  return (
    <div className="w-full py-12 md:py-20 px-6 max-w-7xl mx-auto space-y-12">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <Eyebrow className="text-sand">[ Studio Guidance ]</Eyebrow>
        <HeadlineReveal as="h1" className="font-display text-5xl sm:text-6xl md:text-7xl text-ink font-light leading-none">
          FAQ
        </HeadlineReveal>
        <WordSpacingStretch className="text-xs uppercase tracking-[0.25em] text-sand font-mono pt-1">
          Process - Standards - Consultation
        </WordSpacingStretch>
        <LineMaskRise as="p" className="text-ink-soft text-sm sm:text-base leading-relaxed font-body">
          Key insights into our architectural methodology, engagement structures, procurement standards, and consultation options.
        </LineMaskRise>
        <SectionDivider className="w-20 mx-auto border-sand" />
      </header>
      <FaqAccordion />
    </div>
  )
}