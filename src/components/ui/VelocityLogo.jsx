import { useEffect, useRef } from 'react'

/**
 * VelocityLogo — "The logo that is always listening"
 *
 * Continuously rotates at a quiet resting rate.
 * As user scrolls, the spin speed accelerates proportionally to scroll velocity,
 * then smoothly decelerates back to resting speed via exponential decay.
 */
export default function VelocityLogo({ className = '' }) {
  const iconRef = useRef(null)
  const rotationRef = useRef(0)
  const currentSpeedRef = useRef(0.4) // resting base speed in deg/frame
  const lastScrollYRef = useRef(0)
  const targetVelocityRef = useRef(0)
  const rafIdRef = useRef(null)

  useEffect(() => {
    lastScrollYRef.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const deltaY = currentScrollY - lastScrollYRef.current
      lastScrollYRef.current = currentScrollY

      // Velocity magnitude + direction
      const scrollSpeed = Math.min(Math.abs(deltaY) * 0.4, 18) // capped
      const direction = deltaY >= 0 ? 1 : -1
      targetVelocityRef.current = scrollSpeed * direction
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const animate = () => {
      const BASE_SPEED = 0.45

      // Smoothly blend scroll velocity into rotation speed
      const targetSpeed = BASE_SPEED + targetVelocityRef.current
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.12

      // Apply rotation
      rotationRef.current = (rotationRef.current + currentSpeedRef.current) % 360

      if (iconRef.current) {
        iconRef.current.style.transform = `rotate(${rotationRef.current}deg)`
      }

      // Decay scroll velocity towards 0
      targetVelocityRef.current *= 0.9

      rafIdRef.current = requestAnimationFrame(animate)
    }

    rafIdRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Scroll-Reactive Spinning Leaf Mark */}
      <div
        ref={iconRef}
        className="w-5 h-5 flex items-center justify-center text-amber will-change-transform"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full fill-amber/20 stroke-amber"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Symmetrical Architectural Leaf / Flower Mark */}
          <path d="M12 2C8.5 7 7.5 12 10.5 16.5C12 18.8 14 20.5 15.5 22C16.5 20.5 17.5 18 17.5 14.5C17.5 9 15 4 12 2Z" />
          <path d="M12 2C13 8 14 14 15.5 22" strokeWidth="1.2" />
          <path d="M12.5 7.5L15 9" strokeWidth="1.2" />
          <path d="M13 11.5L16 13" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <span className="font-display text-xl font-medium text-ink tracking-tight transition-colors duration-200">
        Brickleaf
      </span>
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-amber inline-block mb-1" />
    </div>
  )
}
