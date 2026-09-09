import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { sendViaWhatsApp } from '../../utils/whatsapp'

const CONCIERGE_STEPS = {
  INTEREST: 'interest',
  SERVICES: 'services',
  TIMELINE: 'timeline',
  BUDGET: 'budget',
  NAME: 'name',
  CONTACT: 'contact',
  SUMMARY: 'summary',
}

const INTEREST_OPTIONS = [
  { id: 'pt-home', label: 'Home Interiors & Luxury Residences' },
  { id: 'pt-office', label: 'Office Interiors & Executive Suites' },
  { id: 'pt-it-parks', label: 'IT Parks & Tech Campuses' },
  { id: 'pt-restaurants', label: 'Restaurants & Hospitality' },
  { id: 'pt-apparel', label: 'Apparel Showrooms & Boutiques' },
  { id: 'pt-hospitals', label: 'Hospitals & Healthcare Clinics' },
  { id: 'pt-warehouses', label: 'Warehouses & Industrial Spaces' },
  { id: 'pt-refurbish', label: 'Refurbishments & Structural Overhauls' },
]

const SERVICE_OPTIONS = [
  'Space Planning & Architectural Blueprints',
  'Lighting Solutions & 2700K Coves',
  'Home Automation & Smart IoT Integration',
  'Bespoke Furniture & Joinery Craft',
  'Curtain Solutions & Motorized Sheers',
  'Wallpapers & Hand-Troweled Wall Decor',
  'Landscaping & Biophilic Design',
]

const TIMELINE_OPTIONS = [
  'Immediate (Within 1-3 Months)',
  'Planned (3 to 6 Months)',
  'Future Blueprinting Stage',
]

const BUDGET_OPTIONS = [
  '₹15L – ₹30L (Curated Living Revamp)',
  '₹30L – ₹60L (Signature Bespoke Interior)',
  '₹60L+ (Luxury Estate Architecture)',
  'Consultation / Concept Package Only',
]

