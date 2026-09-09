import { useState } from 'react'
import { GALLERY_PROJECTS, GALLERY_CATEGORIES } from '../../data/galleryData'
import ProjectModal from './ProjectModal'

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = activeCategory === 'All'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <div className="w-full space-y-10">
      {/* ── Category Filter Pills ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" role="tablist">
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-200 border
                ${
                  isActive
                    ? 'bg-ink text-cream border-ink font-semibold'
                    : 'bg-cream/50 text-ink-soft border-line/60 hover:border-sand hover:text-ink'
                }
              `}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* ── Project Cards Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer border border-line/50 bg-cream/40 overflow-hidden flex flex-col transition-all duration-300 hover:border-sand hover:shadow-xl"
          >
            {/* Project Image Frame */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/10">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Floating Category Badge */}
              <span className="absolute top-4 left-4 px-3 py-1 bg-ink/75 backdrop-blur-md text-cream text-[10px] uppercase tracking-widest font-medium border border-cream/10">
                {project.category}
              </span>

              {/* Hover Cue */}
              <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-4 py-2 bg-cream/90 text-ink text-xs uppercase tracking-widest font-medium backdrop-blur-sm border border-sand">
                  View Blueprint ↗
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-sand">
                  <span className="tracking-widest uppercase">{project.location}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-ink font-light group-hover:text-amber transition-colors">
                  {project.title}
                </h3>
                <p className="text-ink-soft text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>
              </div>

              {/* Material Chips */}
              <div className="pt-2 border-t border-line/40 flex flex-wrap gap-2 text-[11px] text-ink-soft">
                {project.materials?.slice(0, 3).map((mat, i) => (
                  <span key={i} className="px-2 py-0.5 bg-cream border border-line/50">
                    {mat.name}
                  </span>
                ))}
                {project.materials?.length > 3 && (
                  <span className="px-2 py-0.5 text-sand font-medium">
                    +{project.materials.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Project Deep-Dive Modal ─────────────────────────────────── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
