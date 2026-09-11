import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVICES_LIST, SERVICE_CATEGORIES } from '../data/servicesData'
import Eyebrow from '../components/ui/Eyebrow'
import Button from '../components/ui/Button'
import SectionDivider from '../components/ui/SectionDivider'
import { HeadlineReveal, LineMaskRise, WordSpacingStretch } from '../components/ui/MotionText'
import { sendViaWhatsApp } from '../utils/whatsapp'

export default function Services() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All Services')

  const filteredServices = activeCategory === 'All Services'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category === activeCategory)

  const handleEnquireService = (service) => {
    navigate('/contact', {
      state: {
        message: `I would like to enquire regarding Brickleaf's "${service.title}" service (${service.category}).`,
        projectTypes: [service.title],
      },
    })
  }

  const handleWhatsAppService = (service) => {
    sendViaWhatsApp({
      source: `Services: ${service.title}`,
      projectTypes: [service.title],
      message: `Hello Brickleaf, I am interested in exploring your "${service.title}" capabilities for an upcoming project.`,
    })
  }

  return (
    <div className="w-full py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-16 text-ink font-body">

      {/* ── Page Header with Split Character Reveal ───────────────── */}
      <header className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <Eyebrow className="text-sand">[ Comprehensive Studio Practice ]</Eyebrow>

        <HeadlineReveal
          as="h1"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ink font-light leading-none tracking-tight"
        >
          Services
        </HeadlineReveal>

        <WordSpacingStretch className="text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-sand font-mono pt-1">
          15 Disciplines • Turnkey Execution • Bespoke Craft
        </WordSpacingStretch>

        <LineMaskRise className="text-ink-soft text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
          From full-scale residential estate architecture to executive workspaces, smart automation, and bespoke furniture curation — exploring our 15 specialized architectural disciplines.
        </LineMaskRise>

        <SectionDivider className="w-16 sm:w-20 mx-auto border-sand" />
      </header>

      {/* ── Category Filter Tabs (Swipeable on Mobile) ───────────── */}
      <div className="w-full overflow-hidden">
        <div
          className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 px-1"
          role="tablist"
        >
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`
                  flex-shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.16em] transition-all duration-200 border whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-ink text-cream border-ink font-semibold shadow-md'
                      : 'bg-cream/40 text-ink-soft border-line/70 hover:border-amber hover:text-ink'
                  }
                `}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 15 Services Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {filteredServices.map((service) => (
          <article
            key={service.id}
            className="group relative flex flex-col justify-between p-5 sm:p-8 bg-cream/30 border border-line/70 backdrop-blur-[2px] transition-all duration-300 hover:border-amber hover:bg-cream/60 hover:shadow-xl"
          >
            {/* Top Index & Category */}
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between border-b border-line/40 pb-3">
                <span className="font-display text-xl sm:text-2xl font-light text-sand group-hover:text-amber transition-colors">
                  {service.number}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-ink-soft px-2.5 py-0.5 border border-line/60 rounded-[2px]">
                  {service.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="font-display text-xl sm:text-2xl text-ink font-medium leading-snug group-hover:text-amber transition-colors flex items-center gap-2">
                  <span>{service.title}</span>
                </h3>
                <p className="text-xs font-semibold text-sand tracking-wide">
                  {service.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                {service.description}
              </p>

              {/* Deliverables Chips */}
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-ink-soft font-semibold block">
                  Key Scope:
                </span>
                <ul className="space-y-1 list-none p-0 m-0">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="text-[11px] text-ink flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 mt-5 sm:pt-6 sm:mt-6 border-t border-line/40 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleWhatsAppService(service)}
                className="text-[11px] uppercase tracking-wider font-semibold text-amber hover:text-ink transition-colors flex items-center gap-1 py-2 min-h-[44px]"
                title="Enquire on WhatsApp"
              >
                <span>💬 WhatsApp</span>
              </button>

              <Button
                variant="outline"
                onClick={() => handleEnquireService(service)}
                className="text-[11px] py-2 px-3.5 border-line/80 hover:border-amber min-h-[44px]"
              >
                Start Brief →
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* ── Bottom Discovery Callout ─────────────────────────────────── */}
      <section className="p-6 sm:p-12 bg-ink text-cream border border-sand/30 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <Eyebrow className="text-sand">Bespoke Engagements</Eyebrow>
          <HeadlineReveal as="h2" className="font-display text-2xl sm:text-4xl font-light text-cream leading-tight">
            Have a Multi-Disciplinary Architectural Scope?
          </HeadlineReveal>
          <LineMaskRise className="text-cream/75 text-xs sm:text-sm leading-relaxed">
            Our architectural team integrates space planning, custom millwork, lighting architecture, and landscaping into a cohesive, turnkey execution.
          </LineMaskRise>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto flex-shrink-0 justify-center">
          <Button
            variant="outline"
            onClick={() => sendViaWhatsApp({ source: 'Services Page Footer', message: 'Hello Brickleaf, I would like to discuss a custom architectural brief.' })}
            className="w-full sm:w-auto text-xs py-3 sm:py-2.5 border-cream/50 text-cream hover:bg-cream hover:text-ink justify-center"
          >
            💬 WhatsApp Studio
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate('/contact')}
            className="w-full sm:w-auto text-xs py-3 sm:py-2.5 justify-center"
          >
            Schedule Consultation →
          </Button>
        </div>
      </section>

    </div>
  )
}