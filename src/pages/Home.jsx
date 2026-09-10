import SignatureScrollHero from '../components/SignatureScrollHero/SignatureScrollHero'
import BeforeAfterSection from '../components/transformation/BeforeAfterSection'

export default function Home() {
  return (
    <div className="w-full">
      <div data-bg="dark">
        <SignatureScrollHero />
      </div>
      <div data-bg="light">
        <BeforeAfterSection />
      </div>
    </div>
  )
}
