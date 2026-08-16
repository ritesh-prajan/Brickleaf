/**
 * Button — shared CTA component.
 *
 * variant:
 *   "primary"  → amber fill, cream text
 *   "outline"  → transparent, amber border + text
 *   "ghost"    → no border, amber text
 */
export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

  const variants = {
    primary:
      'bg-amber text-cream hover:bg-ink border border-amber hover:border-ink',
    outline:
      'border border-amber text-amber hover:bg-amber hover:text-cream',
    ghost:
      'text-amber hover:text-ink underline-offset-4 hover:underline',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
