import { useState, useRef, useCallback } from 'react'

/**
 * BeforeAfterComparison — High-precision interactive dual-layer comparison.
 *
 * Fully Mobile-Optimized:
 * - Pointer events (mouse & touch) with setPointerCapture for smooth dragging.
 * - Aspect ratio adapts from aspect-[4/3] on mobile to aspect-[16/10] on tablet/desktop.
 * - Touch-friendly 44x44px interactive handle area.
 * - Keyboard accessible slider (Arrow keys / Home / End).
 */
export default function BeforeAfterComparison({
  beforeImage = '/transformations/living-room-before.webp',
  afterImage = '/transformations/living-room-after.webp',
  beforeLabel = 'Existing Space',
  afterLabel = 'Brickleaf Completed',
  aspectRatio = 'aspect-[4/3] sm:aspect-[16/10]',
  initialPosition = 50,
}) {
  const [sliderPos, setSliderPos] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  // Calculate position from pointer event
  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  // Pointer Down
  const handlePointerDown = (e) => {
    setIsDragging(true)
    updatePosition(e.clientX)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // fallback
    }
  }

  // Pointer Move
  const handlePointerMove = (e) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }

  // Pointer Up / Cancel
  const handlePointerUp = (e) => {
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // fallback
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      setSliderPos((prev) => Math.max(0, prev - step))
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      setSliderPos((prev) => Math.min(100, prev + step))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setSliderPos(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setSliderPos(100)
    }
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Before and After transformation slider"
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(sliderPos)}% existing space visible`}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`
        relative w-full ${aspectRatio} overflow-hidden select-none cursor-ew-resize
        outline-none focus-visible:ring-1 focus-visible:ring-amber
        border border-line/40 shadow-2xl bg-ink/90
      `}
      style={{ touchAction: 'pan-y' }}
    >
      {/* ── 1. BASE LAYER: AFTER IMAGE (BRICKLEAF INTERIOR) ── */}
      <img
        src={afterImage}
        alt="Brickleaf redesigned luxury interior with bespoke wood millwork, architectural cove lighting, and modern furnishings"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* ── 2. TOP LAYER: BEFORE IMAGE (EXISTING SPACE) WITH GPU CLIP-PATH ── */}
      <img
        src={beforeImage}
        alt="Original existing interior space before Brickleaf transformation"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* ── 3. LABELS: REFINED EDITORIAL OVERLAYS ── */}
      <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20 pointer-events-none">
        <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-ink/75 backdrop-blur-md text-cream/90 text-[9px] sm:text-[10px] tracking-[0.20em] uppercase font-medium border border-cream/10 rounded-[2px] shadow-sm">
          {beforeLabel}
        </span>
      </div>

      <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 pointer-events-none">
        <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-ink/75 backdrop-blur-md text-sand text-[9px] sm:text-[10px] tracking-[0.20em] uppercase font-medium border border-cream/10 rounded-[2px] shadow-sm">
          {afterLabel}
        </span>
      </div>

      {/* ── 4. VERTICAL DRAGGABLE 1PX DIVIDER & REFINED LUXURY HANDLE ── */}
      <div
        className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center -translate-x-1/2"
        style={{ left: `${sliderPos}%` }}
      >
        {/* 1px Vertical Divider Line */}
        <div className="w-[1.5px] h-full bg-cream/80 shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-colors duration-200" />

        {/* Minimal Luxury Central Handle (Min 44x44px touch target) */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2
            h-8 sm:h-9 px-3 sm:px-3.5 rounded-full
            bg-ink/90 backdrop-blur-md
            border border-sand/50
            shadow-[0_4px_20px_rgba(0,0,0,0.5)]
            flex items-center gap-1.5 sm:gap-2
            text-cream text-[9px] sm:text-[10px] tracking-widest font-mono
            transition-transform duration-200
            ${isDragging ? 'scale-110 border-amber ring-2 ring-amber/30' : 'hover:scale-105 hover:border-sand'}
          `}
        >
          <span className="text-sand/70 text-xs">‹</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber shadow-[0_0_6px_var(--color-amber)]" />
          <span className="text-sand/70 text-xs">›</span>
        </div>
      </div>
    </div>
  )
}