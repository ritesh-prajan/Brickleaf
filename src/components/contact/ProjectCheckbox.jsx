/**
 * ProjectCheckbox — a single styled checkbox option for the
 * "I'm interested in…" project-type grid.
 *
 * Props:
 *   id        → unique id (bound to <label htmlFor>)
 *   label     → visible option text
 *   checked   → controlled checked state
 *   onChange  → toggle handler
 */
export default function ProjectCheckbox({ id, label, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className={`
        flex items-center gap-3 px-4 py-3 cursor-pointer
        border transition-colors duration-150 select-none
        ${checked
          ? 'border-amber bg-amber/8 text-ink'
          : 'border-line text-ink-soft hover:border-sand hover:text-ink'
        }
      `}
    >
      {/* Visually hidden native checkbox (still focusable / keyboard operable) */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />

      {/* Custom tick box */}
      <span
        aria-hidden="true"
        className={`
          flex-shrink-0 w-3.5 h-3.5 border transition-colors duration-150
          flex items-center justify-center
          ${checked ? 'border-amber bg-amber' : 'border-line bg-transparent'}
        `}
      >
        {checked && (
          /* Minimal check mark */
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
            <polyline
              points="1,3 3,5 7,1"
              stroke="#E8E0D8"
              strokeWidth="1.25"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        )}
      </span>

      <span className="text-xs tracking-[0.12em] uppercase font-medium leading-none">
        {label}
      </span>
    </label>
  )
}
