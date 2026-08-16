/**
 * ThemeSwitcher — compact inline picker mounted inside the Navbar.
 *
 * Renders three labelled swatch buttons. Active theme has an amber
 * underline accent. Swatches show the theme's accent colour.
 *
 * Props:
 *   theme    — current theme key
 *   themes   — THEMES array from useTheme
 *   setTheme — setter from useTheme
 */
export default function ThemeSwitcher({ theme, themes, setTheme }) {
  return (
    <div
      role="group"
      aria-label="Choose colour theme"
      className="flex items-center gap-1"
    >
      {themes.map((t) => {
        const isActive = t.key === theme
        return (
          <button
            key={t.key}
            id={`theme-btn-${t.key}`}
            type="button"
            aria-pressed={isActive}
            aria-label={`Switch to ${t.label} theme`}
            onClick={() => setTheme(t.key)}
            className={`
              group relative flex items-center gap-1.5
              px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold
              border transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-amber focus-visible:ring-offset-1
              focus-visible:ring-offset-cream
              ${isActive
                ? 'border-amber text-ink'
                : 'border-transparent text-ink-soft hover:text-ink hover:border-line'
              }
            `}
          >
            {/* Accent colour dot */}
            <span
              aria-hidden="true"
              className="w-2 h-2 flex-shrink-0 rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: t.swatch }}
            />
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
