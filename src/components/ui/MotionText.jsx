import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * HeadlineReveal — "Type as terrain: Headlines rotate in from 90° with horizontal offset"
 * Reversible on scroll up and down.
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          x: '4rem',
          rotation: 65,
          transformOrigin: '0% 100%',
        },
        {
          opacity: 1,
          x: '0rem',
          rotation: 0,
          stagger: 0.025,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse', // symmetrical entry & exit
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  // Split string into characters wrapped in inline-block spans
  const renderChars = (text) => {
    if (typeof text !== 'string') return text
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="char-unit inline-block will-change-transform whitespace-pre"
      >
        {char}
      </span>
    ))
  }

  return (
    <Tag ref={containerRef} className={`overflow-hidden ${className}`}>
      {renderChars(children)}
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
          rotationY: 85,
          transformOrigin: '50% 50% -30px',
        },
        {
          opacity: 1,
          rotationY: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
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
 * LineMaskRise — "Body paragraphs rise from behind a mask, like a blind lifting"
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
          y: '2rem',
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
 * WordSpacingStretch — "Animates word-spacing pulling apart on scroll"
 */
export function WordSpacingStretch({
  children,
  className = '',
}) {
  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { wordSpacing: '0.05em', letterSpacing: '0.05em' },
        {
          wordSpacing: '0.35em',
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
    <div ref={elRef} className={`will-change-[word-spacing,letter-spacing] ${className}`}>
      {children}
    </div>
  )
}
