import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sendViaWhatsApp } from '../../utils/whatsapp'
import RightPanel from './RightPanel'
import { useContactForm } from '../../hooks/useContactForm'
import { HeadlineReveal } from '../ui/MotionText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function EditorialContact({ onSubmit }) {
  const location = useLocation()
  const initialValues = location.state || null
  const formRef = useRef(null)
  const mapRef = useRef(null)
  const infoGridRef = useRef(null)
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

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        map,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: map,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    }, map)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const grid = infoGridRef.current
    if (!grid) return

    const ctx = gsap.context(() => {
      const cols = grid.querySelectorAll('.info-col')
      gsap.fromTo(
        cols,
        { opacity: 0, y: '1.5rem' },
        {
          opacity: 1,
          y: '0rem',
          stagger: 0.14,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    }, grid)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative w-full min-h-screen text-ink overflow-x-hidden font-body selection:bg-sand selection:text-ink">
      {/* ── Main Editorial Content ────────────────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:pl-32 lg:pr-12 pt-8 sm:pt-14 pb-20 space-y-12 sm:space-y-16">
        <header className="relative w-full flex flex-col items-center text-center space-y-6">
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

          <HeadlineReveal
            as="h1"
            className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight font-light text-ink uppercase leading-none select-none py-2"
          >
            Contact Us
          </HeadlineReveal>
        </header>

        {/* 3-Column Info Grid */}
        <div
          ref={infoGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 py-8 border-y border-line/60 text-center md:text-left font-body"
        >
          <div className="info-col space-y-2">
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

          <div className="info-col space-y-2 text-center md:text-center">
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

          <div className="info-col space-y-2 text-center md:text-right">
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

        {/* Studio Map Section */}
        <section
          ref={mapRef}
          aria-label="Studio Location Map"
          className="relative w-full aspect-[16/11] sm:aspect-[16/9] lg:aspect-[21/10] overflow-hidden border border-line/60 bg-cream/60 shadow-2xl group"
        >
          <img
            src="/images/studio-map.jpg"
            alt="Brickleaf Studio architectural location map near Kelambakkam Bypass"
            className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />

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

          <div className="absolute right-6 sm:right-12 bottom-6 sm:bottom-12 z-20">
            <button
              type="button"
              onClick={scrollToForm}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-cream/90 backdrop-blur-md border border-line/80 shadow-2xl flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:scale-105 hover:border-amber group/btn"
            >
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

        {/* Project Intake Brief Form Section */}
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