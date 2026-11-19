export const DUSTER_IMAGES = {
  hero: '/src/assets/images/duster_hero_cinematic_1795092836259.jpg',
  mountain: '/src/assets/images/duster_mountain_side_1795092860893.jpg',
  rear: '/src/assets/images/duster_rear_angle_1795092861039.jpg',
  cabin: '/src/assets/images/duster_cabin_view_1795092861441.jpg',
  detail: '/src/assets/images/duster_alloy_led_detail_1795092861097.jpg',
  showroom: '/src/assets/images/duster_showroom_pavilion_1795092839712.jpg',
} as const;

export interface DusterVariant {
  id: string;
  name: string;
  trimLevel: string;
  tagline: string;
  /** Editable showroom price label — replace once local ex-showroom pricing is confirmed */
  priceLabel: string;
  /** Optional editable illustrative price in INR for EMI pre-fill */
  editableEstimateInr?: number;
  powertrain: string;
  transmission: string;
  drivetrain: string;
  image: string;
  highlights: string[];
  safetyFeatures: string[];
  infotainmentFeatures: string[];
  comfortFeatures: string[];
  exteriorFeatures: string[];
}

/**
 * Editable Duster Variant Lineup
 * Note: Exact India-spec trim names, engine calibrations, and ex-showroom prices
 * are configured as showroom-editable entries so no unverified figures are fabricated.
 */
export const DUSTER_VARIANTS: DusterVariant[] = [
  {
    id: 'essential',
    name: 'Duster Essential',
    trimLevel: 'Core SUV Trim',
    tagline: 'Purposeful SUV stance with everyday durability and core safety architecture.',
    priceLabel: 'Price on Request · Confirm Ex-Showroom Quote',
    powertrain: 'Showroom-confirmed petrol / hybrid powertrain lineup',
    transmission: 'Manual / Automatic options (variant dependent)',
    drivetrain: 'Front-Wheel Drive (2WD)',
    image: DUSTER_IMAGES.rear,
    highlights: [
      'Signature Y-shaped LED daytime running lights',
      'Protective matte black wheel-arch and lower body cladding',
      'Modular roof rails and high ground-clearance SUV posture',
      'Multi-airbag occupant protection with electronic stability control',
    ],
    safetyFeatures: [
      'Multiple airbags (front, side, and curtain protection — trim verified)',
      'Electronic Stability Control (ESC) & Hill Start Assist',
      'ABS with Electronic Brakeforce Distribution (EBD)',
      'Rear parking sensors & ISOFIX child seat anchorages',
    ],
    infotainmentFeatures: [
      'Driver information cluster with trip telemetry',
      'Bluetooth hands-free audio & USB-C charging ports',
      'Steering-mounted audio and call controls',
    ],
    comfortFeatures: [
      'Height-adjustable driver seat with supportive bolstering',
      '60:40 split-folding rear bench for flexible cargo volume',
      'Manual air conditioning with rear cabin vents',
    ],
    exteriorFeatures: [
      'LED headlamps with signature Y-shaped DRL',
      'Protective front and rear skid-plate styling',
      'All-season steel/styled wheels (variant dependent)',
    ],
  },
  {
    id: 'techno',
    name: 'Duster Techno',
    trimLevel: 'Connected Mid-Spec Trim',
    tagline: 'Digital cockpit integration balanced with rugged touring capability.',
    priceLabel: 'Price on Request · Confirm Ex-Showroom Quote',
    powertrain: 'Showroom-confirmed turbo-petrol / hybrid options',
    transmission: 'Manual / Automatic gearbox options',
    drivetrain: 'Front-Wheel Drive (2WD)',
    image: DUSTER_IMAGES.hero,
    highlights: [
      '10.1-inch driver-angled touchscreen infotainment system',
      '7-inch customizable digital driver instrument display',
      '17-inch dual-tone diamond-cut alloy wheels',
      'Rear-view camera with dynamic parking guidelines',
    ],
    safetyFeatures: [
      'All Essential safety equipment plus rear-view camera',
      'Cruise control with speed limiter for highway touring',
      'Tyre Pressure Monitoring System (TPMS)',
      'Driver assistance suite (confirm exact ADAS features at showroom)',
    ],
    infotainmentFeatures: [
      '10.1-inch floating touchscreen with wireless smartphone mirroring',
      '7-inch digital TFT driver instrument cluster',
      'Wireless charging pad & multi-point USB-C connectivity',
    ],
    comfortFeatures: [
      'Automatic climate control with cabin filtration',
      'Keyless entry with push-button engine start/stop',
      'Center console armrest with enclosed storage',
    ],
    exteriorFeatures: [
      '17-inch machined dual-tone alloy wheels',
      'Shark-fin roof antenna and satin roof rail accents',
      'Electrically adjustable and foldable wing mirrors',
    ],
  },
  {
    id: 'adventure',
    name: 'Duster Extreme / Journey',
    trimLevel: 'Flagship Adventure Trim',
    tagline: 'Commanding all-terrain poise, refined cabin finishes, and flagship visibility.',
    priceLabel: 'Price on Request · Confirm Ex-Showroom Quote',
    powertrain: 'Flagship turbo-petrol / hybrid powertrain (showroom confirmed)',
    transmission: 'Automatic / 6-speed manual (market specification)',
    drivetrain: '2WD / Terrain-ready AWD options (subject to India spec)',
    image: DUSTER_IMAGES.mountain,
    highlights: [
      'Multi-view camera system for tight urban and trail maneuvering',
      'Washable / durable adventure-grade interior upholstery accents',
      'Modular roof rails designed for touring luggage carriers',
      'Automatic LED headlamps & rain-sensing wipers',
    ],
    safetyFeatures: [
      'Multi-view 360-degree camera & front/rear parking sensors',
      'Blind-spot warning & lane/braking driver assistance (variant verified)',
      'Hill Descent Control (on terrain-capable trims)',
      '6-airbag safety cell with ESC and traction management',
    ],
    infotainmentFeatures: [
      '10.1-inch connected navigation & media interface',
      'Enhanced multi-speaker cabin audio system',
      'Connected vehicle telematics & wireless smartphone integration',
    ],
    comfortFeatures: [
      'Contrast copper-slate interior trim with supportive touring seats',
      'Automatic dual-zone / digital climate comfort',
      'Flexible dual-level boot floor for expanded luggage utility',
    ],
    exteriorFeatures: [
      'Signature copper/satin exterior mirror & trim accents',
      '17-inch or 18-inch machined alloy wheel options',
      'Heavy-duty matte black Starkle-style protective cladding',
    ],
  },
];

