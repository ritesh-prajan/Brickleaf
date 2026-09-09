import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sendViaWhatsApp } from '../../utils/whatsapp'
import RightPanel from './RightPanel'
import { useContactForm } from '../../hooks/useContactForm'

export default function EditorialContact({ onSubmit }) {
  const location = useLocation()
  const initialValues = location.state || null
  const formRef = useRef(null)
  const [formOpen, setFormOpen] = useState(!!initialValues)

  const { form, errors, handleField, toggleType, handleSubmit } =
    useContactForm(onSubmit, initialValues)

  const scrollToForm = () => {
    setFormOpen(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleWhatsAppQuick = () => {
    sendViaWhatsApp({
      source: 'Contact Page (Direct Header)',
      message: 'Hello Brickleaf, I would like to schedule an architectural discovery consultation.',
    })
  }

  return (
    <div className="relative w-full min-h-screen bg-cream text-ink overflow-x-hidden font-body selection:bg-sand selection:text-ink">

      {/* ── Vertical Left Rail ────────────────────────────────────────── */}
      <aside aria-label="Page links and socials" className="hidden lg:flex flex-col justify-between fixed left-8 top-28 bottom-12 z-30 pointer-events-none">
        {/* Circular Emblem Seal with Leaf Logo in Center */}
        <div className="pointer-events-auto">
          <div
            className="relative w-24 h-24 flex items-center justify-center group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Brickleaf Studio"
          >
            {/* SVG Circular Rotating Text Path */}
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_24s_linear_infinite] group-hover:animate-[spin_10s_linear_infinite]">
              <path
                id="leafTextPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[8px] uppercase tracking-[0.24em] fill-ink-soft group-hover:fill-amber transition-colors font-semibold">
                <textPath href="#leafTextPath" startOffset="0%">
                  • BRICKLEAF • BRICKLEAF • BRICKLEAF
                </textPath>
              </text>
            </svg>

            {/* Center Architectural Leaf Emblem Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 text-amber fill-amber/15 stroke-amber transition-transform duration-500 group-hover:scale-110"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Organic Botanical Leaf Silhouette */}
                <path d="M12 2C8.5 7 7.5 12 10.5 16.5C12 18.8 14 20.5 15.5 22C16.5 20.5 17.5 18 17.5 14.5C17.5 9 15 4 12 2Z" />
                {/* Internal Leaf Veins */}
                <path d="M12 2C13 8 14 14 15.5 22" strokeWidth="1.2" />
                <path d="M12.5 7.5L15 9" strokeWidth="1.2" />
                <path d="M13 11.5L16 13" strokeWidth="1.2" />
                <path d="M10.8 11.5L13.2 13.5" strokeWidth="1.2" />
                <path d="M11.5 15L14 16.8" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Vertical Social Icons Pill with Clean Vector SVGs */}
        <div className="pointer-events-auto flex flex-col items-center gap-4 py-4 px-3 bg-cream/80 backdrop-blur-md border border-line/70 rounded-full text-ink-soft shadow-md">
          {/* Instagram SVG */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="p-1 text-ink-soft hover:text-amber hover:scale-110 transition-all duration-200"
            title="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* LinkedIn SVG */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-1 text-ink-soft hover:text-amber hover:scale-110 transition-all duration-200"
            title="LinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          {/* Pinterest SVG */}
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Pinterest"
            className="p-1 text-ink-soft hover:text-amber hover:scale-110 transition-all duration-200"
            title="Pinterest"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="12" y1="9" x2="12" y2="21" />
              <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
              <path d="M10.7 15.7A6 6 0 1 1 18 10.4c-.1 2.4-1.2 4.4-3.4 5.1-1.3.4-2.8-.2-3.3-1.4" />
            </svg>
          </a>
        </div>

        {/* Vertical Breadcrumb Label */}
        <div className="pointer-events-auto -rotate-90 origin-bottom-left translate-y-6 text-[10px] tracking-[0.3em] uppercase text-ink-soft/70 font-semibold">
          <Link to="/" className="hover:text-ink transition-colors">HOME</Link>
          <span className="mx-2 text-sand">/</span>
          <span className="text-ink">CONTACT</span>
        </div>
      </aside>

      {/* ── Main Editorial Content ────────────────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:pl-36 lg:pr-12 pt-8 sm:pt-14 pb-20 space-y-12 sm:space-y-16">

        {/* ── Top Header Section ──────────────────────────────────────── */}
        <header className="relative w-full flex flex-col items-center text-center space-y-6">

          {/* Top Quick Actions */}
          <div className="w-full flex items-center justify-between text-xs tracking-[0.2em] uppercase font-medium text-ink-soft border-b border-line/40 pb-4">
            <span className="text-sand text-[10px] sm:text-xs">
              01 / Studio Engagement
            </span>

            <div className="flex items-center gap-6 text-[10px] sm:text-xs">
              <button
                type="button"
                onClick={scrollToForm}
                className="hover:text-amber transition-colors uppercase"
              >
                Book a Call
              </button>
              <button
                type="button"
                onClick={handleWhatsAppQuick}
                className="text-amber font-semibold hover:text-ink transition-colors uppercase flex items-center gap-1"
              >
                <span>WhatsApp</span>
                <span>↗</span>
              </button>
            </div>
          </div>

          {/* Monumental Condensed Serif Headline */}
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight font-light text-ink uppercase leading-none select-none py-2">
            Contact Us
          </h1>
        </header>

        {/* ── 3-Column Editorial Information Grid ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 py-8 border-y border-line/60 text-center md:text-left font-body">

          {/* Column 1: Write Us */}
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-sand font-semibold">
              Write Us
            </p>
            <p className="text-sm sm:text-base font-display font-medium text-ink">
              <a href="mailto:hello@brickleaf.co" className="hover:text-amber transition-colors">
                hello@brickleaf.co
              </a>
            </p>
            <p className="text-xs text-ink-soft">
              <a href="mailto:press@brickleaf.co" className="hover:text-amber transition-colors">
                press@brickleaf.co
              </a>
            </p>
          </div>

          {/* Column 2: Studio Headquarters & Location */}
          <div className="space-y-2 text-center md:text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-sand font-semibold">
              Studio Headquarters
            </p>
            <p className="text-xs sm:text-sm text-ink leading-relaxed font-medium">
              Kelambakkam Bypass Rd, Chennai<br />
              Tamil Nadu, India
            </p>
            <p className="text-[11px] text-ink-soft/80 uppercase tracking-wider">
              Secondary Atelier: Jubilee Hills, Hyderabad
            </p>
          </div>

          {/* Column 3: Talk to Us & WhatsApp */}
          <div className="space-y-2 text-center md:text-right">
            <p className="text-[11px] uppercase tracking-[0.22em] text-sand font-semibold">
              Talk to Us
            </p>
            <p className="text-sm sm:text-base font-display font-medium text-ink">
              <a href="tel:+919876543210" className="hover:text-amber transition-colors">
                +91 98765 43210
              </a>
            </p>
            <p className="text-xs">
              <button
                type="button"
                onClick={handleWhatsAppQuick}
                className="text-amber font-semibold hover:underline inline-flex items-center gap-1 uppercase tracking-wider text-[11px]"
              >
                <span>💬 WhatsApp Instant</span>
              </button>
            </p>
          </div>

        </div>

        {/* ── Architectural Studio Map Section ─────────────────────────── */}
        <section aria-label="Studio Location Map" className="relative w-full aspect-[16/11] sm:aspect-[16/9] lg:aspect-[21/10] overflow-hidden border border-line/60 bg-cream shadow-2xl group">
          {/* Custom Architectural Map Photo */}
          <img
            src="/images/studio-map.jpg"
            alt="Brickleaf Studio architectural location map near Kelambakkam Bypass"
            className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />

          {/* Floating Studio Location Badge */}
          <div className="absolute top-[42%] left-[58%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-ink text-cream border border-sand/40 shadow-2xl rounded-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
              <div className="text-left font-body">
                <span className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-sand">
                  Brickleaf Studio
                </span>
                <span className="block text-[9px] text-cream/75 tracking-wider">
                  Open Daily 09:00 — 20:00
                </span>
              </div>
              <span className="text-sand text-xs font-display">✦</span>
            </div>
          </div>

          {/* Interactive Floating Circular CTA Button */}
          <div className="absolute right-6 sm:right-12 bottom-6 sm:bottom-12 z-20">
            <button
              type="button"
              onClick={scrollToForm}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-cream/90 backdrop-blur-md border border-line/80 shadow-2xl flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:scale-105 hover:border-amber group/btn"
            >
              {/* Perimeter Orbital Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="46%"
                  fill="none"
                  stroke="var(--color-sand)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="group-hover/btn:stroke-amber transition-colors"
                />
              </svg>

              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold text-ink group-hover/btn:text-amber transition-colors">
                Book a Call
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.16em] text-sand font-mono mt-0.5">
                Now →
              </span>
            </button>
          </div>
        </section>

        {/* ── Project Intake Brief Form Section ─────────────────────────── */}
        <div ref={formRef} className="pt-8">
          <div className="border border-line/60 overflow-hidden bg-cream/40 shadow-xl">
            <div className="p-6 sm:p-8 border-b border-line bg-cream/80 flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-sand font-semibold block">
                  Interactive Intake
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">
                  Project Discovery &amp; Consultation Form
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setFormOpen(!formOpen)}
                className="px-4 py-2 text-xs uppercase tracking-widest border border-sand bg-cream text-ink hover:bg-ink hover:text-cream transition-all"
              >
                {formOpen ? 'Hide Form ▲' : 'Open Intake Form ▼'}
              </button>
            </div>

            {formOpen && (
              <div className="p-4 sm:p-8 lg:p-12">
                <RightPanel
                  form={form}
                  errors={errors}
                  handleField={handleField}
                  toggleType={toggleType}
                  handleSubmit={handleSubmit}
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
