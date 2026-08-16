/**
 * Eyebrow — small uppercase tracked label used above headings.
 *
 * Props:
 *   children  → label text
 *   className → extra utilities
 */
export default function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={`
        text-xs font-semibold tracking-[0.2em] uppercase text-sand
        ${className}
      `}
    >
      {children}
    </p>
  )
}