export interface HighlightItem {
  id: string;
  index: string;
  category: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
}

export const VEHICLE_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'ground-clearance',
    index: '01',
    category: 'Stance & Capability',
    title: 'High Ground Clearance & Approach Geometry',
    summary: 'Engineered to clear broken tarmac, monsoon waterlogging, and steep mountain inclines without hesitation.',
    detail: 'Short front and rear overhangs paired with protective underbody skid plates and wide wheel-arch cladding.',
    image: DUSTER_IMAGES.mountain,
  },
  {
    id: 'powertrain',
    index: '02',
    category: 'Engine & Performance',
    title: 'Responsive Modern Powertrain Architecture',
    summary: 'Tuned for confident highway overtaking and effortless low-speed urban drivability across Indian road conditions.',
    detail: 'Confirm exact India-market engine displacement, transmission pairings, and ARAI figures at our showroom.',
    image: DUSTER_IMAGES.hero,
  },
  {
    id: 'safety',
    index: '03',
    category: 'Safety Technology',
    title: 'Reinforced Body Shell & Active Driver Aids',
    summary: 'Built around a high-rigidity platform with multi-airbag protection, ESC, and available camera-based driver assistance.',
    detail: 'Variant-verified active and passive safety systems demonstrated during your showroom walkaround.',
    image: DUSTER_IMAGES.detail,
  },
  {
    id: 'infotainment',
    index: '04',
    category: 'Infotainment & Connectivity',
    title: 'Driver-Angled Digital Cockpit',
    summary: 'A 10.1-inch floating touchscreen angled toward the driver keeps navigation, media, and wireless phone projection clear at a glance.',
    detail: 'Paired with a digital instrument cluster and intuitive physical climate toggles for zero-distraction control.',
    image: DUSTER_IMAGES.cabin,
  },
  {
    id: 'boot-space',
    index: '05',
    category: 'Practicality & Boot Space',
    title: 'Generous Boot Volume & Modular Utility',
    summary: 'Wide tailgate opening, low loading lip, and 60:40 split rear seats handle family highway luggage and weekend gear alike.',
    detail: 'Flat-folding rear seatbacks and smart cabin storage cubbies throughout both rows.',
    image: DUSTER_IMAGES.rear,
  },
  {
    id: 'comfort',
    index: '06',
    category: 'Driving Comfort',
    title: 'Long-Travel Suspension & Cabin Composure',
    summary: 'Long-wheelbase stability and supple suspension damping absorb expansion joints and undulating rural roads with poise.',
    detail: 'Commanding elevated seating position gives clear forward sightlines in dense city traffic.',
    image: DUSTER_IMAGES.mountain,
  },
];

