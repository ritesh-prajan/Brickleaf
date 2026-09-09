import { useState, useEffect } from 'react'

export default function ArchPreloader() {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('brickleaf_preloader_seen')
    const totalDuration = hasSeen ? 400 : 1800

    let start = performance.now()

    // Non-linear organic surge curve
    const interval = setInterval(() => {
      const elapsed = performance.now() - start
      const frac = Math.min(elapsed / totalDuration, 1)

      // Eased progress (surges, pauses around 70%, then completes)
      let calculatedProgress
      if (frac < 0.4) {
        calculatedProgress = frac * 2 * 45
      } else if (frac < 0.75) {
        calculatedProgress = 45 + (frac - 0.4) * 75
      } else {
        calculatedProgress = 72 + (frac - 0.75) * 4 * 28
      }

      const p = Math.min(Math.round(calculatedProgress), 100)
      setProgress(p)

      if (frac >= 1) {
        clearInterval(interval)
        setProgress(100)
        sessionStorage.setItem('brickleaf_preloader_seen', 'true')

        // Start arch lift exit
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => {
            setIsDone(true)
          }, 800)
        }, 200)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [])

  if (isDone) return null

  return (
    <div
      aria-hidden="true"
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-cream select-none
        transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]
        ${isExiting ? '-translate-y-full opacity-95 rounded-b-[60px]' : 'translate-y-0 opacity-100'}
      `}
    >
      {/* Central Assembly Chamber */}
      <div className="relative flex flex-col items-center gap-6 max-w-sm px-6 text-center">

        {/* Minimalist Arch Silhouette Outline */}
        <div className="relative w-24 h-36 border border-sand/40 rounded-t-full flex items-center justify-center overflow-hidden mb-2">
          {/* Internal Filling Water Level */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-amber/20 transition-all duration-200"
            style={{ height: `${progress}%` }}
          />

          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 text-amber fill-amber/20 stroke-amber relative z-10 animate-pulse"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C8.5 7 7.5 12 10.5 16.5C12 18.8 14 20.5 15.5 22C16.5 20.5 17.5 18 17.5 14.5C17.5 9 15 4 12 2Z" />
            <path d="M12 2C13 8 14 14 15.5 22" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Assembling Lettermark */}
        <div className="space-y-1">
          <span className="font-display text-2xl sm:text-3xl font-light tracking-[0.35em] uppercase text-cream block pl-[0.35em]">
            Brickleaf
          </span>
          <span className="text-[10px] tracking-[0.28em] uppercase text-sand font-medium block">
            Architecture &amp; Interiors
          </span>
        </div>

        {/* Non-Linear Progress Metric */}
        <div className="w-48 space-y-2 pt-2">
          <div className="w-full h-0.5 bg-cream/20 overflow-hidden relative">
            <div
              className="h-full bg-amber transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-[9px] font-mono tracking-widest text-cream/60">
            <span>DISCOVERY</span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  )
}
