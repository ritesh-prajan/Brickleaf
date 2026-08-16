/**
 * PageBanner — top hero strip shared by Services and Contact pages.
 *
 * Props:
 *   eyebrow   → small uppercase label
 *   title     → main heading
 *   subtitle  → supporting line of text
 */
import PlaceholderBlock from '../ui/PlaceholderBlock'
import Eyebrow from '../ui/Eyebrow'

export default function PageBanner({ eyebrow, title, subtitle }) {
  return (
    <div className="relative h-72 md:h-96 w-full overflow-hidden">
      <PlaceholderBlock
        label="Page Banner Image"
        className="absolute inset-0 h-full w-full"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/60" />
      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-3">
        <Eyebrow className="text-sand">{eyebrow}</Eyebrow>
        <h1 className="font-display text-4xl md:text-6xl text-cream leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-cream/70 text-sm md:text-base max-w-xl">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
