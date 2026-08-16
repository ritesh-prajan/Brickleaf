/**
 * RightPanel — cream-background form side of the contact split.
 *
 * Receives all form state and handlers from ContactSection (no local state).
 *
 * Props:
 *   form         — { name, email, message, projectTypes }
 *   errors       — { name?, email?, message? }
 *   handleField  — onChange for text inputs / textarea
 *   toggleType   — toggles a project type in the array
 *   handleSubmit — form onSubmit handler
 */
import ProjectCheckbox from './ProjectCheckbox'

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
  return (
    <div className="flex flex-col bg-cream/60 backdrop-blur-md w-full lg:w-[58%] px-8 py-12 md:px-12 lg:px-16 xl:px-20 lg:py-16">

      {/* ── Section heading ──────────────────────────────── */}
      <header className="mb-10 space-y-2">
        <p className="text-xs tracking-[0.22em] uppercase text-sand font-medium">
          [ Project Intake ]
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-ink font-light leading-snug">
          [Tell us about your project]
        </h2>
      </header>

      {/* ── Form ─────────────────────────────────────────── */}
      <form
        id="intake-form"
        aria-label="Project intake form"
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-8"
      >

        {/* ── Row 1: Name + Email (2-col on md+) ─────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FieldLabel htmlFor="if-name">Name</FieldLabel>
            <input
              id="if-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="[ Your full name ]"
              value={form.name}
              onChange={handleField}
              aria-describedby={errors.name ? 'if-name-err' : undefined}
              aria-invalid={!!errors.name}
              className={inputClass}
            />
            <FieldError id="if-name-err" message={errors.name} />
          </div>

          <div>
            <FieldLabel htmlFor="if-email">Email</FieldLabel>
            <input
              id="if-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="[ your@email.com ]"
              value={form.email}
              onChange={handleField}
              aria-describedby={errors.email ? 'if-email-err' : undefined}
              aria-invalid={!!errors.email}
              className={inputClass}
            />
            <FieldError id="if-email-err" message={errors.email} />
          </div>
        </div>

        {/* ── Textarea ─────────────────────────────────────── */}
        <div>
          <FieldLabel htmlFor="if-message">Describe your space / project</FieldLabel>
          <textarea
            id="if-message"
            name="message"
            rows={5}
            placeholder="[ Describe the space — size, style aspirations, budget range, timeline… ]"
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
            {PROJECT_TYPES.map(({ id, label }) => (
              <ProjectCheckbox
                key={id}
                id={id}
                label={label}
                checked={form.projectTypes.includes(label)}
                onChange={() => toggleType(label)}
              />
            ))}
          </div>
        </fieldset>

        {/* ── Divider before submit ─────────────────────────── */}
        <hr className="border-0 border-t border-line" aria-hidden="true" />

        {/* ── Submit ───────────────────────────────────────── */}
        <button
          id="intake-submit"
          type="submit"
          className="
            w-full py-4 px-6
            bg-amber text-cream
            text-xs tracking-[0.22em] uppercase font-semibold
            border border-amber
            transition-colors duration-200
            hover:bg-ink hover:border-ink
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-amber focus-visible:ring-offset-2
            focus-visible:ring-offset-cream
          "
        >
          [ Submit Project Brief ]
        </button>

        <p className="text-center text-xs text-ink-soft/50 -mt-4">
          [ Response time disclaimer placeholder — e.g. we reply within 48 hours. ]
        </p>

      </form>
    </div>
  )
}
