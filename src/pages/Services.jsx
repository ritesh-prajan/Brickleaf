import SectionDivider from '../components/ui/SectionDivider'

const SERVICES = [
  { id: 's1', label: 'New Interior Design' },
  { id: 's2', label: 'Renovation & Revamp' },
  { id: 's3', label: 'Concept & Moodboarding' },
  { id: 's4', label: 'Furniture Curation' },
]

export default function Services() {
  return (
    <>

      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6 gap-10">
        {/* Page name */}
        <p className="text-xs tracking-[0.3em] uppercase text-sand font-medium">
          What We Offer
        </p>
        <h1 className="font-display text-6xl md:text-8xl text-ink font-light leading-none">
          Services
        </h1>

        <SectionDivider className="w-16 border-sand" />

        {/* Simple service list */}
        <ul className="flex flex-col items-center gap-4 list-none m-0 p-0 w-full max-w-sm">
          {SERVICES.map(({ id, label }) => (
            <li
              key={id}
              className="
                w-full border border-line px-6 py-4
                text-sm text-ink-soft tracking-wide
                hover:border-amber hover:text-ink
                transition-colors duration-200 cursor-default
              "
            >
              {label}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
