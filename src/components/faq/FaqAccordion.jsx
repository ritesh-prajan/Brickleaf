import { useState } from 'react'
import { FAQ_ITEMS, FAQ_CATEGORIES } from '../../data/faqData'
import Eyebrow from '../ui/Eyebrow'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

export default function FaqAccordion() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [openItems, setOpenItems] = useState({ 'faq-1': true }) // first item open by default

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const filteredItems = activeCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <div className="w-full space-y-12">
      {/* ── Category Filter Tabs ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-2" role="tablist">
        {FAQ_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-200 border
                ${
                  isActive
                    ? 'bg-ink text-cream border-ink font-semibold'
                    : 'bg-cream/50 text-ink-soft border-line/60 hover:border-sand hover:text-ink'
                }
              `}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* ── Accordion List ────────────────────────────────────────── */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredItems.map((item) => {
          const isOpen = !!openItems[item.id]
          return (
            <div
              key={item.id}
              className="border border-line/60 bg-cream/40 transition-colors duration-200 hover:border-sand"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-display text-lg sm:text-xl text-ink font-normal"
              >
                <span>{item.question}</span>
                <span
                  className={`text-sand text-lg transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="px-6 pb-6 pt-1 text-sm text-ink-soft leading-relaxed border-t border-line/30 font-body"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Need More Information Card ────────────────────────────── */}
      <div className="max-w-4xl mx-auto p-8 bg-ink text-cream border border-sand/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <Eyebrow className="text-sand">Have a unique inquiry?</Eyebrow>
          <h3 className="font-display text-2xl font-light text-cream">
            Schedule an Architectural Discovery Session
          </h3>
          <p className="text-cream/70 text-xs sm:text-sm">
            Our team reviews blueprints, spatial parameters, and aesthetic direction.
          </p>
        </div>

        <Button variant="primary" onClick={() => navigate('/contact')} className="flex-shrink-0 text-xs">
          Start Project Brief →
        </Button>
      </div>
    </div>
  )
}
