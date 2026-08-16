import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6 gap-8">
        {/* Page name */}
        <p className="text-xs tracking-[0.3em] uppercase text-sand font-medium">
          Welcome
        </p>
        <h1 className="font-display text-6xl md:text-8xl text-ink font-light leading-none">
          Home
        </h1>
        <p className="text-ink-soft text-sm max-w-xs leading-relaxed">
          A luxury interior design studio for new builds &amp; renovations.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" onClick={() => navigate('/services')}>
            Our Services
          </Button>
          <Button variant="outline" onClick={() => navigate('/contact')}>
            Get in Touch
          </Button>
        </div>
      </section>
    </>
  )
}
