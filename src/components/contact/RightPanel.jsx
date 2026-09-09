/**
 * RightPanel — cream-background form side of the contact split.
 * Includes direct WhatsApp automation dispatch and phone field.
 */
import ProjectCheckbox from './ProjectCheckbox'
import { sendViaWhatsApp } from '../../utils/whatsapp'

const PROJECT_TYPES = [
  { id: 'pt-new-build',    label: 'New Build' },
  { id: 'pt-renovation',   label: 'Renovation' },
  { id: 'pt-consult',      label: 'Consultation Only' },
  { id: 'pt-commercial',   label: 'Commercial' },
  { id: 'pt-styling',      label: 'Styling Only' },
]

/* ── Shared input class ─────────────────────────────────── */
const inputClass = [
  'w-full px-4 py-3.5',
  'bg-transparent border border-line',
  'text-ink text-sm placeholder:text-ink-soft/40',
  'transition-colors duration-150',
  'focus-visible:outline-none focus-visible:border-amber',
].join(' ')

/* ── FieldError — inline error message ──────────────────── */
function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-amber tracking-wide">
      {message}
    </p>
  )
}

/* ── FieldLabel — uppercase tracked label ───────────────── */
function FieldLabel({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-1.5 text-xs tracking-[0.18em] uppercase text-ink-soft font-medium"
    >
      {children}
    </label>
  )
}

export default function RightPanel({ form, errors, handleField, toggleType, handleSubmit }) {
  const handleDirectWhatsApp = () => {
    sendViaWhatsApp({
      source: 'Contact Form',
      name: form.name,
      email: form.email,
      phone: form.phone,
      projectTypes: form.projectTypes,
      message: form.message,
    })
  }

  return (
    <div className="flex flex-col bg-cream/60 backdrop-blur-md w-full lg:w-[58%] px-8 py-12 md:px-12 lg:px-16 xl:px-20 lg:py-16">

      {/* ── Section heading ──────────────────────────────── */}
      <header className="mb-10 space-y-2">
        <p className="text-xs tracking-[0.22em] uppercase text-sand font-medium">
          [ Project Intake ]
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-ink font-light leading-snug">
          Tell us about your project
        </h2>
      </header>

      {/* ── Form ─────────────────────────────────────────── */}
      <form
        id="intake-form"
        aria-label="Project intake form"
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-6"
      >

        {/* ── Row 1: Name, Email & Phone ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FieldLabel htmlFor="if-name">Name *</FieldLabel>
            <input
              id="if-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleField}
              aria-describedby={errors.name ? 'if-name-err' : undefined}
              aria-invalid={!!errors.name}
              className={inputClass}
            />
            <FieldError id="if-name-err" message={errors.name} />
          </div>

          <div>
            <FieldLabel htmlFor="if-email">Email *</FieldLabel>
            <input
              id="if-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleField}
              aria-describedby={errors.email ? 'if-email-err' : undefined}
              aria-invalid={!!errors.email}
              className={inputClass}
            />
            <FieldError id="if-email-err" message={errors.email} />
          </div>
        </div>

        <div>
          <FieldLabel htmlFor="if-phone">Phone / WhatsApp (Optional)</FieldLabel>
          <input
            id="if-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={form.phone || ''}
            onChange={handleField}
            className={inputClass}
          />
        </div>

        {/* ── Textarea ─────────────────────────────────────── */}
        <div>
          <FieldLabel htmlFor="if-message">Describe your space / project *</FieldLabel>
          <textarea
            id="if-message"
            name="message"
            rows={4}
            placeholder="Describe the space — square footage, aesthetic aspirations, architectural scope, timeline…"
            value={form.message}
            onChange={handleField}
            aria-describedby={errors.message ? 'if-message-err' : undefined}
            aria-invalid={!!errors.message}
            className={`${inputClass} resize-none leading-relaxed`}
          />
          <FieldError id="if-message-err" message={errors.message} />
        </div>

        {/* ── Checkbox grid ────────────────────────────────── */}
        <fieldset>
          <legend className="mb-4 text-xs tracking-[0.18em] uppercase text-ink-soft font-medium">
            I&rsquo;m interested in&hellip;
          </legend>
          <div
            role="group"
            aria-label="Project type selection"
            className="grid grid-cols-2 md:grid-cols-3 gap-2.5"
          >
            {PROJECT_TYPES.map(({ id, label }) => {
              const isChecked = form.projectTypes.includes(label) || form.projectTypes.includes(id)
              return (
                <ProjectCheckbox
                  key={id}
                  id={id}
                  label={label}
                  checked={isChecked}
                  onChange={() => toggleType(label)}
                />
              )
            })}
          </div>
        </fieldset>

        {/* ── Divider before submit ─────────────────────────── */}
        <hr className="border-0 border-t border-line my-2" aria-hidden="true" />

        {/* ── Submit Options ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            id="intake-submit"
            type="submit"
            className="
              flex-1 py-4 px-6
              bg-amber text-cream
              text-xs tracking-[0.2em] uppercase font-semibold
              border border-amber
              transition-colors duration-200
              hover:bg-ink hover:border-ink
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-amber
            "
          >
            Submit Project Brief
          </button>

          <button
            type="button"
            onClick={handleDirectWhatsApp}
            className="
              flex-1 py-4 px-6
              bg-cream border border-sand text-ink
              text-xs tracking-[0.2em] uppercase font-semibold
              transition-all duration-200
              hover:bg-emerald-700 hover:text-white hover:border-emerald-700
              flex items-center justify-center gap-2
            "
          >
            <span>💬 Send via WhatsApp</span>
          </button>
        </div>

        <p className="text-center text-xs text-ink-soft/70">
          We review project scopes and respond with tailored concept notes within 24 hours.
        </p>

      </form>
    </div>
  )
}
