import SignatureScrollHero from '../components/SignatureScrollHero/SignatureScrollHero'
import Button from '../components/ui/Button'
import Eyebrow from '../components/ui/Eyebrow'
import SectionDivider from '../components/ui/SectionDivider'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      {/* ── FLAGSHIP SCROLL-DRIVEN PHOTOREALISTIC INTERIOR TRANSFORMATION ── */}
      <SignatureScrollHero />

      {/* ── BRAND PILLARS STRIP ───────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 border-t border-line/40 bg-cream/80 relative z-20">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-4 max-w-2xl mx-auto">
            <Eyebrow className="text-sand">[ Architectural Philosophy ]</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl text-ink font-light leading-snug">
              Every Space Tells a Story of Form &amp; Light
            </h2>
            <p className="text-ink-soft text-sm md:text-base leading-relaxed">
              Brickleaf transforms residential and commercial spaces through bespoke architectural interior design, organic materiality, and meticulous spatial planning.
            </p>
          </div>

          <SectionDivider className="w-24 mx-auto border-sand" />

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="border border-line/60 p-6 space-y-3 bg-cream/40 backdrop-blur-sm">
              <span className="font-display text-2xl text-sand">01</span>
              <h3 className="font-display text-lg text-ink font-medium">New Builds</h3>
              <p className="text-ink-soft text-xs leading-relaxed">
                Comprehensive interior architectural design from ground-up blueprinting to final styling handover.
              </p>
            </div>

            <div className="border border-line/60 p-6 space-y-3 bg-cream/40 backdrop-blur-sm">
              <span className="font-display text-2xl text-sand">02</span>
              <h3 className="font-display text-lg text-ink font-medium">Renovations</h3>
              <p className="text-ink-soft text-xs leading-relaxed">
                Reimagining existing structural layouts with contemporary elegance, custom cabinetry, and warmth.
              </p>
            </div>

            <div className="border border-line/60 p-6 space-y-3 bg-cream/40 backdrop-blur-sm">
              <span className="font-display text-2xl text-sand">03</span>
              <h3 className="font-display text-lg text-ink font-medium">Spatial Curation</h3>
              <p className="text-ink-soft text-xs leading-relaxed">
                Hand-selected artisanal furniture, custom millwork, lighting design, and tactile textile palettes.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Button variant="primary" onClick={() => navigate('/services')}>
              View Detailed Services
            </Button>
            <Button variant="outline" onClick={() => navigate('/contact')}>
              Start Project Brief
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
