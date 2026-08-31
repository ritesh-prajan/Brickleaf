import SignatureScrollHero from '../components/SignatureScrollHero/SignatureScrollHero'
import BeforeAfterSection from '../components/transformation/BeforeAfterSection'

/**
 * Home — Flagship Homepage
 *
 * 1. SignatureScrollHero: Fullscreen interactive scroll-driven interior build sequence.
 * 2. BeforeAfterSection: Interactive editorial slider comparing real before & after transformations.
 */
export default function Home() {
  return (
    <div className="w-full">
      {/* ── 1. Flagship Immersive Scroll Transformation Hero ── */}
      <SignatureScrollHero />

      {/* ── 2. Editorial Before/After Transformation Section ── */}
      <BeforeAfterSection />
    </div>
  )
}
