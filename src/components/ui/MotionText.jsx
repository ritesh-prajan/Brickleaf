import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * HeadlineReveal — "Type as terrain: Headlines rotate in from 90° with horizontal offset"
 * Reversible on scroll up and down.
 *
 * Mobile-Optimized: Wraps each word in a whitespace-nowrap span so words wrap
 * naturally on narrow mobile screens (320px-430px) without breaking words mid-character.
 */
export function HeadlineReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chars = el.querySelectorAll('.char-unit')
    if (!chars.length) return

    const isMobile = window.innerWidth < 640
    const xOffset = isMobile ? '1.8rem' : '3.5rem'

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          x: xOffset,
          rotation: 55,
          transformOrigin: '0% 100%',
        },
        {
          opacity: 1,
          x: '0rem',
          rotation: 0,
          stagger: 0.02,
          duration: 0.85,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse', // symmetrical entry & exit
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [delay])

  // Split string by words first, then characters, preserving natural word wraps on mobile
  const renderWordSafeChars = (text) => {
    if (typeof text !== 'string') return text
    const words = text.split(' ')

    return words.map((word, wordIdx) => (
      <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
        {word.split('').map((char, charIdx) => (
          <span
            key={charIdx}
            className="char-unit inline-block will-change-transform"
          >
            {char}
          </span>
        ))}
      </span>
    ))
  }

  return (
    <Tag ref={containerRef} className={`overflow-hidden ${className}`}>
      {renderWordSafeChars(children)}
    </Tag>
  )
}

/**
 * SubheadingFlip — "Sub-headings split into words and flip in on the Y-axis"
 */
export function SubheadingFlip({
  children,
  as: Tag = 'h3',
  className = '',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.word-flip-unit')
    if (!words.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0,
          rotationY: 75,
          transformOrigin: '50% 50% -20px',
        },
        {
          opacity: 1,
          rotationY: 0,
          stagger: 0.035,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const renderWords = (text) => {
    if (typeof text !== 'string') return text
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        className="word-flip-unit inline-block mr-[0.3em] will-change-transform"
        style={{ perspective: 600 }}
      >
        {word}
      </span>
    ))
  }

  return (
    <Tag ref={containerRef} className={className}>
      {renderWords(children)}
    </Tag>
  )
}

/**
 * LineMaskRise — "Body paragraphs rise from behind an expanding mask"
 */
export function LineMaskRise({
  children,
  as: Tag = 'p',
  className = '',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0.1,
          y: '1.5rem',
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          opacity: 1,
          y: '0rem',
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  )
}

/**
 * WordSpacingStretch — "Word and letter spacing expands on scroll"
 */
export function WordSpacingStretch({
  children,
  as: Tag = 'p',
  className = '',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const isMobile = window.innerWidth < 640
    const maxWordSpacing = isMobile ? '0.18em' : '0.35em'

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          wordSpacing: '0.04em',
          letterSpacing: '0.06em',
        },
        {
          wordSpacing: maxWordSpacing,
          letterSpacing: '0.12em',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  )
}