export interface ShowcaseItem {
  id: string;
  category: 'exterior' | 'interior';
  label: string;
  title: string;
  caption: string;
  specs: string[];
  image: string;
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'front-design',
    category: 'exterior',
    label: 'Front Design',
    title: 'Sculpted Upright Fascia',
    caption: 'Broad horizontal grille, contoured bonnet creases, and raised front skid plate emphasize unmistakable SUV width.',
    specs: ['Contoured hood channels', 'Protective front skid plate', 'Integrated fog lamp housing'],
    image: DUSTER_IMAGES.hero,
  },
  {
    id: 'headlamps',
    category: 'exterior',
    label: 'Headlamps',
    title: 'Y-Shaped LED Lighting Signature',
    caption: 'Crisp Y-shaped LED daytime running lights seamlessly flow into the horizontal grille bar for immediate day-and-night recognition.',
    specs: ['LED DRL signature', 'Projector / LED headlamp optics', 'Automatic dusk sensing (select trims)'],
    image: DUSTER_IMAGES.detail,
  },
  {
    id: 'side-profile',
    category: 'exterior',
    label: 'Side Profile',
    title: 'Muscular Haunches & Roof Rails',
    caption: 'Squared-off wheel arches, robust lower door cladding, and modular roof rails showcase genuine cross-country character.',
    specs: ['Matte protective cladding', 'Modular roof bars', 'Flush-look rear door handles'],
    image: DUSTER_IMAGES.mountain,
  },
  {
    id: 'alloy-wheels',
    category: 'exterior',
    label: 'Alloy Wheels',
    title: '17-Inch Machined Diamond-Cut Alloys',
    caption: 'Geometric dual-tone alloy wheels fill the flared arches while high-profile tires cushion rough surfaces.',
    specs: ['Dual-tone machined finish', 'High-sidewall touring tires', 'Reinforced arch surrounds'],
    image: DUSTER_IMAGES.detail,
  },
  {
    id: 'rear-design',
    category: 'exterior',
    label: 'Rear Design',
    title: 'Wide Stance & Sculpted Tailgate',
    caption: 'Y-motif LED tail lamps frame a wide-opening tailgate and rugged silver rear bumper protector.',
    specs: ['Y-motif LED tail lamps', 'Integrated roof spoiler', 'Silver rear skid plate'],
    image: DUSTER_IMAGES.rear,
  },
  {
    id: 'dashboard',
    category: 'interior',
    label: 'Dashboard',
    title: 'Horizontal Architectural Cockpit',
    caption: 'Clean layered dashboard geometry with durable textured materials and copper-slate accents puts key controls within easy reach.',
    specs: ['Driver-tilted center stack', 'Physical climate switches', '7-inch digital cluster'],
    image: DUSTER_IMAGES.cabin,
  },
  {
    id: 'infotainment',
    category: 'interior',
    label: 'Infotainment System',
    title: '10.1-Inch Connected Touchscreen',
    caption: 'High-contrast landscape display supporting wireless smartphone integration, navigation, and multi-view camera feeds.',
    specs: ['10.1-inch floating display', 'Wireless Apple CarPlay & Android Auto', 'USB-C fast charging'],
    image: DUSTER_IMAGES.cabin,
  },
  {
    id: 'seating',
    category: 'interior',
    label: 'Seating',
    title: 'Supportive Five-Seat Touring Cabin',
    caption: 'Generous shoulder room, supportive side bolsters, and long-distance cushioning keep five occupants comfortable over long drives.',
    specs: ['Ergonomic front bolsters', '60:40 split rear seats', 'Rear AC vents & storage'],
    image: DUSTER_IMAGES.cabin,
  },
  {
    id: 'boot-space',
    category: 'interior',
    label: 'Boot Space',
    title: 'Expandable Adventure Cargo Bay',
    caption: 'Deep square-shaped luggage bay with a flat loading sill accommodates family suitcases, strollers, or expedition gear.',
    specs: ['Wide tailgate aperture', 'Split-folding cargo expansion', 'Tie-down hooks & bay lighting'],
    image: DUSTER_IMAGES.rear,
  },
];

export interface OfferPlaceholder {
  id: string;
  type: string;
  title: string;
  statusLabel: string;
  description: string;
  actionLabel: string;
}

/**
 * Editable Promotional Offers
 * Intentionally avoids inventing unverified rupee discount figures.
 */
