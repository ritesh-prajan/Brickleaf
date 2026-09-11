import Eyebrow from '../components/ui/Eyebrow'
import SectionDivider from '../components/ui/SectionDivider'
import FaqAccordion from '../components/faq/FaqAccordion'
import { HeadlineReveal, LineMaskRise, WordSpacingStretch } from '../components/ui/MotionText'

export default function Faq() {
  return (
    <div className="w-full py-10 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-12">
      <header className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
        <Eyebrow className="text-sand">[ Studio Guidance ]</Eyebrow>
        <HeadlineReveal as="h1" className="font-display text-4xl sm:text-6xl md:text-7xl text-ink font-light leading-none">
          FAQ
        </HeadlineReveal>
        <WordSpacingStretch className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-sand font-mono pt-1">
          Process - Standards - Consultation
        </WordSpacingStretch>
        <LineMaskRise as="p" className="text-ink-soft text-xs sm:text-base leading-relaxed font-body">
          Key insights into our architectural methodology, engagement structures, procurement standards, and consultation options.
        </LineMaskRise>
        <SectionDivider className="w-16 sm:w-20 mx-auto border-sand" />
      </header>
      <FaqAccordion />
    </div>
  )
}