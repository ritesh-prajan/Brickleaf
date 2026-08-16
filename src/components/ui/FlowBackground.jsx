/**
 * FlowBackground — three-layer animated gradient backdrop.
 *
 * Layer 1 — solid bg-cream base (always visible beneath)
 * Layer 2 — .flow-gradient-wrapper  (opacity: 0.65, mix-blend-mode: multiply)
 *              └─ .flow-gradient-wash  (pure sand/amber linear gradient,
 *                                       300% canvas, position animates)
 * Layer 3 — four radial orbs (pure theme colours, direct opacity, blur: 70px)
 *              A — top-left     sand   opacity 0.55  22s
 *              B — bottom-right amber  opacity 0.45  28s
 *              C — centre       ink    opacity 0.07  18s  (depth only)
 *              D — top-right    amber  opacity 0.28  25s  (counter-accent)
 *
 * All colours reference CSS custom properties so they update
 * automatically on theme switches.
 * All animation is gated behind prefers-reduced-motion in CSS.
 */
export default function FlowBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-cream"
    >
      {/* ── Layer 2: gradient wash (wrapped for blend + opacity) ── */}
      <div className="flow-gradient-wrapper">
        <div className="flow-gradient-wash" />
      </div>

      {/* ── Layer 3: drifting radial orbs ─────────────────────── */}
      <span className="flow-orb flow-orb-a" />
      <span className="flow-orb flow-orb-b" />
      <span className="flow-orb flow-orb-c" />
      <span className="flow-orb flow-orb-d" />
    </div>
  )
}
