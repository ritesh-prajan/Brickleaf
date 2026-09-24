import Eyebrow from '../components/ui/Eyebrow'
import SectionDivider from '../components/ui/SectionDivider'

export default function Terms() {
  return (
    <div className="w-full py-10 sm:py-16 md:py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 sm:space-y-12 text-ink font-body">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <header className="text-center space-y-3 sm:space-y-4">
        <Eyebrow className="text-sand">[ Studio Policies ]</Eyebrow>
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-ink font-light leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-ink-soft text-[11px] sm:text-sm tracking-wider sm:tracking-widest uppercase">
          Effective Date: January 2025 • Brickleaf Interior Studio
        </p>
        <SectionDivider className="w-16 mx-auto border-sand" />
      </header>

      {/* ── Policy Sections ───────────────────────────────────────── */}
      <div className="space-y-8 sm:space-y-10 text-xs sm:text-sm leading-relaxed text-ink-soft border border-line/50 p-5 sm:p-10 bg-cream/30">

        <section className="space-y-2.5 sm:space-y-3">
          <h2 className="font-display text-lg sm:text-2xl text-ink font-medium">
            01. Scope of Design Engagement
          </h2>
          <p>
            Brickleaf provides bespoke architectural interior design, space planning, lighting design, material specification, and turnkey project coordination. All project phases commence upon mutual execution of a formal Letter of Engagement (LOE) and receipt of the initial discovery retainer.
          </p>
        </section>

        <section className="space-y-2.5 sm:space-y-3">
          <h2 className="font-display text-lg sm:text-2xl text-ink font-medium">
            02. Intellectual Property &amp; Architectural Blueprints
          </h2>
          <p>
            All concept renderings, 3D visualizations, millwork schematics, and material schedules produced by Brickleaf remain the exclusive intellectual property of the studio. Drawings and blueprints are provided for execution of the designated project site only and may not be reproduced or utilized for secondary developments without written authorization.
          </p>
        </section>

        <section className="space-y-2.5 sm:space-y-3">
          <h2 className="font-display text-lg sm:text-2xl text-ink font-medium">
            03. Custom Millwork, Stone &amp; Natural Materiality
          </h2>
          <p>
            Our studio champions authentic materials including natural limestone, Roman travertine, American walnut, and unlacquered metals. Clients acknowledge that natural variations in grain, veining, tonal warmth, and patina are inherent organic characteristics of authentic architectural materials and do not constitute defects.
          </p>
        </section>

        <section className="space-y-2.5 sm:space-y-3">
          <h2 className="font-display text-lg sm:text-2xl text-ink font-medium">
            04. Procurement, Timelines &amp; Handover
          </h2>
          <p>
            Estimated timelines for custom fabrication, imported fixtures, and structural alterations are established in good faith. Brickleaf provides active procurement monitoring; however, delivery schedules may be adjusted based on artisan lead times and bespoke manufacturing requirements.
          </p>
        </section>

        <section className="space-y-2.5 sm:space-y-3">
          <h2 className="font-display text-lg sm:text-2xl text-ink font-medium">
            05. Privacy &amp; Digital Intake Security
          </h2>
          <p>
            Information collected through our project intake forms, interactive Avatar Concierge, and WhatsApp automation channels is used strictly for architectural project assessment and communication. We do not sell or disclose client details to third-party marketing services.
          </p>
        </section>

        <section className="space-y-2.5 sm:space-y-3">
          <h2 className="font-display text-lg sm:text-2xl text-ink font-medium">
            06. Studio Contact &amp; Governance
          </h2>
          <p>
            For legal inquiries, contract review, or questions regarding our studio terms, please contact our administrative team at <a href="mailto:contact@brickleaf.com" className="text-amber underline">contact@brickleaf.com</a> or via our official studio liaison desk.
          </p>
        </section>

      </div>
    </div>
  )
}