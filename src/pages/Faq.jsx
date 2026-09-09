import Eyebrow from '../components/ui/Eyebrow'
import SectionDivider from '../components/ui/SectionDivider'
import FaqAccordion from '../components/faq/FaqAccordion'

export default function Faq() {
  return (
    <div className="w-full py-12 md:py-20 px-6 max-w-7xl mx-auto space-y-12">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <Eyebrow className="text-sand">[ Studio Guidance ]</Eyebrow>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink font-light leading-none">
          Frequently Asked Questions
        </h1>
        <p className="text-ink-soft text-sm sm:text-base leading-relaxed font-body">
          Key insights into our architectural methodology, engagement structures, procurement standards, and consultation options.
        </p>
        <SectionDivider className="w-20 mx-auto border-sand" />
      </header>

      {/* ── Accordion List Component ───────────────────────────────── */}
      <FaqAccordion />
    </div>
  )
}
