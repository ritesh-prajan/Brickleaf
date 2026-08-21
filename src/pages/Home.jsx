import SignatureScrollHero from '../components/SignatureScrollHero/SignatureScrollHero'

/**
 * Home — Immersive Fullscreen Room Transformation Homepage
 *
 * The room experience IS the entire homepage.
 * Fixed header above, full-screen room filling the viewport, controlled entirely by scroll.
 */
export default function Home() {
  return (
    <div className="w-full">
      <SignatureScrollHero />
    </div>
  )
}
