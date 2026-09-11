import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FAQ_ITEMS, FAQ_CATEGORIES } from '../../data/faqData'
import Eyebrow from '../ui/Eyebrow'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FaqAccordion() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [openItems, setOpenItems] = useState({ 'faq-1': true })
  const listRef = useRef(null)

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredItems = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const ctx = gsap.context(() => {
      const items = list.querySelectorAll('.faq-item')
      if (!items.length) return

      ScrollTrigger.getAll()
        .filter(t => t.vars?.id?.startsWith('faq-item'))
        .forEach(t => t.kill())

      const isMobile = window.innerWidth < 768
      gsap.set(items, { x: isMobile ? '-1rem' : '-3rem', opacity: 0 })

      items.forEach((item, i) => {
        gsap.to(item, {
          x: '0rem',
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: {
            id: 'faq-item-' + i,
            trigger: item,
            start: 'top 92%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
        })
      })
    }, list)

    return () => ctx.revert()
  }, [filteredItems])

  return (
    <div className="w-full space-y-8 sm:space-y-12">
      {/* Category Tabs - Horizontal swipe on mobile, centered on desktop */}
      <div className="w-full overflow-x-auto no-scrollbar py-1.5 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 sm:justify-center min-w-max sm:min-w-0" role="tablist">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2.5 sm:py-2 text-xs uppercase tracking-[0.16em] transition-all duration-200 border min-h-[44px] flex items-center justify-center ${
                  isActive
                    ? 'bg-ink text-cream border-ink font-semibold shadow-md'
                    : 'bg-cream/40 text-ink-soft border-line/70 hover:border-amber hover:text-ink active:bg-sand/20'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <div ref={listRef} className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
        {filteredItems.map((item) => {
          const isOpen = !!openItems[item.id]
          return (
            <div
              key={item.id}
              className="faq-item border border-line/70 bg-cream/30 backdrop-blur-[2px] transition-all duration-200 hover:border-amber will-change-transform"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left font-display text-base sm:text-xl text-ink font-normal min-h-[48px]"
              >
                <span className="leading-snug">{item.question}</span>
                <span className={`text-sand text-lg transition-transform duration-300 flex-shrink-0 w-6 h-6 flex items-center justify-center ${isOpen ? 'rotate-45 text-amber' : 'rotate-0'}`}>
                  +
                </span>
              </button>
              {isOpen && (
                <div id={`faq-answer-${item.id}`} className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-line/40 font-body">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="max-w-4xl mx-auto p-5 sm:p-8 bg-ink text-cream border border-sand/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-6 shadow-2xl">
        <div className="space-y-1.5 text-center sm:text-left">
          <Eyebrow className="text-sand">[ Bespoke Inquiries ]</Eyebrow>
          <h3 className="font-display text-xl sm:text-2xl font-light text-cream leading-snug">
            Schedule an Architectural Discovery Session
          </h3>
          <p className="text-cream/70 text-xs sm:text-sm leading-relaxed">
            Our team reviews blueprints, spatial parameters, and aesthetic direction.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/contact')} className="flex-shrink-0 text-xs w-full sm:w-auto min-h-[44px] justify-center">
          Start Project Brief →
        </Button>
      </div>
    </div>
  )
}