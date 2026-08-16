/**
 * SectionDivider — a thin horizontal rule using the `line` design token.
 *
 * Props:
 *   className → extra spacing utilities
 */
export default function SectionDivider({ className = '' }) {
  return (
    <hr
      aria-hidden="true"
      className={`border-0 border-t border-line ${className}`}
    />
  )
}