export const SHOWROOM_OFFERS: OfferPlaceholder[] = [
  {
    id: 'cash-benefit',
    type: 'Showroom Benefit',
    title: 'Seasonal Cash & Booking Benefits',
    statusLabel: 'Editable · Confirm Monthly Applicability',
    description:
      'Eligible variant-specific cash benefits updated monthly per manufacturer and showroom schemes. Contact our desk for today’s applicable quote.',
    actionLabel: 'Enquire About Offers',
  },
  {
    id: 'exchange-bonus',
    type: 'Trade-In Support',
    title: 'Used Car Exchange Valuation & Bonus',
    statusLabel: 'Editable · On-Site Inspection Available',
    description:
      'Bring your existing vehicle for a transparent physical evaluation at our showroom and apply its trade-in value directly toward your Duster down payment.',
    actionLabel: 'Request Exchange Quote',
  },
  {
    id: 'corporate-benefit',
    type: 'Corporate & Institutional',
    title: 'Corporate, PSU & Doctor Benefits',
    statusLabel: 'Editable · Subject to Employer List',
    description:
      'Special institutional documentation support and applicable corporate allowances for eligible salaried professionals and business entities.',
    actionLabel: 'Check Eligibility',
  },
  {
    id: 'finance-offer',
    type: 'Retail Finance',
    title: 'Tailored Auto Loan & EMI Options',
    statusLabel: 'Editable · Multi-Bank Tie-Ups',
    description:
      'Compare fixed and step-up loan tenures across partner banks and NBFCs with transparent processing guidance and zero hidden showroom fees.',
    actionLabel: 'Discuss Finance Plans',
  },
  {
    id: 'special-promo',
    type: 'Showroom Package',
    title: 'Accessory & Extended Warranty Bundles',
    statusLabel: 'Editable · Customisable at Delivery',
    description:
      'Curate genuine Renault mud flaps, roof carriers, floor mats, and extended service coverage tailored to how you drive.',
    actionLabel: 'Explore Packages',
  },
];

export const SHOWROOM_TRUST_PILLARS = [
  {
    index: '01',
    title: 'Personalised Walkaround Assistance',
    description:
      'One-on-one variant walkthroughs tailored to your daily commute, highway travel, and family space requirements.',
  },
  {
    index: '02',
    title: 'Flexible Test Drive Support',
    description:
      'Experience the Duster at our showroom or request a scheduled doorstep test drive slot at a time that suits you.',
  },
  {
    index: '03',
    title: 'End-to-End Finance Assistance',
    description:
      'Compare loan tenures, interest structures, and documentation checklists across leading banking partners without guesswork.',
  },
  {
    index: '04',
    title: 'Fair Vehicle Exchange Evaluation',
    description:
      'Straightforward appraisal of your current car with clear paperwork handling and RC transfer tracking.',
  },
  {
    index: '05',
    title: 'Transparent On-Road Pricing',
    description:
      'Itemized proforma invoices breaking down ex-showroom cost, registration, insurance, and optional accessories upfront.',
  },
  {
    index: '06',
    title: 'Dedicated After-Sales Guidance',
    description:
      'Clear handover orientation, scheduled maintenance planning, and direct service advisor coordination after delivery.',
  },
];

export interface PlaceholderTestimonial {
  id: string;
  placeholderNotice: string;
  label: string;
  quote: string;
  context: string;
}

/**
 * Clearly marked placeholder testimonials intended for replacement with
 * verified customer feedback before public launch.
 */
export const PLACEHOLDER_TESTIMONIALS: PlaceholderTestimonial[] = [
  {
    id: 'sample-1',
    placeholderNotice: 'Placeholder Review · Replace with Verified Customer Testimonial',
    label: 'Showroom Experience Sample 01',
    quote:
      'Reserved space for a verified customer review covering the test drive booking process, variant explanation, and transparent on-road price breakdown.',
    context: 'Variant Purchased: [Replace with Model / City]',
  },
  {
    id: 'sample-2',
    placeholderNotice: 'Placeholder Review · Replace with Verified Customer Testimonial',
    label: 'Delivery & Finance Sample 02',
    quote:
      'Reserved space for a genuine buyer story detailing vehicle exchange valuation, bank loan coordination, and smooth delivery-day handover.',
    context: 'Customer Segment: [Replace with Family / Highway Tourer]',
  },
  {
    id: 'sample-3',
    placeholderNotice: 'Placeholder Review · Replace with Verified Customer Testimonial',
    label: 'After-Sales Guidance Sample 03',
    quote:
      'Reserved space for an authentic post-delivery ownership note highlighting showroom follow-up and service scheduling support.',
    context: 'Ownership Milestone: [Replace with First Service / 6 Months]',
  },
];
