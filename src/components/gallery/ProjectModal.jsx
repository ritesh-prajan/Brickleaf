import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import { sendViaWhatsApp } from '../../utils/whatsapp'

export default function ProjectModal({ project, onClose }) {
  const navigate = useNavigate()

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!project) return null

  const handleEnquire = () => {
    onClose()
    navigate('/contact', {
      state: {
        message: `I would like to enquire about a design project similar to "${project.title}" (${project.category}, ${project.location}).`,
        projectTypes: [project.category === 'Residential' ? 'pt-new-build' : 'pt-renovation'],
      },
    })
  }

  const handleWhatsApp = () => {
    sendViaWhatsApp({
      source: `Gallery: ${project.title}`,
      projectTypes: [project.category],
      message: `Hello Brickleaf, I am interested in exploring an interior architectural commission inspired by "${project.title}" (${project.location}).`,
    })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 lg:p-10 bg-ink/80 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-5xl bg-cream border-t sm:border border-line/60 shadow-2xl overflow-hidden h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle cue */}
        <div className="sm:hidden w-full flex justify-center pt-2 pb-1 bg-cream/95">
          <div className="w-10 h-1 rounded-full bg-sand/40" />
        </div>

        {/* ── Modal Header / Close Bar ────────────────────────────── */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3 sm:py-4 border-b border-line bg-cream/95 backdrop-blur-sm sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse shrink-0" />
            <Eyebrow className="text-sand text-[11px] sm:text-xs">Project Blueprint / {project.category}</Eyebrow>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project modal"
            className="w-10 h-10 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-line/40 rounded-full transition-colors text-base"
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable Body ───────────────────────────────────────── */}
        <div className="overflow-y-auto p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 text-ink font-body overscroll-contain flex-1">

          {/* Hero Photography */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-line/40 bg-ink/10">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Project Title & Metadata Grid */}
          <div className="space-y-3 sm:space-y-4 border-b border-line/40 pb-5 sm:pb-6">
            <h2 id="project-modal-title" className="font-display text-2xl sm:text-4xl lg:text-5xl font-light text-ink leading-tight">
              {project.title}
            </h2>
            <p className="text-sand text-xs sm:text-base font-medium">
              {project.tagline}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-3 sm:pt-4 text-xs">
              <div className="p-2.5 sm:p-3 bg-cream/60 border border-line/40">
                <span className="text-sand uppercase tracking-wider block text-[10px]">Location</span>
                <span className="font-medium text-ink mt-0.5 block truncate">{project.location}</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-cream/60 border border-line/40">
                <span className="text-sand uppercase tracking-wider block text-[10px]">Scale</span>
                <span className="font-medium text-ink mt-0.5 block truncate">{project.area}</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-cream/60 border border-line/40">
                <span className="text-sand uppercase tracking-wider block text-[10px]">Year</span>
                <span className="font-medium text-ink mt-0.5 block">{project.year}</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-cream/60 border border-line/40">
                <span className="text-sand uppercase tracking-wider block text-[10px]">Scope</span>
                <span className="font-medium text-ink mt-0.5 block truncate" title={project.scope}>
                  {project.scope}
                </span>
              </div>
            </div>
          </div>

          {/* Architectural Narrative */}
          <div className="space-y-2.5 sm:space-y-3">
            <h3 className="font-display text-lg sm:text-xl font-medium text-ink">
              Design Narrative &amp; Spatial Planning
            </h3>
            <p className="text-ink-soft text-xs sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Material & Finish Palette */}
          {project.materials && (
            <div className="space-y-3 sm:space-y-4 bg-cream/50 p-4 sm:p-6 border border-line/40">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] sm:text-xs uppercase tracking-widest text-ink font-semibold">
                  Curated Material Palette
                </h4>
                {/* Color Swatch Dots */}
                <div className="flex items-center gap-1.5">
                  {project.palette?.map((hex, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-line/60"
                      style={{ backgroundColor: hex }}
                      title={`Palette color ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                {project.materials.map((mat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-cream border border-line/40">
                    <span className="font-display text-xs text-sand font-bold mt-0.5">0{idx + 1}</span>
                    <div>
                      <span className="text-xs font-semibold text-ink block">{mat.name}</span>
                      <span className="text-[11px] text-ink-soft block">{mat.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Photo Strip */}
          {project.secondaryImages && project.secondaryImages.length > 0 && (
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs uppercase tracking-widest text-ink font-semibold">
                Atmospheric Perspectives
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {project.secondaryImages.map((imgSrc, idx) => (
                  <div key={idx} className="aspect-[4/3] overflow-hidden border border-line/40 bg-ink/10">
                    <img
                      src={imgSrc}
                      alt={`${project.title} perspective ${idx + 1}`}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Modal Footer Actions ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 px-5 sm:px-8 py-3.5 sm:py-4 bg-cream/95 backdrop-blur-md border-t border-line shrink-0 sticky bottom-0 z-20">
          <Button variant="outline" onClick={handleWhatsApp} className="text-xs w-full sm:w-auto min-h-[44px] justify-center">
            💬 Enquire on WhatsApp
          </Button>

          <Button variant="primary" onClick={handleEnquire} className="text-xs w-full sm:w-auto min-h-[44px] justify-center">
            Begin Project Brief →
          </Button>
        </div>
      </div>
    </div>
  )
}