export default function ConciergeChatbot() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [currentStep, setCurrentStep] = useState(CONCIERGE_STEPS.INTEREST)

  // Intake data state
  const [intakeData, setIntakeData] = useState({
    interest: '',
    interestId: '',
    service: '',
    timeline: '',
    budget: '',
    name: '',
    phone: '',
    email: '',
  })

  const [inputName, setInputName] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [inputEmail, setInputEmail] = useState('')

  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, currentStep, isOpen])

  // Initial greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'avatar',
          text: 'Welcome to Brickleaf. I am Aria, your architectural design concierge. What type of space are you planning to transform?',
        },
      ])
    }
  }, [isOpen, messages.length])

  // ── Step 1 Handler: Interest selection
  const handleSelectInterest = (option) => {
    setIntakeData((prev) => ({ ...prev, interest: option.label, interestId: option.id }))
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: option.label },
      {
        sender: 'avatar',
        text: `Splendid. A ${option.label} requires thoughtful spatial planning. Which specific focus area is most essential for your vision?`,
      },
    ])
    setCurrentStep(CONCIERGE_STEPS.SERVICES)
  }

  // ── Step 2 Handler: Service selection
  const handleSelectService = (service) => {
    setIntakeData((prev) => ({ ...prev, service }))
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: service },
      {
        sender: 'avatar',
        text: 'Understood. What is your estimated project timeline?',
      },
    ])
    setCurrentStep(CONCIERGE_STEPS.TIMELINE)
  }

  // ── Step 3 Handler: Timeline selection
  const handleSelectTimeline = (timeline) => {
    setIntakeData((prev) => ({ ...prev, timeline }))
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: timeline },
      {
        sender: 'avatar',
        text: 'Perfect. What investment tier are you considering for materials, millwork, and finishes?',
      },
    ])
    setCurrentStep(CONCIERGE_STEPS.BUDGET)
  }

  // ── Step 4 Handler: Budget selection
  const handleSelectBudget = (budget) => {
    setIntakeData((prev) => ({ ...prev, budget }))
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: budget },
      {
        sender: 'avatar',
        text: 'Wonderful. Who should our principal design team address this preliminary brief to?',
      },
    ])
    setCurrentStep(CONCIERGE_STEPS.NAME)
  }

  // ── Step 5 Handler: Name submission
  const handleSubmitName = (e) => {
    e.preventDefault()
    if (!inputName.trim()) return
    const name = inputName.trim()
    setIntakeData((prev) => ({ ...prev, name }))
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: name },
      {
        sender: 'avatar',
        text: `Delighted to assist you, ${name}. Please share your phone / WhatsApp number and email so we can prepare your project handover:`,
      },
    ])
    setCurrentStep(CONCIERGE_STEPS.CONTACT)
  }

  // ── Step 6 Handler: Contact details submission
  const handleSubmitContact = (e) => {
    e.preventDefault()
    if (!inputPhone.trim() && !inputEmail.trim()) return
    const phone = inputPhone.trim()
    const email = inputEmail.trim()
    setIntakeData((prev) => ({ ...prev, phone, email }))
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: `${phone || ''} ${email ? `(${email})` : ''}` },
      {
        sender: 'avatar',
        text: 'Your project brief is compiled with all the details! You can now transfer this directly to our contact intake form or send it to us via WhatsApp:',
      },
    ])
    setCurrentStep(CONCIERGE_STEPS.SUMMARY)
  }

  // ── Final Actions: Transfer to Contact page with pre-filled state
  const handleTransferToContact = () => {
    setIsOpen(false)
    navigate('/contact', {
      state: {
        name: intakeData.name,
        email: intakeData.email,
        phone: intakeData.phone,
        message: `Project Type: ${intakeData.interest}\nFocus Area: ${intakeData.service}\nTimeline: ${intakeData.timeline}\nEstimated Investment: ${intakeData.budget}`,
        projectTypes: [intakeData.interestId || 'pt-new-build'],
      },
    })
  }

  // ── Final Actions: Direct WhatsApp dispatch
  const handleSendWhatsApp = () => {
    sendViaWhatsApp({
      source: 'Avatar Concierge (Aria)',
      name: intakeData.name,
      email: intakeData.email,
      phone: intakeData.phone,
      projectTypes: [intakeData.interest],
      timeline: intakeData.timeline,
      budget: intakeData.budget,
      message: `Focus Area: ${intakeData.service}`,
    })
  }

  // Restart questionnaire
  const handleRestart = () => {
    setIntakeData({
      interest: '',
      interestId: '',
      service: '',
      timeline: '',
      budget: '',
      name: '',
      phone: '',
      email: '',
    })
    setInputName('')
    setInputPhone('')
    setInputEmail('')
    setMessages([
      {
        sender: 'avatar',
        text: 'Welcome back. Let us start fresh — what type of space are you looking to transform?',
      },
    ])
    setCurrentStep(CONCIERGE_STEPS.INTEREST)
  }

  return (
    <>
      {/* ── Floating Launcher Trigger ──────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Design Concierge"
            className="group flex items-center gap-3 px-4 py-3 bg-ink/90 backdrop-blur-md text-cream border border-sand/50 shadow-2xl hover:border-amber transition-all duration-300 hover:scale-105"
          >
            {/* Avatar Pill Headshot */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-sand/30 border border-sand/60 flex-shrink-0 flex items-center justify-center font-display text-xs text-cream font-bold">
              <span>A</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-ink" />
            </div>

            <div className="text-left font-body">
              <span className="text-[10px] text-sand uppercase tracking-widest font-semibold block leading-tight">
                Design Concierge
              </span>
              <span className="text-xs font-display text-cream block leading-tight group-hover:text-amber">
                Chat with Aria
              </span>
            </div>
          </button>
        ) : null}
      </div>

      {/* ── Chatbot Modal Window ───────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Aria — Design Concierge"
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] h-[640px] bg-cream border border-line/70 shadow-2xl flex flex-col overflow-hidden font-body text-ink"
        >
          {/* Chat Header */}
          <div className="px-5 py-4 bg-ink text-cream flex items-center justify-between border-b border-sand/30 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-sand/30 border border-sand/60 flex items-center justify-center font-display font-bold text-cream text-sm">
                <span>A</span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-ink" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-medium text-cream">Aria</h3>
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber/30 text-sand border border-amber/40 uppercase tracking-widest rounded">
                    Concierge
                  </span>
                </div>
                <p className="text-[11px] text-cream/70">Brickleaf Studio Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRestart}
                title="Restart chat"
                className="text-xs text-cream/60 hover:text-cream px-2 py-1 transition-colors"
              >
                ↺
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="text-sm text-cream/60 hover:text-cream px-2 py-1 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Conversation Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-cream/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'avatar' && (
                  <div className="w-6 h-6 rounded-full bg-ink text-cream flex-shrink-0 flex items-center justify-center text-[10px] font-display font-bold mt-1">
                    A
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-ink text-cream border border-line'
                      : 'bg-cream border border-line/60 text-ink shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* ── Interactive Options based on Step ── */}

            {/* Step 1: Interest Options */}
            {currentStep === CONCIERGE_STEPS.INTEREST && (
              <div className="pt-2 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-sand font-semibold">
                  Select a category:
                </p>
                <div className="flex flex-col gap-1.5">
                  {INTEREST_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectInterest(opt)}
                      className="text-left px-3.5 py-2.5 text-xs bg-cream hover:bg-ink hover:text-cream border border-line hover:border-sand transition-all duration-150"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Service Options */}
            {currentStep === CONCIERGE_STEPS.SERVICES && (
              <div className="pt-2 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-sand font-semibold">
                  Select primary scope:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SERVICE_OPTIONS.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleSelectService(service)}
                      className="text-left px-3.5 py-2.5 text-xs bg-cream hover:bg-ink hover:text-cream border border-line hover:border-sand transition-all duration-150"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Timeline Options */}
            {currentStep === CONCIERGE_STEPS.TIMELINE && (
              <div className="pt-2 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-sand font-semibold">
                  Desired timeline:
                </p>
                <div className="flex flex-col gap-1.5">
                  {TIMELINE_OPTIONS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleSelectTimeline(time)}
                      className="text-left px-3.5 py-2.5 text-xs bg-cream hover:bg-ink hover:text-cream border border-line hover:border-sand transition-all duration-150"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Budget Options */}
            {currentStep === CONCIERGE_STEPS.BUDGET && (
              <div className="pt-2 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-sand font-semibold">
                  Investment tier:
                </p>
                <div className="flex flex-col gap-1.5">
                  {BUDGET_OPTIONS.map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => handleSelectBudget(budget)}
                      className="text-left px-3.5 py-2.5 text-xs bg-cream hover:bg-ink hover:text-cream border border-line hover:border-sand transition-all duration-150"
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Name Input Form */}
            {currentStep === CONCIERGE_STEPS.NAME && (
              <form onSubmit={handleSubmitName} className="pt-2 space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name..."
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-cream border border-line focus:outline-none focus:border-amber"
                  autoFocus
                />
                <Button variant="primary" type="submit" className="w-full text-xs py-2">
                  Continue →
                </Button>
              </form>
            )}

            {/* Step 6: Contact Info Form */}
            {currentStep === CONCIERGE_STEPS.CONTACT && (
              <form onSubmit={handleSubmitContact} className="pt-2 space-y-2.5">
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Phone Number..."
                  value={inputPhone}
                  onChange={(e) => setInputPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-cream border border-line focus:outline-none focus:border-amber"
                  autoFocus
                />
                <input
                  type="email"
                  placeholder="Email Address (Optional)..."
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-cream border border-line focus:outline-none focus:border-amber"
                />
                <Button variant="primary" type="submit" className="w-full text-xs py-2">
                  Finalize Brief →
                </Button>
              </form>
            )}

            {/* Step 7: Summary Review & Handover Card */}
            {currentStep === CONCIERGE_STEPS.SUMMARY && (
              <div className="pt-2 space-y-3">
                <div className="p-3.5 bg-cream border border-sand/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-line/50 pb-1.5">
                    <span className="font-semibold text-ink uppercase tracking-wider text-[10px]">
                      Project Brief Summary
                    </span>
                    <span className="text-emerald-600 font-bold text-[10px]">Ready</span>
                  </div>

                  <div className="space-y-1 text-[11px] text-ink-soft">
                    <p><strong className="text-ink">Client:</strong> {intakeData.name}</p>
                    <p><strong className="text-ink">Contact:</strong> {intakeData.phone} {intakeData.email ? `• ${intakeData.email}` : ''}</p>
                    <p><strong className="text-ink">Interest:</strong> {intakeData.interest}</p>
                    <p><strong className="text-ink">Scope:</strong> {intakeData.service}</p>
                    <p><strong className="text-ink">Investment:</strong> {intakeData.budget}</p>
                    <p><strong className="text-ink">Timeline:</strong> {intakeData.timeline}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="primary"
                    onClick={handleTransferToContact}
                    className="w-full text-xs py-2.5 justify-center"
                  >
                    Transfer to Contact Page (Pre-Filled) →
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleSendWhatsApp}
                    className="w-full text-xs py-2 justify-center"
                  >
                    💬 Send to WhatsApp Instantly
                  </Button>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>
      )}
    </>
  )
}
