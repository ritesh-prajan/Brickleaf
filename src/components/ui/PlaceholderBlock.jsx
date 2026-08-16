/**
 * PlaceholderBlock — labeled grey box that stands in for any image or media.
 *
 * Props:
 *   label      → text displayed inside
 *   className  → Tailwind sizing classes (e.g. "h-80 w-full")
 *   aspect     → optional aspect-ratio utility class, overrides default
 */
export default function PlaceholderBlock({ label = 'Image Placeholder', className = '', aspect = '' }) {
  return (
    <div
      aria-label={label}
      role="img"
      className={`
        flex items-center justify-center
        bg-line border border-sand
        text-ink-soft text-xs font-medium tracking-widest uppercase
        select-none
        ${aspect}
        ${className}
      `}
    >
      <span className="px-4 text-center leading-relaxed">{label}</span>
    </div>
  )
}
