/**
 * useTheme — manages the active theme token.
 *
 * Sets `data-theme` on <html> so CSS variable overrides in index.css
 * cascade through every Tailwind utility automatically.
 *
 * The "warm" theme is the default — no attribute is set on <html>
 * so the @theme block values apply unchanged.
 *
 * Returns:
 *   theme     — current theme key ('warm' | 'azure' | 'carbon')
 *   setTheme  — setter
 *   themes    — ordered array of theme descriptor objects
 */
import { useState, useEffect } from 'react'

export const THEMES = [
  {
    key:    'warm',
    label:  'Warm',
    swatch: '#B8956A',
    on:     '#2C2520',
  },
  {
    key:    'azure',
    label:  'Azure',
    swatch: '#EA580C',
    on:     '#F6F8FF',
  },
  {
    key:    'carbon',
    label:  'Carbon',
    swatch: '#2B63D9',
    on:     '#EBEEF4',
  },
  {
    key:    'noir',
    label:  'Noir',
    swatch: '#C8922A',
    on:     '#0D0B08',
  },
]

const STORAGE_KEY = 'bl-theme'

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'warm'
    } catch {
      return 'warm'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'warm') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
    try { localStorage.setItem(STORAGE_KEY, theme) } catch { /* noop */ }
  }, [theme])

  /** Cycles to the next theme in order */
  function cycleTheme() {
    setThemeState(prev => {
      const idx = THEMES.findIndex(t => t.key === prev)
      return THEMES[(idx + 1) % THEMES.length].key
    })
  }

  return {
    theme,
    setTheme: setThemeState,
    cycleTheme,
    themes: THEMES,
    current: THEMES.find(t => t.key === theme) ?? THEMES[0],
  }
}
