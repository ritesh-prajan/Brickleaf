/**
 * Comprehensive 15 Services Data for Brickleaf Interior Architecture Studio
 */

export const SERVICE_CATEGORIES = [
  'All Services',
  'Spatial Environments',
  'Transformation & Planning',
  'Smart Systems & Light',
  'Curation & Finishes',
]

export const SERVICES_LIST = [
  // ── 01. Spatial Environments ──
  {
    id: 'home-interiors',
    number: '01',
    category: 'Spatial Environments',
    title: 'Home Interiors',
    tagline: 'Bespoke residential sanctuaries designed for timeless living.',
    description:
      'Turnkey interior architecture for luxury residences, penthouses, and private villas. From spatial re-geometry to custom joinery, organic materiality, and atmospheric lighting design.',
    deliverables: ['Full Architectural Blueprint', 'Custom Millwork Schematics', 'Material & Furniture Palette', 'Turnkey Execution Handover'],
    icon: '🏠',
  },
  {
    id: 'office-interiors',
    number: '02',
    category: 'Spatial Environments',
    title: 'Office Interiors',
    tagline: 'High-performance executive suites blending hospitality with ergonomic focus.',
    description:
      'Executive work environments crafted with acoustic zoning, refined material warmth, biophilic integration, and bespoke client presentation lounges.',
    deliverables: ['Acoustic Zonal Mapping', 'Executive Suite Joinery', 'Ergonomic Workstation Layouts', 'Integrated AV & Power Routing'],
    icon: '🏢',
  },
  {
    id: 'it-parks',
    number: '03',
    category: 'Spatial Environments',
    title: 'IT Parks & Tech Campuses',
    tagline: 'Scalable commercial architecture for modern collaborative campuses.',
    description:
      'Comprehensive campus interior planning, town-hall breakout zones, collaborative hubs, and cafeteria pavilions that elevate brand identity and talent well-being.',
    deliverables: ['Large-scale Flow Planning', 'Collaborative Town-hall Hubs', 'Acoustic Pods & Quiet Zones', 'Sustainable Material Audits'],
    icon: '💻',
  },
  {
    id: 'restaurants',
    number: '04',
    category: 'Spatial Environments',
    title: 'Restaurants & Hospitality',
    tagline: 'Immersive culinary atmospheres designed around intimacy and lighting.',
    description:
      'High-end dining establishments, cocktail lounges, and boutique cafes where lighting temperature, acoustics, seating circulation, and tactile materiality elevate the guest experience.',
    deliverables: ['Ambient Mood Architecture', 'Bar & Counter Stonework', 'Seating Circulation Blueprints', 'Kitchen & Service Flow Geometry'],
    icon: '🍷',
  },
  {
    id: 'apparel-showrooms',
    number: '05',
    category: 'Spatial Environments',
    title: 'Apparel Showrooms & Retail',
    tagline: 'Experiential haute couture and luxury boutique retail spaces.',
    description:
      'Architectural fashion galleries featuring museum-grade accent lighting, seamless display plinths, private VIP fitting suites, and tactile minimalist plaster backdrops.',
    deliverables: ['CRI 98+ Spotlight Strategy', 'Custom Display Plinths & Racks', 'VIP Fitting Lounges', 'Visual Merchandising Flow'],
    icon: '✨',
  },
  {
    id: 'hospitals',
    number: '06',
    category: 'Spatial Environments',
    title: 'Hospitals & Healthcare Suites',
    tagline: 'Serene healing environments rooted in biophilic and acoustic wellness.',
    description:
      'Private medical clinics, wellness centers, and hospital executive suites designed with antimicrobial natural surfaces, calming illumination, and sound-dampening architectural geometry.',
    deliverables: ['Acoustic Decibel Optimization', 'Antimicrobial Material Specs', 'Soothing Circadian Lighting', 'Patient & Staff Flow Segregation'],
    icon: '🩺',
  },
  {
    id: 'warehouses',
    number: '07',
    category: 'Spatial Environments',
    title: 'Warehouses & Industrial Spaces',
    tagline: 'Optimized logistics facilities with contemporary architectural finishes.',
    description:
      'Industrial infrastructure, mezzanine office pods, and high-efficiency fulfillment centers designed for peak spatial efficiency, durability, and modern structural aesthetics.',
    deliverables: ['Mezzanine Structural Design', 'Heavy-duty Material Specifications', 'Daylight Harvesting Design', 'Administrative Pod Integration'],
    icon: '📦',
  },

  // ── 02. Transformation & Planning ──
  {
    id: 'refurbishments',
    number: '08',
    category: 'Transformation & Planning',
    title: 'Refurbishments & Revamps',
    tagline: 'Breathing contemporary architectural soul into dated footprints.',
    description:
      'Complete structural and cosmetic overhauls. We strip away dated ornamentation, reposition load-bearing perspectives, and re-engineer ceilings, flooring, and joinery.',
    deliverables: ['Structural Demolition Planning', 'Coved Ceiling Reconstruction', 'Flooring & Wall Re-skinning', 'Complete MEP Modernization'],
    icon: '🔨',
  },
  {
    id: 'space-planning',
    number: '09',
    category: 'Transformation & Planning',
    title: 'Space Planning & Blueprints',
    tagline: 'Mathematical precision in spatial ergonomics and visual sightlines.',
    description:
      'In-depth volumetric analysis, sightline optimization, and 2D/3D CAD blueprinting to unlock the full potential of challenging floor plans.',
    deliverables: ['2D Dimensioned Floor Plans', '3D Volumetric Wireframes', 'Circulation & Flow Diagrams', 'Zonal Partition Strategies'],
    icon: '📐',
  },
  {
    id: 'landscaping',
    number: '10',
    category: 'Transformation & Planning',
    title: 'Landscaping & Biophilic Design',
    tagline: 'Seamless indoor-outdoor transitions with native flora and stone.',
    description:
      'Private courtyard gardens, terrace green havens, architectural water features, and outdoor entertaining pavilions that harmonize with the interior living space.',
    deliverables: ['Native Flora Selection', 'Hardscape & Paver Layouts', 'Water Feature Engineering', 'Exterior Ambient Illumination'],
    icon: '🌿',
  },

  // ── 03. Smart Systems & Light ──
  {
    id: 'lighting-solutions',
    number: '11',
    category: 'Smart Systems & Light',
    title: 'Lighting Solutions',
    tagline: '2700K ambient illumination and sculptural architectural fixtures.',
    description:
      'Layered illumination schemes combining indirect ceiling coves, low-glare architectural downlights, accent plinth washes, and bespoke artisan chandeliers.',
    deliverables: ['Lux Level Calculations', 'Circadian Coving Schematics', 'Custom Chandelier Sourcing', 'Lighting Scene Programming'],
    icon: '💡',
  },
  {
    id: 'home-automation',
    number: '12',
    category: 'Smart Systems & Light',
    title: 'Home Automation & IoT',
    tagline: 'Invisible intelligent technology serving effortless living.',
    description:
      'Smart home architectures encompassing motorized drape integration, multi-zone climate control, hidden audio distribution, and tactile stone keypad interfaces.',
    deliverables: ['Smart Keypad & Switch Design', 'Motorized Drapery Tracks', 'Multi-zone Climate Automation', 'Concealed Hi-Fi Acoustic Setup'],
    icon: '⚡',
  },

  // ── 04. Curation & Finishes ──
  {
    id: 'furniture',
    number: '13',
    category: 'Curation & Finishes',
    title: 'Bespoke Furniture',
    tagline: 'Sculptural, made-to-measure statement pieces and artisan millwork.',
    description:
      'Handcrafted Roman travertine tables, curved bouclé modular sectionals, solid American walnut armchairs, and monolithic credenzas custom built for each space.',
    deliverables: ['Custom Furniture CADs', 'Artisan Timber & Stone Craft', 'Ergonomic Foam & Feather Grading', 'White-Glove Placement'],
    icon: '🛋️',
  },
  {
    id: 'curtain-solutions',
    number: '14',
    category: 'Curation & Finishes',
    title: 'Curtain & Textile Solutions',
    tagline: 'Tactile drapery, acoustic linens, and motorized architectural sheers.',
    description:
      'Floor-to-ceiling Belgian linen sheers, blackout acoustic velvet drapes, and recessed ceiling pocket tracks that sculpt daylight and soften room acoustics.',
    deliverables: ['Fabric Drape & Weight Selection', 'Recessed Pocket Ceiling Tracks', 'Motorized Remote Control', 'Custom Pelmet Tailoring'],
    icon: '🪟',
  },
  {
    id: 'wallpapers-decor',
    number: '15',
    category: 'Curation & Finishes',
    title: 'Wallpapers & Wall Decor',
    tagline: 'Tactile limestone plasters, mineral wallcoverings, and artware.',
    description:
      'Artisanal hand-troweled lime plaster, Japanese grasscloth wallpapers, fluted stone wall accents, and curated contemporary fine art placement.',
    deliverables: ['Lime Plaster & Microcement Application', 'Textured Grasscloth Hangings', 'Acoustic Slat Paneling', 'Fine Artware Curation'],
    icon: '🎨',
  },
]
