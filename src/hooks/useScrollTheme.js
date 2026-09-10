import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useScrollTheme(navRef) {
  useEffect(() => {
    const nav = navRef?.current
    if (!nav) return
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('[data-bg]')
      if (!sections.length) return
      const triggers = []
      sections.forEach((section) => {
        const bg = section.getAttribute('data-bg')
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top+=64',
          end: 'bottom top+=64',
          onEnter: () => applyNavTheme(nav, bg),
          onLeave: () => applyNavTheme(nav, 'light'),
          onEnterBack: () => applyNavTheme(nav, bg),
          onLeaveBack: () => applyNavTheme(nav, 'light'),
        })
        triggers.push(trigger)
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [navRef])
}

function applyNavTheme(nav, bg) {
  if (bg === 'dark') {
    nav.classList.add('nav-dark')
    nav.classList.remove('nav-light')
  } else {
    nav.classList.add('nav-light')
    nav.classList.remove('nav-dark')
  }
}
