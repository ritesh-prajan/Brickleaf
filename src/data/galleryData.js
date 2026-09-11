/**
 * Curated Gallery Projects & Architectural Specs for Brickleaf
 */

export const GALLERY_PROJECTS = [
  {
    id: 'travertine-residence',
    title: 'The Travertine Residence',
    category: 'Residential',
    location: 'Jubilee Hills, Hyderabad',
    year: '2025',
    area: '6,400 sq.ft',
    scope: 'Full Architecture, Custom Millwork & Furnishings',
    coverImage: '/hero/stage-8-full-lighting.jpg',
    secondaryImages: [
      '/hero/stage-6-chandelier-off.jpg',
      '/hero/stage-7-dusk-cove.jpg',
      '/hero/stage-4-sofa.jpg',
    ],
    tagline: 'Sculptural limestone minimalism grounded by organic walnut millwork.',
    description:
      'A sanctuary designed around natural lighting dynamics and earth pigments. Features monolithic Roman Travertine joinery, acoustic lime plaster wall finishes, bespoke curved bouclé seating, and 2700K ambient illumination.',
    materials: [
      { name: 'Roman Travertine', detail: 'Honed & Filled, Matte Finish' },
      { name: 'American Walnut', detail: 'Fluted Architectural Paneling' },
      { name: 'Bouclé Wool', detail: 'Tactile Oatmeal Texture' },
      { name: 'Brushed Brass', detail: 'Custom Architectural Chandelier' },
    ],
    palette: ['#E8E0D8', '#C9A882', '#B8956A', '#2C2520'],
  },
  {
    id: 'grand-living-pavilion',
    title: 'Grand Living Pavilion',
    category: 'Renovation',
    location: 'Bandra West, Mumbai',
    year: '2025',
    area: '4,800 sq.ft',
    scope: 'Structural Revamp, Coved Ceilings, Media Wall',
    coverImage: '/transformations/living-room-after.jpg',
    secondaryImages: [
      '/transformations/living-room-before.jpg',
      '/hero/stage-5-chairs-table.jpg',
    ],
    tagline: 'Reimagining a dated 90s footprint into a light-filled contemporary haven.',
    description:
      'Stripping down heavy floral partitions to introduce a floating cantilevered marble TV credenza, warm indirect perimeter LED coves, and deep-toned forest green accent seating.',
    materials: [
      { name: 'Statuario Marble', detail: 'Bookmatched Backlit Feature Wall' },
      { name: 'Smoked Oak', detail: 'Engineered Hardwood Floor' },
      { name: 'Linen Sheers', detail: 'Double-Height Motorized Drapes' },
      { name: 'Olive Velvet', detail: 'Lounge Chairs with Walnut Legs' },
    ],
    palette: ['#ECE7E1', '#D4C9BC', '#8C9A86', '#1E1B18'],
  },
  {
    id: 'kyoto-minimalist-penthouse',
    title: 'Kyoto Horizon Penthouse',
    category: 'Residential',
    location: 'Alipore, Kolkata',
    year: '2024',
    area: '5,200 sq.ft',
    scope: 'Interior Blueprint, Custom Millwork, Lighting Design',
    coverImage: '/hero/stage-5-chairs-table.jpg',
    secondaryImages: [
      '/hero/stage-3-rug.jpg',
      '/hero/stage-8-full-lighting.jpg',
    ],
    tagline: 'Japandi harmony combining Wabi-Sabi textures with modern precision.',
    description:
      'Low-profile modular seating resting on woven organic jute, low-slung travertine tables, and recessed ceiling channels creating an ethereal, quiet sanctuary high above the cityscape.',
    materials: [
      { name: 'Hinoki Cypress', detail: 'Vertical Slat Partitions' },
      { name: 'Natural Jute', detail: 'Hand-knotted Heavy Weave' },
      { name: 'Microcement', detail: 'Seamless Plaster Flooring' },
      { name: 'Opaline Glass', detail: 'Globe Pendant Fixtures' },
    ],
    palette: ['#F2EEE9', '#D8CDBF', '#A38F78', '#2A2421'],
  },
  {
    id: 'atrium-design-office',
    title: 'The Atrium Creative Suite',
    category: 'Commercial',
    location: 'Indiranagar, Bengaluru',
    year: '2025',
    area: '3,800 sq.ft',
    scope: 'Commercial Executive Studio & Client Lounges',
    coverImage: '/hero/stage-7-dusk-cove.jpg',
    secondaryImages: [
      '/hero/stage-6-chandelier-off.jpg',
      '/transformations/living-room-after.jpg',
    ],
    tagline: 'Executive hospitality meets tactile residential comfort.',
    description:
      'An intimate commercial studio space designed with residential hospitality principles. Features private acoustic pods, fluted glass partitions, living botanical corners, and curated artware pedestals.',
    materials: [
      { name: 'Fluted Glass', detail: 'Acoustic Partition Glazing' },
      { name: 'Charcoal Steel', detail: 'Ultra-slim Framing' },
      { name: 'Live Olive Tree', detail: 'Cast Terrazzo Planter' },
      { name: 'Sandstone', detail: 'Artisanal Display Plinths' },
    ],
    palette: ['#E6DFD5', '#B5A593', '#685D54', '#1F1B18'],
  },
]

export const GALLERY_CATEGORIES = ['All', 'Residential', 'Renovation', 'Commercial']