/**
 * LeftPanel — dark (bg-ink) side of the contact split.
 *
 * Composition (top → bottom):
 *   ┌─────────────────────────────────────────┐
 *   │  Interior image placeholder             │
 *   │                                         │
 *   │  [ Eyebrow label ]                      │
 *   │  [Large serif headline placeholder]     │
 *   │  [Supporting line placeholder]          │
 *   │                                         │
 *   │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │  ← pinned to bottom
 *   │  hello@brickleaf.co                     │
 *   │  Instagram · Pinterest · LinkedIn       │
 *   └─────────────────────────────────────────┘
 */
import PlaceholderBlock from '../ui/PlaceholderBlock'
import Eyebrow from '../ui/Eyebrow'

const SOCIALS = ['Instagram', 'Pinterest', 'LinkedIn']

export default function LeftPanel() {
  return (
    <div className="flex flex-col bg-ink text-cream w-full lg:w-[42%] lg:min-h-[90vh]">

      {/* ── Image block ─────────────────────────────────────── */}
      <PlaceholderBlock
        label="Interior / Room Image Placeholder"
        className="w-full h-56 md:h-72 lg:h-[44%] flex-none border-0 bg-ink-soft/20"
      />

      {/* ── Text content + pinned footer ────────────────────── */}
      <div className="flex flex-col flex-1 px-10 pt-10 pb-12 lg:px-14 lg:pt-12 lg:pb-14">

        {/* Main copy block */}
        <div className="space-y-5">
          <Eyebrow className="text-sand">[ Eyebrow Label ]</Eyebrow>

          <h2 className="font-display text-4xl lg:text-[2.75rem] xl:text-5xl text-cream font-light leading-[1.12] max-w-sm">
            [Let&rsquo;s design your next space]
          </h2>

          <p className="text-cream/55 text-sm leading-relaxed max-w-xs">
            [Short supporting line placeholder — one sentence that
            sets the emotional tone for reaching out.]
          </p>
        </div>

        {/* ── Pinned contact/social row ────────────────────── */}
        <div className="mt-auto pt-12 space-y-5 border-t border-line/20">

          {/* Email */}
          <a
            href="mailto:hello@brickleaf.co"
            className="
              block text-sm text-sand/80 hover:text-cream
              transition-colors duration-200 tracking-wide
            "
          >
            hello@brickleaf.co
          </a>

          {/* Social links */}
          <div className="flex flex-wrap gap-5">
            {SOCIALS.map((name) => (
              <a
                key={name}
                href="#"
                aria-label={`${name} — placeholder link`}
                className="
                  text-xs tracking-[0.18em] uppercase text-cream/35
                  hover:text-sand transition-colors duration-200
                "
              >
                {name}
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
