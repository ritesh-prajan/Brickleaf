/**
 * CtaBanner — shared closing call-to-action strip used at the bottom of pages.
 *
 * Props:
 *   eyebrow  → small label above heading
 *   heading  → main headline text
 *   primary  → label for primary button
 *   secondary → label for outline button (optional)
 *   onPrimary / onSecondary → click handlers
 */
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'

export default function CtaBanner({
  eyebrow = 'Start Your Project',
  heading = "Let\u2019s Create Something Extraordinary",
  primary = 'Book a Consultation',
  secondary = 'View Services',
  onPrimary,
  onSecondary,
}) {
  return (
    <section className="bg-ink py-24 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <Eyebrow className="text-sand">{eyebrow}</Eyebrow>
        <h2
          className="font-display text-4xl md:text-5xl text-cream leading-tight"
        >
          {heading}
        </h2>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <Button variant="primary" onClick={onPrimary}>{primary}</Button>
          {secondary && (
            <Button variant="outline" className="border-sand text-sand hover:bg-sand hover:text-ink" onClick={onSecondary}>
              {secondary}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
