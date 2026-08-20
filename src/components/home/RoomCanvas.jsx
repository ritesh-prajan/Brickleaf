/**
 * RoomCanvas — Procedural vector room illustration that transforms
 * continuously based on the scroll `progress` (0.0 to 1.0).
 *
 * Sequence steps:
 * 0.00 -> 0.20: Empty, dim monochrome architectural frame
 * 0.20 -> 0.40: Wall colors, plaster texture, & wainscoting paneling apply
 * 0.40 -> 0.60: Textured luxury rug unrolls dynamically onto floor
 * 0.60 -> 0.80: Furniture (sofa, coffee table, art) slide & assemble
 * 0.80 -> 1.00: Pendant light lowers, illuminates room with warm ambient glow
 */

export default function RoomCanvas({ progress = 0 }) {
  // Calculate sub-stage progress values (each clamped 0..1)
  const wallProgress = Math.min(Math.max((progress - 0.1) / 0.25, 0), 1)
  const rugProgress  = Math.min(Math.max((progress - 0.35) / 0.25, 0), 1)
  const furnProgress = Math.min(Math.max((progress - 0.55) / 0.25, 0), 1)
  const lightProgress= Math.min(Math.max((progress - 0.75) / 0.25, 0), 1)

  // Camera scale: subtle 1.0 to 1.05 slow zoom
  const cameraScale = 1 + progress * 0.05

  return (
    <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] mx-auto rounded-lg overflow-hidden border border-line/40 shadow-2xl transition-all duration-300">
      <div
        className="w-full h-full relative transition-transform duration-100 ease-out"
        style={{ transform: `scale(${cameraScale})` }}
      >
        <svg
          viewBox="0 0 1200 675"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-cream)" stopOpacity={0.4 + wallProgress * 0.5} />
              <stop offset="100%" stopColor="var(--color-sand)" stopOpacity={0.2 + wallProgress * 0.4} />
            </linearGradient>

            <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-line)" stopOpacity={0.3 + wallProgress * 0.4} />
              <stop offset="100%" stopColor="var(--color-sand)" stopOpacity={0.4 + wallProgress * 0.5} />
            </linearGradient>

            <radialGradient id="lightBloom" cx="50%" cy="25%" r="60%">
              <stop offset="0%" stopColor="var(--color-amber)" stopOpacity={lightProgress * 0.75} />
              <stop offset="40%" stopColor="var(--color-sand)" stopOpacity={lightProgress * 0.35} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="rugGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-sand)" />
              <stop offset="50%" stopColor="var(--color-cream)" />
              <stop offset="100%" stopColor="var(--color-amber)" />
            </linearGradient>

            {/* Pattern for floor wood grid */}
            <pattern id="floorPlanks" width="60" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 20 L 60 20 M 30 0 L 30 20" fill="none" stroke="var(--color-line)" strokeWidth="0.75" opacity="0.4" />
            </pattern>
          </defs>

          {/* 1. ROOM SHELL & WALLS */}
          {/* Base Background (Dim at start) */}
          <rect width="1200" height="675" fill="var(--color-ink)" opacity={0.85 - lightProgress * 0.4} />

          {/* Back Wall */}
          <rect
            x="200"
            y="100"
            width="800"
            height="400"
            fill="url(#wallGrad)"
            stroke="var(--color-line)"
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />

          {/* Left Wall Perspective */}
          <polygon
            points="0,0 200,100 200,500 0,675"
            fill="var(--color-sand)"
            opacity={0.15 + wallProgress * 0.3}
            stroke="var(--color-line)"
            strokeWidth="1"
          />

          {/* Right Wall Perspective */}
          <polygon
            points="1200,0 1000,100 1000,500 1200,675"
            fill="var(--color-sand)"
            opacity={0.15 + wallProgress * 0.3}
            stroke="var(--color-line)"
            strokeWidth="1"
          />

          {/* Ceiling Perspective */}
          <polygon
            points="0,0 1200,0 1000,100 200,100"
            fill="var(--color-cream)"
            opacity={0.2 + wallProgress * 0.2}
            stroke="var(--color-line)"
            strokeWidth="1"
          />

          {/* Architectural Wall Moldings (Fade in with Wall Progress) */}
          <g opacity={wallProgress}>
            {/* Left Wall Molding Box */}
            <rect x="250" y="140" width="180" height="260" fill="none" stroke="var(--color-sand)" strokeWidth="1.5" opacity="0.6" />
            {/* Center Wall Accent Recess */}
            <rect x="470" y="140" width="260" height="260" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" opacity="0.5" />
            {/* Right Wall Molding Box */}
            <rect x="770" y="140" width="180" height="260" fill="none" stroke="var(--color-sand)" strokeWidth="1.5" opacity="0.6" />
            {/* Baseboard Line */}
            <line x1="200" y1="500" x2="1000" y2="500" stroke="var(--color-ink-soft)" strokeWidth="3" opacity="0.7" />
          </g>

          {/* 2. FLOOR & RUG */}
          {/* Floor Polygon */}
          <polygon
            points="200,500 1000,500 1200,675 0,675"
            fill="url(#floorGrad)"
            stroke="var(--color-line)"
            strokeWidth="1"
          />
          {/* Floor Plank Pattern Layer */}
          <polygon
            points="200,500 1000,500 1200,675 0,675"
            fill="url(#floorPlanks)"
            opacity={0.3 + wallProgress * 0.4}
          />

          {/* Luxury Area Rug (Unrolls forward as rugProgress increases) */}
          {rugProgress > 0 && (
            <g transform={`translate(0, ${(1 - rugProgress) * 60})`} opacity={rugProgress}>
              {/* Rug Shadow */}
              <polygon
                points="360,540 840,540 920,640 280,640"
                fill="var(--color-ink)"
                opacity={0.2 * rugProgress}
              />
              {/* Rug Body */}
              <polygon
                points="370,535 830,535 910,635 290,635"
                fill="url(#rugGrad)"
                stroke="var(--color-amber)"
                strokeWidth="1.5"
                opacity={0.85 * rugProgress}
              />
              {/* Rug Texture Fringes / Inner Pattern */}
              <polygon
                points="400,545 800,545 860,625 340,625"
                fill="none"
                stroke="var(--color-cream)"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity={0.7 * rugProgress}
              />
            </g>
          )}

          {/* 3. FURNITURE ASSEMBLY */}
          {furnProgress > 0 && (
            <g opacity={furnProgress}>
              {/* Wall Art Frame (Lowers from top) */}
              <g transform={`translate(0, ${(1 - furnProgress) * -30})`}>
                <rect x="520" y="170" width="160" height="180" fill="var(--color-cream)" stroke="var(--color-ink)" strokeWidth="3" />
                <rect x="535" y="185" width="130" height="150" fill="var(--color-sand)" opacity="0.3" />
                {/* Minimalist Abstract Art Graphic */}
                <circle cx="580" cy="250" r="35" fill="var(--color-amber)" opacity="0.6" />
                <line x1="550" y1="280" x2="630" y2="210" stroke="var(--color-ink)" strokeWidth="2" />
              </g>

              {/* Luxury Sofa (Slides in from left) */}
              <g transform={`translate(${(1 - furnProgress) * -80}, 0)`}>
                {/* Sofa Shadow */}
                <ellipse cx="600" cy="575" rx="220" ry="25" fill="var(--color-ink)" opacity="0.25" />
                {/* Sofa Backrest */}
                <rect x="400" y="440" width="400" height="90" rx="16" fill="var(--color-ink)" stroke="var(--color-line)" strokeWidth="1" />
                {/* Sofa Cushions */}
                <rect x="415" y="485" width="180" height="60" rx="10" fill="var(--color-ink-soft)" stroke="var(--color-line)" strokeWidth="1" />
                <rect x="605" y="485" width="180" height="60" rx="10" fill="var(--color-ink-soft)" stroke="var(--color-line)" strokeWidth="1" />
                {/* Armrests */}
                <rect x="385" y="465" width="35" height="85" rx="8" fill="var(--color-sand)" />
                <rect x="780" y="465" width="35" height="85" rx="8" fill="var(--color-sand)" />
                {/* Throw Pillows */}
                <rect x="425" y="460" width="45" height="45" rx="6" fill="var(--color-amber)" transform="rotate(-8 425 460)" />
                <rect x="730" y="460" width="45" height="45" rx="6" fill="var(--color-cream)" transform="rotate(10 730 460)" />
              </g>

              {/* Sculptural Coffee Table (Slides in from right/bottom) */}
              <g transform={`translate(${(1 - furnProgress) * 60}, ${(1 - furnProgress) * 30})`}>
                {/* Table Shadow */}
                <ellipse cx="600" cy="605" rx="110" ry="16" fill="var(--color-ink)" opacity="0.3" />
                {/* Table Legs */}
                <rect x="520" y="580" width="10" height="25" fill="var(--color-amber)" />
                <rect x="670" y="580" width="10" height="25" fill="var(--color-amber)" />
                {/* Table Top (Marble Oval) */}
                <ellipse cx="600" cy="578" rx="120" ry="22" fill="var(--color-cream)" stroke="var(--color-amber)" strokeWidth="2" />
                {/* Decorative Vase & Magazine on Table */}
                <ellipse cx="570" cy="570" rx="10" ry="14" fill="var(--color-amber)" />
                <rect x="620" y="568" width="30" height="15" fill="var(--color-sand)" transform="rotate(-15 620 568)" />
              </g>
            </g>
          )}

          {/* 4. LIGHTING & AMBIENT WARMTH */}
          {/* Pendant Light Cable & Fixture (Lowers from ceiling) */}
          <g transform={`translate(0, ${(1 - Math.max(lightProgress, 0)) * -50})`}>
            {/* Cable */}
            <line x1="600" y1="100" x2="600" y2="210" stroke="var(--color-amber)" strokeWidth="2" />
            {/* Brass Fixture Shade */}
            <path d="M 560 235 Q 600 205 640 235 Z" fill="var(--color-amber)" stroke="var(--color-cream)" strokeWidth="1" />
            {/* Bulb Glow Point */}
            <circle cx="600" cy="235" r="8" fill="var(--color-cream)" opacity={0.5 + lightProgress * 0.5} />
            {/* Outer Light Flare Circle */}
            {lightProgress > 0 && (
              <circle cx="600" cy="235" r="24" fill="var(--color-amber)" opacity={lightProgress * 0.6} />
            )}
          </g>

          {/* Light Bloom Wash (Covers entire room) */}
          <rect x="0" y="0" width="1200" height="675" fill="url(#lightBloom)" pointerEvents="none" />

          {/* Blueprint Grid Lines Overlay at start (Fades away as progress completes) */}
          <g opacity={1 - progress * 0.9} pointerEvents="none">
            <line x1="200" y1="0" x2="200" y2="675" stroke="var(--color-amber)" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.4" />
            <line x1="1000" y1="0" x2="1000" y2="675" stroke="var(--color-amber)" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.4" />
            <line x1="0" y1="500" x2="1200" y2="500" stroke="var(--color-amber)" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.4" />
          </g>
        </svg>
      </div>
    </div>
  )
}
