/**
 * PanelDivider — vertical rule with an architectural plan-mark crosshair
 * at its vertical midpoint. Visible only on desktop (lg+).
 *
 * The crosshair is an inline SVG — no icon-library dependency.
 */

function CrosshairIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className="text-sand flex-shrink-0"
    >
      {/* Outer circle */}
      <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="0.75" />
      {/* Inner dot */}
      <circle cx="11" cy="11" r="1.25" fill="currentColor" />
      {/* Top tick */}
      <line x1="11" y1="0"  x2="11" y2="4.75" stroke="currentColor" strokeWidth="0.75" />
      {/* Bottom tick */}
      <line x1="11" y1="17.25" x2="11" y2="22" stroke="currentColor" strokeWidth="0.75" />
      {/* Left tick */}
      <line x1="0"  y1="11" x2="4.75" y2="11" stroke="currentColor" strokeWidth="0.75" />
      {/* Right tick */}
      <line x1="17.25" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}

export default function PanelDivider() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex flex-col items-center flex-none w-px"
    >
      {/* Top half of the rule */}
      <div className="flex-1 w-px bg-line/50" />
      {/* Crosshair sits at the exact midpoint, overlapping the line */}
      <div className="-mx-[10px] z-10 bg-cream py-3">
        <CrosshairIcon />
      </div>
      {/* Bottom half of the rule */}
      <div className="flex-1 w-px bg-line/50" />
    </div>
  )
}
