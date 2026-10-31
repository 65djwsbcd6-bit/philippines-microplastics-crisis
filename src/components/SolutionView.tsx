import React, { useState } from 'react';
import { Icon } from './Icon';
import { ImageWithFallback } from './ImageWithFallback';

interface SolutionViewProps {
  onSwitchView: (view: 'gateway' | 'crisis') => void;
}

export const SolutionView: React.FC<SolutionViewProps> = ({ onSwitchView }) => {
  // 1. Horizon Preview State
  const [horizonMode, setHorizonMode] = useState<'current' | 'restored'>('restored');

  // 2. Everyday Swaps State
  type SwapCategory = 'sachets' | 'bottles' | 'food' | 'ecommerce';
  const [swapCategory, setSwapCategory] = useState<SwapCategory>('sachets');

  type RippleStage = 'me' | 'store' | 'community' | 'environment';
  const [rippleStage, setRippleStage] = useState<RippleStage>('me');

  const swapData: Record<
    SwapCategory,
    {
      badge: string;
      oldTitle: string;
      oldDesc: string;
      newTitle: string;
      newDesc: string;
      smallChange: string;
      bigChange: string;
      ripple: Record<RippleStage, string>;
    }
  > = {
    sachets: {
      badge: 'Habit: Shampoo, Coffee & Soap Sachets',
      oldTitle: 'Multi-Layer Foil Sachets',
      oldDesc:
        'Used once in 3 minutes, laminated aluminum-plastic layers cannot be mechanically recycled in municipal recovery systems and persist for centuries in storm channels.',
      newTitle: 'Bulk Refill Taps & Shampoo Bars',
      newDesc:
        'Bring your own reusable bottle to neighborhood refilling stations, or choose concentrated solid bars with simple paper wrapping.',
      smallChange: 'Eliminates 300–700 sachets per person every year from entering household trash.',
      bigChange:
        'Signals consumer demand to brands, accelerating bulk dispensing logistics across FMCG supply chains.',
      ripple: {
        me: 'Directly diverts 700+ single-use packaging items per year from curbside pickup.',
        store: 'Store owners capture higher profit margins through bulk drums with zero packaging waste.',
        community:
          'Storm drainage culverts stay unblocked during typhoons, reducing urban flash flood risks.',
        environment:
          'Zero microplastic degradation in rivers; juvenile fish and marine turtles feed without ingestion hazards.',
      },
    },
    bottles: {
      badge: 'Habit: Single-Use PET Beverage Bottles',
      oldTitle: 'PET Bottles & Polypropylene Caps',
      oldDesc:
        'Consuming bottled water and iced tea generates millions of plastic bottles daily, many escaping collection into urban creeks and coastal shores.',
      newTitle: 'Insulated Flasks & Barangay Refill Stations',
      newDesc:
        'Carrying an insulated stainless steel tumbler and refilling at clean mineral water stations common in every Philippine barangay.',
      smallChange: 'Saves ~365 plastic beverage bottles and caps per individual every year.',
      bigChange:
        'Reduces commercial petroleum extraction and decreases bottled water logistics transportation carbon.',
      ripple: {
        me: 'Prevents ~365 plastic bottles and caps per person annually while saving money on drinks.',
        store: 'Barangay water refill stations expand community-level hydration networks.',
        community: 'Reduces volume pressure on municipal hauling trucks and local sanitary landfills.',
        environment: 'Prevents large bottles from photodegrading into abrasive macro-debris on beaches.',
      },
    },
    food: {
      badge: 'Habit: Takeout Clamshells & Sando Bags',
      oldTitle: 'Polystyrene Clamshells & Sando Bags',
      oldDesc:
        'Carinderia meals and takeout foods packed in expanded foam boxes and thin carrier bags that tear easily and fly into open drainage grids.',
      newTitle: 'BYO Baon Kit & Woven Bayong Bags',
      newDesc:
        'Using traditional Philippine woven bayong bags for wet markets, and bringing reusable stainless steel food containers (baonan) for takeout.',
      smallChange: 'Prevents over 700 plastic sando bags and polystyrene containers each year.',
      bigChange:
        'Shifts food retail norms toward deposit-return lunchboxes and washable dine-in dishware.',
      ripple: {
        me: 'Replaces ~730 single-use takeout containers and thin film plastic bags annually.',
        store: 'Local carinderias and restaurants save substantially on disposable packaging overhead.',
        community: 'Prevents thin film bags from entangling pump station propellers during floods.',
        environment: 'Protects sea turtles from mistaking translucent floating plastic bags for jellyfish.',
      },
    },
    ecommerce: {
      badge: 'Habit: Online Shopping & Parcel Shipping',
      oldTitle: 'Poly-Courier Pouches & Bubble Wrap',
      oldDesc:
        'E-commerce orders arrive sealed in layers of non-biodegradable polyethylene mailers, air pillows, and synthetic adhesive tapes.',
      newTitle: 'Corrugated Paper Mailers & Honeycomb Wrap',
      newDesc:
        'Choosing eco-shipping options, consolidating multiple items into single shipments, and supporting vendors using shredded paper padding.',
      smallChange: 'Diverts 20–50 large plastic mailers and meters of bubble wrap per household annually.',
      bigChange:
        'Drives nationwide courier logistics to transition fleets to compostable or returnable delivery totes.',
      ripple: {
        me: 'Keeps bulky plastic courier films and non-recyclable bubble wrap out of home waste.',
        store: 'Online merchants reduce packaging costs by consolidating protective parcel materials.',
        community:
          'Reduces municipal solid waste volume requiring specialized incineration or landfilling.',
        environment:
          'Dramatically cuts flexible plastic film pollution across terrestrial and aquatic ecosystems.',
      },
    },
  };

  const triggerRippleAnimation = () => {
    const stages: RippleStage[] = ['me', 'store', 'community', 'environment'];
    stages.forEach((st, idx) => {
      setTimeout(() => {
        setRippleStage(st);
      }, idx * 400);
    });
  };

  // 3. Circular Economy System Builder State
  const [activeStages, setActiveStages] = useState<Set<number>>(new Set([1]));
  const [selectedStage, setSelectedStage] = useState<number>(1);

  const circuitData: Record<
    number,
    {
      badge: string;
      title: string;
      desc: string;
      linear: string;
      circular: string;
      img: string;
    }
  > = {
    1: {
      badge: 'Active Stage 1: Design',
      title: 'Design for Less Waste',
      desc: 'Eliminating non-recyclable multi-material sachets before they are produced. Developing monomaterial recyclable pouches, dry concentrate tablets, and indigenous home-compostable biopolymers derived from Philippine seaweeds.',
      linear: 'Cheap laminate packaging designed exclusively for 1-time disposal.',
      circular: 'Standardized formats designed from day one to be refilled or fully recovered.',
      img: 'images/sol-stage1-design-less-waste.jpg',
    },
    2: {
      badge: 'Active Stage 2: Produce',
      title: 'Responsible Manufacturing & EPR',
      desc: 'Brand owners comply with the Philippine Extended Producer Responsibility (EPR) Act. Incorporating high percentages of post-consumer recycled (PCR) resin and phasing out toxic chemical additives.',
      linear: 'Virgin fossil-fuel extraction with zero financial stake in end-of-life disposal.',
      circular: 'Producers legally held to fund recovery and shift supply chains to circular inputs.',
      img: 'images/sol-stage2-responsible-manufacturing.jpg',
    },
    3: {
      badge: 'Active Stage 3: Use',
      title: 'Mindful Consumption & Refill',
      desc: 'Normalizing refill models across retail sectors. Consumers prioritize reusable tumblers, containers, and bulk dispensers over convenience-driven single portions.',
      linear: 'Unconscious consumption of single-use sachets thrown into curbside trash in minutes.',
      circular: 'Products reused dozens of times, dramatically lowering material consumption per capita.',
      img: 'images/sol-stage3-mindful-consumption.jpg',
    },
    4: {
      badge: 'Active Stage 4: Reuse',
      title: 'Keep Materials Circulating',
      desc: 'Revitalizing traditional Philippine deposit-return bottle networks (like classic returnable soft drink glass bottles) and scaling container-washing infrastructure for takeaway food.',
      linear: 'Linear disposal to open sanitary landfills or open incinerators.',
      circular: 'Standardized containers sanitized and refilled up to 30 times without new packaging waste.',
      img: 'images/sol-stage4-reuse-circulation.jpg',
    },
    5: {
      badge: 'Active Stage 5: Recover',
      title: 'Dignified Sorting & Barangay MRFs',
      desc: 'Equipping every Philippine barangay with operational Materials Recovery Facilities (MRFs). Formally recognizing and fairly compensating waste collectors with health benefits and safety equipment.',
      linear: 'Informal, hazardous dumpsite scavenging with extreme health vulnerabilities.',
      circular: 'Formal green jobs, clean segregation at the source, and clean municipal logistics.',
      img: 'images/sol-stage5-dignified-sorting-mrf.jpg',
    },
    6: {
      badge: 'Active Stage 6: Redesign',
      title: 'Closing the Loop into Materials',
      desc: 'High-value circular mechanical reprocessing. Recovered clean polymers are converted into new containers or long-lasting structural eco-pavers for schools and public walkways.',
      linear: 'Downcycled into fugitive microplastics or washed out to sea by monsoon rains.',
      circular: 'Closed-loop reprocessing preventing new petroleum extraction.',
      img: 'images/sol-stage6-redesign-closing-loop.jpg',
    },
  };

  const handleStageClick = (num: number) => {
    setActiveStages(prev => new Set([...prev, num]));
    setSelectedStage(num);
  };

  const resetStages = () => {
    setActiveStages(new Set([1]));
    setSelectedStage(1);
  };

  // 4. Intercept the Plastic State
  const [chainStep, setChainStep] = useState<number>(1);
  const [chainInterventionActive, setChainInterventionActive] = useState<boolean>(true);

  const chainData: Record<
    number,
    {
      badge: string;
      title: string;
      withoutTitle: string;
      withoutDesc: string;
      withTitle: string;
      withDesc: string;
      statText: string;
      statNumber: string;
    }
  > = {
    1: {
      badge: 'Checkpoint 01 // Manufacturing Phase',
      title: 'Product Design & Material Choice',
      withoutTitle: 'Multi-Layer Plastic-Aluminum Sachets',
      withoutDesc:
        'FMCG manufacturers flood sari-sari supply chains with micro-portion multi-layer sachets. Because layers cannot be separated, they are discarded into open dumps or road culverts.',
      withTitle: 'EPR Redesign & Monomaterial Packaging',
      withDesc:
        'Producers standardize packaging to recyclable monomaterials, offer concentrated tablets, or deploy localized bulk dispensers, eliminating sachet waste before it leaves the factory.',
      statText:
        'Prevents billions of sachet packets from ever entering Philippine municipal solid waste streams.',
      statNumber: '163M Sachets/Day Targeted',
    },
    2: {
      badge: 'Checkpoint 02 // Point of Purchase',
      title: 'Retail & Consumer Choices',
      withoutTitle: 'Automatic Sando Bags & Takeout Cutlery',
      withoutDesc:
        'Stores routinely distribute single-use thin film sando bags and plastic utensils with every minor purchase, generating thousands of discarded wrappers daily per city.',
      withTitle: 'Bring-Your-Own Bayong & Deposit Jars',
      withDesc:
        'Retailers enforce plastic bag fee surcharges or discounts for reusable containers. Neighborhood stores provide bulk refilling for laundry detergent and cooking oil.',
      statText: 'Saves up to 90% of packaging consumption per participating Filipino household.',
      statNumber: '730+ Bags/Year/Household',
    },
    3: {
      badge: 'Checkpoint 03 // Household Disposal',
      title: 'Waste Segregation at the Source',
      withoutTitle: 'Mixed Garbage in Roadside Channels',
      withoutDesc:
        'Unsegregated waste thrown on streets easily washes into storm drains and road grates during heavy monsoon rains, causing flash floods.',
      withTitle: 'Clean Dry Segregation & Barangay MRFs',
      withDesc:
        'Households separate wet organic food waste for local composting, and route clean plastic recyclables directly to barangay collection co-ops.',
      statText:
        'Enforces compliance with Republic Act 9003 to keep urban storm drainage completely unblocked.',
      statNumber: '80% Collection Rate',
    },
    4: {
      badge: 'Checkpoint 04 // River Transport',
      title: 'Inland River & Waterway Interception',
      withoutTitle: 'Pasig River Plastics Conveyor',
      withoutDesc:
        'An estimated 356,000 metric tons of plastic waste washes down the Pasig River basin annually, emptying directly into Manila Bay.',
      withTitle: 'Solar River Interceptors & Trash Booms',
      withDesc:
        'Automated solar-powered river interceptors and heavy-duty community trash booms trap floating plastics before they reach estuarine bays.',
      statText:
        'Prevents thousands of metric tons of macro-plastics from disintegrating into open coastal waters.',
      statNumber: '356,000 MT River Barrier',
    },
    5: {
      badge: 'Checkpoint 05 // Coastal Marine Web',
      title: 'Reef & Mangrove Protection',
      withoutTitle: 'Microplastic Bioaccumulation & Coral Smothering',
      withoutDesc:
        'Sunlight and wave action fragment floating plastics into sub-5mm particles that suffocate mangrove pneumatophore roots and enter fish digestive tracts.',
      withTitle: 'Marine Protected Areas & Mangrove Reforestation',
      withDesc:
        'Community-led coastal sanctuaries, mangrove greenbelts that trap silt naturally, and regular citizen cleanups keep coastal coral reefs pristine.',
      statText:
        'Shields Philippine fish nurseries, sea turtles, and pelagic commercial fisheries from microplastic contamination.',
      statNumber: '100% Habitat Sanctuary',
    },
  };

  // 5. Philippine Initiatives Filter State
  type InnoFilter = 'all' | 'policy' | 'refill' | 'tech' | 'islands';
  const [innoFilter, setInnoFilter] = useState<InnoFilter>('all');

  const initiatives = [
    {
      id: 'epr',
      category: 'policy',
      categoryLabel: 'Policy & Law',
      badgeColor: 'bg-emerald-950/80 text-emerald-300',
      title: 'EPR Act (Republic Act 11898)',
      desc: 'Mandates large brand owners and enterprises to take financial and operational responsibility for the plastic packaging they produce, legally targeting an 80% recovery footprint by 2028.',
      jurisdiction: 'DENR National Registry. Enforcing accountability on over 400 major corporations.',
      img: 'images/sol-inno-epr-act.jpg',
    },
    {
      id: 'walausik',
      category: 'refill',
      categoryLabel: 'Refill & Business',
      badgeColor: 'bg-teal-950/80 text-teal-300',
      title: 'The "Wala Usik" Refill Sari-Sari',
      desc: 'Pioneered in Western Visayas and Negros, "Wala Usik" (Zero Waste) retrofits neighborhood sari-sari stores with bulk liquid taps. Residents bring their own jars for small, affordable portions without sachets.',
      jurisdiction: 'Demonstrates that micro-portion retail can thrive without single-use plastic waste.',
      img: 'images/sol-inno-wala-usik-refill.jpg',
    },
    {
      id: 'ecopavers',
      category: 'tech',
      categoryLabel: 'Upcycling & Tech',
      badgeColor: 'bg-cyan-950/80 text-cyan-300',
      title: 'Upcycled Eco-Pavers & Structural Lumber',
      desc: 'Philippine social enterprises shred flexible sachet wrappers and mix them with sand, fly ash, and cement to produce heavy-duty sidewalk pavers and hollow blocks for civic schools.',
      jurisdiction: 'Traps low-density polyethylene inside permanent civil infrastructure.',
      img: 'images/sol-inno-ecopavers-lumber.jpg',
    },
    {
      id: 'workers',
      category: 'policy',
      categoryLabel: 'Policy & Equity',
      badgeColor: 'bg-emerald-950/80 text-emerald-300',
      title: 'Waste Worker Dignity & Co-ops',
      desc: 'Informal waste pickers collect over 60% of recyclable plastic in the Philippines. Co-operatives integrate collectors into municipal logistics with dignified living wages, safety gear, and healthcare.',
      jurisdiction: 'Turns informal scavenging into recognized green employment.',
      img: 'images/sol-inno-waste-worker-dignity.jpg',
    },
    {
      id: 'apo',
      category: 'islands',
      categoryLabel: 'Zero-Waste Islands',
      badgeColor: 'bg-teal-950/80 text-teal-300',
      title: 'Apo Island & Siquijor Zero-Waste Models',
      desc: 'Island communities enforce strict single-use plastic prohibitions, decentralized barangay MRFs, and household segregation audits, achieving >70% reduction in ocean-bound municipal waste.',
      jurisdiction: 'Coral cover and sea turtle nesting zones protected from plastic contamination.',
      img: 'images/sol-inno-apo-island-siquijor.jpg',
    },
    {
      id: 'seaweed',
      category: 'tech',
      categoryLabel: 'Upcycling & Tech',
      badgeColor: 'bg-cyan-950/80 text-cyan-300',
      title: 'Seaweed & Cassava Bio-Packaging',
      desc: 'Homegrown Philippine labs formulate flexible packaging films from farmed Eucheuma red seaweeds and cassava starch. The material dissolves in hot water and biodegrades safely in marine water within 90 days.',
      jurisdiction: 'Non-toxic even if ingested by marine organisms or fish.',
      img: 'images/sol-inno-seaweed-cassava-bioplastic.jpg',
    },
  ];

  // 6. Shared Roles State
  type RoleKey = 'individual' | 'business' | 'community' | 'government';
  const [selectedRole, setSelectedRole] = useState<RoleKey>('individual');

  const roleData: Record<
    RoleKey,
    {
      badge: string;
      title: string;
      immediate: string;
      month: string;
      systemic: string;
    }
  > = {
    individual: {
      badge: 'Selected Sector: Individuals & Families',
      title: 'What Can Individuals Do Next?',
      immediate:
        'Carry a personal reusable water flask, reusable spoon/fork, and foldable market bag wherever you go.',
      month:
        'Segregate dry recyclables from wet kitchen scraps; explore a nearby zero-waste refill shop for detergents.',
      systemic:
        'Support barangay cleanup drives, petition favorite food chains to offer plastic-free dine-in, and support waste worker dignity.',
    },
    business: {
      badge: 'Selected Sector: Businesses & Retailers',
      title: 'What Can Businesses Do Next?',
      immediate:
        'Eliminate superfluous plastic packaging wraps and offer paper or bag-free checkout incentives.',
      month:
        'Register audit reports under the Philippine EPR Act and trial refillable container programs.',
      systemic:
        'Redesign core FMCG products into 100% recyclable monomaterials and invest in closed-loop supply chains.',
    },
    community: {
      badge: 'Selected Sector: Barangays & Communities',
      title: 'What Can Communities Do Next?',
      immediate:
        'Establish weekly segregated waste collection routes and distribute color-coded household bins.',
      month:
        'Build or upgrade a functional Materials Recovery Facility (MRF) and initiate trash-to-rice exchange programs.',
      systemic:
        'Formalize informal waste pickers into recognized municipal workers with protective gear and stable wages.',
    },
    government: {
      badge: 'Selected Sector: Government & Regulators',
      title: 'What Can Government Do Next?',
      immediate:
        'Strictly enforce compliance audits under RA 9003 and penalize open-air plastic burning.',
      month:
        'Provide green municipal grants for localized composting centers and river trash booms.',
      systemic:
        'Enforce the 80% corporate recovery mandate under RA 11898 (EPR) and support indigenous bioplastic R&D.',
    },
  };

  // 7. Impact Simulator & Action Pledge State
  const [chkWater, setChkWater] = useState<boolean>(true);
  const [chkSachet, setChkSachet] = useState<boolean>(true);
  const [chkBags, setChkBags] = useState<boolean>(true);
  const [chkCutlery, setChkCutlery] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1);

  let perPersonItems = 0;
  let perPersonWeightGrams = 0;
  if (chkWater) {
    perPersonItems += 365;
    perPersonWeightGrams += 365 * 25;
  }
  if (chkSachet) {
    perPersonItems += 1460;
    perPersonWeightGrams += 1460 * 3;
  }
  if (chkBags) {
    perPersonItems += 730;
    perPersonWeightGrams += 730 * 8;
  }
  if (chkCutlery) {
    perPersonItems += 365;
    perPersonWeightGrams += 365 * 10;
  }

  const totalItems = perPersonItems * scale;
  const totalKg = (perPersonWeightGrams * scale) / 1000;
  const totalCO2 = totalKg * 3.0;

  const [pledgeText, setPledgeText] = useState<string>(
    'I will bring my reusable bottle and bayong to the market this week.'
  );
  const [pledgeCardQuote, setPledgeCardQuote] = useState<string>(
    'I will bring my reusable bottle and bayong to the market this week.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyPledge = () => {
    const textToCopy = `"${pledgeCardQuote}" — My action pledge with PlasticEco.ph`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // 8. Choose the Future State
  type ScenarioKey = 'linear' | 'cleanup' | 'circular';
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('circular');

  const futureScenarios: Record<
    ScenarioKey,
    {
      badge: string;
      title: string;
      desc: string;
    }
  > = {
    linear: {
      badge: 'The Warning: Business As Usual',
      title: 'Linear Expansion: Plastic Outweighs Fish By 2040',
      desc: 'Continuing current trajectories without system redesign results in irreversible microplastic saturation of Manila Bay and the Verde Island Passage, threatening municipal fisheries and coral reef survival.',
    },
    cleanup: {
      badge: 'The Trap: Cleanup Without Prevention',
      title: 'Endless Mop: High Cost, Low Long-Term Recovery',
      desc: 'Cleaning coastal beaches while upstream plastic production and sachet distribution accelerates is an unsustainable treadmill. Prevention at the source is indispensable.',
    },
    circular: {
      badge: 'The Rewritten Path: A Circular Future',
      title: 'Less Unnecessary Plastic Created. Materials Recovered. Communities Empowered.',
      desc: 'By combining Extended Producer Responsibility (EPR) compliance, neighborhood zero-waste refill networks, dignified recycling workers, and protected marine corridors, we create a thriving plastic-free archipelago.',
    },
  };

  return (
    <main className="view-section bg-slate-50 text-slate-800 pt-16 min-h-screen">
      {/* 1. THE VISION: THE FUTURE IS NOT WRITTEN IN PLASTIC */}
      <section
        id="sol-vision"
        className="relative py-20 lg:py-28 px-4 bg-gradient-to-b from-emerald-950 via-teal-900 to-slate-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="images/sol-hero-crystal-waters.jpg"
            alt="Philippine crystal clear coastal waters and white sands"
            className="w-full h-full object-cover opacity-25 filter brightness-110 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-300 text-xs font-bold uppercase tracking-widest shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>The Plastic Future, Rewritten</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-display leading-tight">
            THE FUTURE IS NOT
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
              WRITTEN IN PLASTIC.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 font-light max-w-3xl mx-auto leading-relaxed">
            The crisis across our rivers, shorelines, and cities is profound—but our capacity to redesign the system is greater. Explore how everyday swaps, circular engineering, localized interventions, and collective responsibility rewrite the story of plastics in the Philippines.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#sol-swaps"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 hover:from-emerald-300 hover:to-teal-300 transition hover:scale-105 flex items-center gap-2"
            >
              <span>Explore How We Rewrite It</span>
              <span>↓</span>
            </a>
            <a
              href="#sol-system"
              className="px-7 py-3.5 rounded-full bg-emerald-950/80 text-emerald-200 border border-emerald-400/40 hover:bg-emerald-900 font-bold text-xs uppercase tracking-wider transition hover:scale-105"
            >
              Build The Circular System
            </a>
          </div>

          {/* Key Milestones of Hope */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-bold uppercase mb-1">
                <Icon name="shield" className="w-4 h-4 text-emerald-400" />
                <span>EPR Mandate</span>
              </div>
              <div className="text-3xl font-black text-white font-display">80% Recovery</div>
              <p className="text-xs text-slate-300 mt-1">
                Legally required packaging footprint recovery target for major FMCG corporations by 2028 (RA 11898).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 text-teal-300 text-xs font-mono font-bold uppercase mb-1">
                <Icon name="refresh" className="w-4 h-4 text-teal-400" />
                <span>Refill Economy</span>
              </div>
              <div className="text-3xl font-black text-white font-display">3,000+ Stores</div>
              <p className="text-xs text-slate-300 mt-1">
                Zero-waste sari-sari store refilling pilots providing accessible, sachet-free essentials to local neighborhoods.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold uppercase mb-1">
                <Icon name="sparkles" className="w-4 h-4 text-amber-400" />
                <span>Zero-Waste Islands</span>
              </div>
              <div className="text-3xl font-black text-white font-display">&gt;70% Diversion</div>
              <p className="text-xs text-slate-300 mt-1">
                Model communities like Apo Island and Siquijor redirecting ocean-bound waste into decentralized recovery.
              </p>
            </div>
          </div>

          {/* Interactive Horizon Preview Comparison */}
          <div className="pt-8 max-w-4xl mx-auto">
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-emerald-500/30 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    Interactive Horizon Comparison
                  </span>
                  <h3 className="text-lg font-bold text-white">Compare Two Coastal Futures</h3>
                </div>
                <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-white/10 text-xs">
                  <button
                    onClick={() => setHorizonMode('current')}
                    className={`px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                      horizonMode === 'current'
                        ? 'bg-rose-500 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Degraded Shoreline
                  </button>
                  <button
                    onClick={() => setHorizonMode('restored')}
                    className={`px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                      horizonMode === 'restored'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Restored Philippine Coast
                  </button>
                </div>
              </div>

              <div className="relative h-64 rounded-xl overflow-hidden group">
                <ImageWithFallback
                  src={
                    horizonMode === 'current'
                      ? 'images/sol-horizon-degraded-shoreline.jpg'
                      : 'images/sol-horizon-restored-sanctuary.jpg'
                  }
                  alt={horizonMode === 'current' ? 'Degraded shoreline' : 'Restored coastal sanctuary'}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="max-w-xl">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase mb-1 border ${
                        horizonMode === 'current'
                          ? 'bg-rose-500/30 border-rose-400 text-rose-300'
                          : 'bg-emerald-500/30 border-emerald-400 text-emerald-300'
                      }`}
                    >
                      {horizonMode === 'current'
                        ? 'Status: Degraded Urban Shoreline'
                        : 'Status: Regenerated Sanctuary'}
                    </span>
                    <h4 className="text-xl font-bold text-white">
                      {horizonMode === 'current'
                        ? 'Heavy Tidal Accumulation & Microplastic Washup'
                        : 'Resilient Mangroves & Healthy Coral Gardens'}
                    </h4>
                    <p className="text-xs text-slate-200 mt-0.5">
                      {horizonMode === 'current'
                        ? 'Without intervention, seasonal monsoon runoff deposits millions of single-use sachets, plastic bags, and PET bottles along urban bays.'
                        : 'With plastic pollution intercepted upstream, coastal nurseries recover, sea turtles feed safely, and ecotourism sustains local coastal fisherfolk.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREVENTION: “START WITH ONE CHOICE” — EVERYDAY SWAPS */}
      <section id="sol-swaps" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">
            Journey Stage 01 // Prevention At Source
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display uppercase">
            START WITH ONE CHOICE: THE EVERYDAY SWAP
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Single-use plastic isn't inevitable; it's a packaging design choice. Explore practical, accessible alternatives to everyday items and watch how one personal swap ripples across the entire community and marine environment.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(
            [
              { key: 'sachets', label: 'Sachets & Hygiene', icon: 'sachet' },
              { key: 'bottles', label: 'Bottles & Cups', icon: 'bottle' },
              { key: 'food', label: 'Food & Takeout', icon: 'box' },
              { key: 'ecommerce', label: 'Online Deliveries', icon: 'package' },
            ] as const
          ).map(tab => (
            <button
              key={tab.key}
              onClick={() => setSwapCategory(tab.key)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
                swapCategory === tab.key
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon name={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Swap Comparison and Outward Ripple Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 lg:p-10 rounded-3xl border border-emerald-100 shadow-xl">
          {/* Left: Swap Comparison */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {swapData[swapCategory].badge}
              </span>
              <span className="text-xs text-slate-400">Click tabs above to switch habits</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Old Single Use */}
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>The Single-Use Habit</span>
                </div>
                <h4 className="text-lg font-bold text-rose-950">
                  {swapData[swapCategory].oldTitle}
                </h4>
                <p className="text-xs text-rose-900/80 leading-relaxed">
                  {swapData[swapCategory].oldDesc}
                </p>
                <div className="pt-2 text-[11px] font-semibold text-rose-700">
                  <strong>Common Cost:</strong> ~163M discarded daily in PH.
                </div>
              </div>

              {/* Practical Swap */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <Icon name="check" className="w-4 h-4 text-emerald-600" />
                  <span>Practical Alternative</span>
                </div>
                <h4 className="text-lg font-bold text-emerald-950">
                  {swapData[swapCategory].newTitle}
                </h4>
                <p className="text-xs text-emerald-900/80 leading-relaxed">
                  {swapData[swapCategory].newDesc}
                </p>
                <div className="pt-2 text-[11px] font-semibold text-emerald-800">
                  <strong>Philippine Reality:</strong> Accessible bulk dispensers in pilot <em>sari-sari</em> stores.
                </div>
              </div>
            </div>

            {/* Small Change vs Big Change */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Small Personal Change:</span>
                  <span className="text-slate-600">{swapData[swapCategory].smallChange}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-800 block mb-0.5">System-Wide Impact:</span>
                  <span className="text-slate-600">{swapData[swapCategory].bigChange}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={triggerRippleAnimation}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Icon name="sparkles" />
                <span>Trigger Impact Ripple</span>
              </button>
              <span className="text-xs text-slate-500 italic">See the systemic effect on the right →</span>
            </div>
          </div>

          {/* Right: Animated Impact Ripple Visualizer */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-6 lg:p-8 rounded-2xl text-white space-y-5 shadow-inner">
            <div className="text-center">
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest block">
                The Outward Ripple Effect
              </span>
              <h4 className="text-xl font-bold text-white mt-1">From One Choice to Whole Ecosystems</h4>
              <p className="text-xs text-emerald-100/70 mt-1">
                Tap the rings below to explore each layer of systemic consequence.
              </p>
            </div>

            <div className="space-y-3">
              {(
                [
                  { key: 'me', label: '1. Me (Household)', badge: 'Immediate', color: 'text-amber-300', dot: 'bg-amber-400' },
                  { key: 'store', label: '2. Local Store / Sari-Sari', badge: 'Market', color: 'text-teal-300', dot: 'bg-teal-400' },
                  { key: 'community', label: '3. Barangay Community', badge: 'Infrastructure', color: 'text-cyan-300', dot: 'bg-cyan-400' },
                  { key: 'environment', label: '4. Coastal Environment', badge: 'Ecosystem', color: 'text-emerald-300', dot: 'bg-emerald-400' },
                ] as const
              ).map(ring => (
                <div
                  key={ring.key}
                  onClick={() => setRippleStage(ring.key)}
                  className={`p-3.5 rounded-xl cursor-pointer transition ${
                    rippleStage === ring.key
                      ? 'bg-emerald-800/80 border-2 border-emerald-400'
                      : 'bg-slate-800/50 border border-white/10 hover:bg-emerald-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${ring.color} uppercase flex items-center gap-1.5`}>
                      <span className={`w-2 h-2 rounded-full ${ring.dot}`} />
                      {ring.label}
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">{ring.badge}</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1">
                    {swapData[swapCategory].ripple[ring.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CIRCULAR SYSTEMS: “BUILD A BETTER SYSTEM” — CIRCULAR ECONOMY BUILDER */}
      <section id="sol-system" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <ImageWithFallback
            src="images/sol-circular-system-bg.jpg"
            alt="Circular ocean flow and water currents"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest font-mono">
              Centerpiece Interactive 02 // Circular Systems
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
              BUILD A BETTER PLASTIC SYSTEM
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              The linear "take-make-waste" economy leaks millions of tons into Philippine waters. Connect all 6 stages of a circular system to keep materials valuable and prevent waste at the source.
            </p>
          </div>

          <div className="bg-slate-950 p-6 lg:p-10 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
                  Interactive System Tracker
                </span>
                <h3 className="text-xl font-bold text-white">
                  Tap Each Stage to Connect the Circular Loop
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                  {activeStages.size} of 6 Stages Connected
                </span>
                <button
                  onClick={resetStages}
                  className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* 6 Stage Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
              {[
                { num: 1, name: 'DESIGN', sub: 'Design for less waste' },
                { num: 2, name: 'PRODUCE', sub: 'Responsible manufacturing' },
                { num: 3, name: 'USE', sub: 'Mindful consumption' },
                { num: 4, name: 'REUSE', sub: 'Keep materials circulating' },
                { num: 5, name: 'RECOVER', sub: 'Dignified sorting & MRFs' },
                { num: 6, name: 'REDESIGN', sub: 'Closing loop into materials' },
              ].map(st => {
                const isActive = activeStages.has(st.num);
                const isSelected = selectedStage === st.num;
                return (
                  <button
                    key={st.num}
                    onClick={() => handleStageClick(st.num)}
                    className={`p-3.5 rounded-2xl transition text-left flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/90 border-2 border-emerald-400'
                        : isActive
                        ? 'bg-emerald-950/60 border border-emerald-500/50'
                        : 'bg-slate-900 border border-white/10 hover:border-emerald-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        STAGE 0{st.num}
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                        }`}
                      />
                    </div>
                    <h4 className="font-bold text-white text-sm mt-3">{st.name}</h4>
                    <span className="text-[11px] text-slate-400 mt-1">{st.sub}</span>
                  </button>
                );
              })}
            </div>

            {/* Loop Completed Celebration Banner */}
            {activeStages.size === 6 && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-center shadow-xl animate-fade-in">
                <span className="text-xs uppercase font-mono tracking-widest font-bold block mb-1">
                  🎉 System Loop Fully Connected!
                </span>
                <h4 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-wide">
                  "The best waste system is one that creates less waste in the first place."
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-2xl mx-auto">
                  When product design, retail refill, community collection, and producer responsibility operate as a complete circle, environmental leakage drops to near zero.
                </p>
              </div>
            )}

            {/* Active Stage Deep-Dive Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 p-6 rounded-2xl border border-white/10 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {circuitData[selectedStage].badge}
                  </span>
                  <span className="text-xs text-slate-400">Philippine Implementation</span>
                </div>
                <h4 className="text-2xl font-bold text-white">
                  {circuitData[selectedStage].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {circuitData[selectedStage].desc}
                </p>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 flex flex-col sm:flex-row gap-3 text-xs">
                  <div>
                    <strong className="text-emerald-300 block">Linear Model:</strong>
                    <span className="text-slate-400">{circuitData[selectedStage].linear}</span>
                  </div>
                  <div className="border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3">
                    <strong className="text-teal-300 block">Circular Transformation:</strong>
                    <span className="text-slate-300">{circuitData[selectedStage].circular}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 rounded-xl overflow-hidden border border-white/10 h-44">
                <ImageWithFallback
                  src={circuitData[selectedStage].img}
                  alt={circuitData[selectedStage].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERVENTION: “BREAK THE CHAIN” — INTERCEPT THE PLASTIC */}
      <section id="sol-chain" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">
            Journey Stage 03 // Active Interception
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display uppercase">
            BREAK THE CHAIN: INTERCEPT THE PLASTIC
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            In the Crisis view, we observed how uncollected plastic travels unchecked from households into drainage channels, river basins, and open seas. Now explore how decisive interventions break the conveyor belt at every stage.
          </p>
        </div>

        {/* 5 Checkpoints Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { step: 1, label: '1. Product Design' },
            { step: 2, label: '2. Point of Purchase' },
            { step: 3, label: '3. Household Disposal' },
            { step: 4, label: '4. River Transport' },
            { step: 5, label: '5. Coastal Marine Web' },
          ].map(item => (
            <button
              key={item.step}
              onClick={() => setChainStep(item.step)}
              className={`px-4 py-2 rounded-full font-bold text-xs uppercase transition cursor-pointer ${
                chainStep === item.step
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="bg-white p-6 lg:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
                {chainData[chainStep].badge}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {chainData[chainStep].title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Intervention Mode:</span>
              <button
                onClick={() => setChainInterventionActive(prev => !prev)}
                className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow cursor-pointer ${
                  chainInterventionActive
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    : 'bg-rose-500 hover:bg-rose-400 text-white'
                }`}
              >
                {chainInterventionActive ? '🛡️ Intervene & Redirect' : '⚠️ Unchecked Leakage'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Path A: Without Intervention (Crisis) */}
            <div
              className={`p-6 rounded-2xl bg-rose-50 border-2 border-rose-200 flex flex-col justify-between space-y-4 transition ${
                chainInterventionActive ? 'opacity-60' : 'opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Unchecked Pathway (Crisis)
                  </span>
                  <span className="text-[10px] font-mono text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                    100% Leakage Risk
                  </span>
                </div>
                <h4 className="text-lg font-bold text-rose-950">
                  {chainData[chainStep].withoutTitle}
                </h4>
                <p className="text-xs text-rose-900/80 leading-relaxed mt-2">
                  {chainData[chainStep].withoutDesc}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-rose-200 text-xs text-rose-800">
                <strong>Downstream Consequence:</strong> Moves straight into storm sewers and Pasig River drainage channels.
              </div>
            </div>

            {/* Path B: With Intervention (Solution) */}
            <div
              className={`p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex flex-col justify-between space-y-4 shadow-sm transition ${
                chainInterventionActive ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Icon name="shield" className="w-4 h-4 text-emerald-600" />
                    Targeted Intervention
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    0% Marine Leakage
                  </span>
                </div>
                <h4 className="text-lg font-bold text-emerald-950">
                  {chainData[chainStep].withTitle}
                </h4>
                <p className="text-xs text-emerald-900/80 leading-relaxed mt-2">
                  {chainData[chainStep].withDesc}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-emerald-200 text-xs text-emerald-800">
                <strong>Philippine Success:</strong> Compliance with RA 11898 forces corporations to fund circular collection systems.
              </div>
            </div>
          </div>

          {/* Live Interception Impact Stat */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Ecosystem Benefit at this Checkpoint:</span>
                <span className="text-slate-600">{chainData[chainStep].statText}</span>
              </div>
            </div>
            <span className="text-xl font-black text-emerald-700 font-display whitespace-nowrap">
              {chainData[chainStep].statNumber}
            </span>
          </div>
        </div>
      </section>

      {/* 5. RESTORATION: GROUNDBREAKING PHILIPPINE INITIATIVES */}
      <section id="sol-innovations" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">
            Local Leadership // Proof of Concept
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display uppercase">
            PHILIPPINE INITIATIVES IN ACTION
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            From urban barangays in Metro Manila to isolated marine reserves in the Visayas, Filipino innovators, cooperatives, and local governments are pioneering scalable circular models.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(
            [
              { key: 'all', label: 'All (6)' },
              { key: 'policy', label: 'Policy & Law' },
              { key: 'refill', label: 'Refill & Business' },
              { key: 'tech', label: 'Upcycling & Tech' },
              { key: 'islands', label: 'Zero-Waste Islands' },
            ] as const
          ).map(f => (
            <button
              key={f.key}
              onClick={() => setInnoFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition cursor-pointer ${
                innoFilter === f.key
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 6 Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives
            .filter(inno => innoFilter === 'all' || inno.category === innoFilter)
            .map(inno => (
              <div
                key={inno.id}
                className="glass-solution-card rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={inno.img}
                      alt={inno.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase z-20 ${inno.badgeColor}`}
                    >
                      {inno.categoryLabel}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{inno.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{inno.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800">
                    <strong>Impact:</strong> {inno.jurisdiction}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 6. COLLECTIVE ACTION: “WHO MAKES CHANGE POSSIBLE?” — SHARED RESPONSIBILITY */}
      <section id="sol-roles" className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">
              Multi-Stakeholder Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display uppercase">
              WHO MAKES CHANGE POSSIBLE?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Plastic pollution is not merely a consumer failure. True ecological recovery requires synchronized action across citizens, corporate producers, local communities, and government regulators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(
              [
                {
                  key: 'individual',
                  num: '01',
                  role: 'Individuals',
                  sub: 'CONSUMER FRONTLINE',
                  img: 'images/sol-role-consumer-frontline.jpg',
                  alt: 'Consumer Frontline - Reusables',
                  desc: 'Choose reusable tumblers and bayong bags; segregate waste into clean dry recyclables; decline single-use cutlery on delivery apps.',
                  next: 'Start one new swap this week',
                  activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
                  bgNum: 'bg-emerald-100 text-emerald-700',
                },
                {
                  key: 'business',
                  num: '02',
                  role: 'Businesses',
                  sub: 'PRODUCER RESPONSIBILITY',
                  img: 'images/sol-role-producer-responsibility.jpg',
                  alt: 'Producer Responsibility - Packaging',
                  desc: 'Register under the EPR Law; redesign packaging into monomaterials; fund deposit-return container loops; stock bulk refill options.',
                  next: 'Audit and disclose annual packaging footprint',
                  activeBorder: 'border-teal-500 ring-2 ring-teal-500/20',
                  bgNum: 'bg-teal-100 text-teal-700',
                },
                {
                  key: 'community',
                  num: '03',
                  role: 'Communities',
                  sub: 'GRASSROOTS INFRASTRUCTURE',
                  img: 'images/sol-role-grassroots-infrastructure.jpg',
                  alt: 'Grassroots Infrastructure - MRF',
                  desc: 'Operate barangay Materials Recovery Facilities (MRFs); reward segregation through trash-to-cash; integrate informal waste pickers.',
                  next: 'Equip MRF with clean sorting bays',
                  activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/20',
                  bgNum: 'bg-cyan-100 text-cyan-700',
                },
                {
                  key: 'government',
                  num: '04',
                  role: 'Government',
                  sub: 'ENFORCEMENT & POLICY',
                  img: 'images/sol-role-enforcement-policy.jpg',
                  alt: 'Enforcement & Policy - Compliance',
                  desc: 'Strictly enforce RA 9003 and the EPR Act; fund municipal river interceptors; provide tax incentives for zero-waste packaging startups.',
                  next: 'Implement phased ban on non-essential plastics',
                  activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
                  bgNum: 'bg-amber-100 text-amber-700',
                },
              ] as const
            ).map(roleItem => (
              <div
                key={roleItem.key}
                onClick={() => setSelectedRole(roleItem.key)}
                className={`bg-white p-6 rounded-3xl cursor-pointer transition hover:-translate-y-1 flex flex-col justify-between ${
                  selectedRole === roleItem.key
                    ? `border-2 ${roleItem.activeBorder} shadow-md`
                    : 'border-2 border-slate-200/90 shadow-sm hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${roleItem.bgNum}`}
                    >
                      {roleItem.num}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-600 uppercase tracking-wider">
                      {roleItem.sub}
                    </span>
                  </div>

                  <ImageWithFallback
                    src={roleItem.img}
                    alt={roleItem.alt}
                    placeholderOnly={true}
                    theme="light"
                    className="w-full h-44 sm:h-48 my-4 object-cover"
                  />

                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed mb-4">
                    {roleItem.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-700">
                  → Next Step: {roleItem.next}
                </div>
              </div>
            ))}
          </div>

          {/* Role Detail Focus Box */}
          <div className="mt-8 bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {roleData[selectedRole].badge}
              </span>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-3">
              {roleData[selectedRole].title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Immediate (This Week):</strong>
                <p>{roleData[selectedRole].immediate}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Household Shift (This Month):</strong>
                <p>{roleData[selectedRole].month}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Collective Voice (Systemic):</strong>
                <p>{roleData[selectedRole].systemic}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PERSONAL IMPACT: SIMULATOR & PLEDGE */}
      <section id="sol-simulator" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest font-mono">
              Personal Action // Make It Personal
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight">
              YOUR IMPACT SIMULATOR &amp; PLEDGE
            </h2>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Small changes multiply when adopted consistently. Toggle alternative habits to calculate how much single-use plastic waste your household or community can divert annually from Philippine oceans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 p-6 lg:p-10 rounded-3xl border border-emerald-500/40 shadow-2xl">
            {/* Left: Switches */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-2xl border border-white/10 hover:border-emerald-400 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    <Icon name="bottle" className="text-emerald-400" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Refillable Water Flask / Tumbler</h4>
                    <p className="text-xs text-slate-300">Replaces 1 single-use PET bottle per day</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={chkWater}
                  onChange={e => setChkWater(e.target.checked)}
                  className="w-6 h-6 accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-2xl border border-white/10 hover:border-emerald-400 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    <Icon name="sachet" className="text-emerald-400" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Sachet-Free Hygiene &amp; Refill Taps</h4>
                    <p className="text-xs text-slate-300">Replaces 4 daily shampoo, coffee &amp; soap sachets</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={chkSachet}
                  onChange={e => setChkSachet(e.target.checked)}
                  className="w-6 h-6 accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-2xl border border-white/10 hover:border-emerald-400 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    <Icon name="bag" className="text-emerald-400" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Reusable Woven Bayong &amp; Eco-Bags</h4>
                    <p className="text-xs text-slate-300">Replaces 2 grocery &amp; palengke sando bags per day</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={chkBags}
                  onChange={e => setChkBags(e.target.checked)}
                  className="w-6 h-6 accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/80 rounded-2xl border border-white/10 hover:border-emerald-400 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    <Icon name="utensils" className="text-emerald-400" />
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">BYO Baon Container &amp; Reusable Cutlery</h4>
                    <p className="text-xs text-slate-300">Replaces takeout clamshells and plastic spoons</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={chkCutlery}
                  onChange={e => setChkCutlery(e.target.checked)}
                  className="w-6 h-6 accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Scale Slider */}
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-emerald-300 uppercase">
                    Scale to Household / Organization Size:
                  </label>
                  <span className="font-bold text-amber-300 font-mono">
                    {scale === 1 ? '1 Person' : `${scale} People`}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={scale}
                  onChange={e => setScale(parseInt(e.target.value) || 1)}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>1 Individual</span>
                  <span>Family (5)</span>
                  <span>Barangay / School Club (50)</span>
                </div>
              </div>
            </div>

            {/* Right: Results Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 p-8 rounded-2xl border border-emerald-400/40 text-center space-y-6 shadow-xl">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block font-mono">
                Annual Prevented Environmental Leakage
              </span>

              <div className="space-y-1">
                <span className="text-5xl lg:text-6xl font-black text-amber-300 font-display block">
                  {totalItems.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-100 uppercase tracking-wider font-semibold">
                  Plastic Items Diverted Every Year
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-emerald-700/60">
                <div className="p-3 bg-slate-900/70 rounded-xl border border-white/5">
                  <span className="text-[10px] text-emerald-300 uppercase block font-mono">Saved Weight</span>
                  <span className="text-xl font-bold text-white">{totalKg.toFixed(1)} kg</span>
                </div>
                <div className="p-3 bg-slate-900/70 rounded-xl border border-white/5">
                  <span className="text-[10px] text-emerald-300 uppercase block font-mono">CO₂e Avoided</span>
                  <span className="text-xl font-bold text-emerald-300">{totalCO2.toFixed(1)} kg</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-xs text-emerald-200">
                <span className="text-amber-300 font-bold block mb-0.5">Marine Health Impact:</span>
                <span>
                  Directly prevents ~{Math.round(totalItems * 0.2).toLocaleString()} packaging items from leaking into Philippine river basins and coastal reefs.
                </span>
              </div>
            </div>
          </div>

          {/* Action Commitment Generator */}
          <div className="mt-12 bg-slate-900/90 p-6 lg:p-10 rounded-3xl border border-emerald-500/30">
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-6">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                Personal Commitment
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-display">
                What is one change you could realistically try this week?
              </h3>
              <p className="text-xs text-slate-300">
                Pick a commitment or write your own to generate your Philippine Ocean Guardian badge.
              </p>
            </div>

            {/* Preset Commitment Chips */}
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-6">
              {[
                'Bring my reusable tumbler everywhere I go',
                'Carry a foldable bayong or tote bag for grocery and market runs',
                'Try a refill station for dishwashing liquid or shampoo',
                'Segregate wet food waste from clean dry recyclables at home',
                'Select "No Disposable Cutlery" on every takeout meal order',
              ].map(chip => (
                <button
                  key={chip}
                  onClick={() => {
                    setPledgeText(chip);
                    setPledgeCardQuote(chip);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-emerald-700 border border-white/10 text-xs text-slate-200 font-medium transition cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2 mb-8">
              <input
                type="text"
                value={pledgeText}
                onChange={e => setPledgeText(e.target.value)}
                placeholder="Write your commitment here..."
                className="flex-1 bg-slate-950 border border-emerald-500/40 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
              <button
                onClick={() =>
                  setPledgeCardQuote(pledgeText || 'I will bring my reusable bottle this week.')
                }
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md whitespace-nowrap cursor-pointer"
              >
                Generate Card
              </button>
            </div>

            {/* Personalized Ocean Guardian Pledge Card */}
            <div className="max-w-xl mx-auto bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 p-6 sm:p-8 rounded-2xl border-2 border-emerald-400/50 shadow-2xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-300 font-bold">
                    PH
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider font-bold block">
                      Philippine Marine Guardian Pledge
                    </span>
                    <h4 className="font-bold text-white text-sm">Action For Earth's Ecosystem</h4>
                  </div>
                </div>
                <span className="text-[10px] text-amber-300 font-mono font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  Verified Action
                </span>
              </div>

              <div className="space-y-3 py-2">
                <span className="text-xs text-emerald-200 font-mono block">My Next Step:</span>
                <blockquote className="text-lg sm:text-xl font-bold text-white italic leading-snug">
                  "{pledgeCardQuote}"
                </blockquote>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  By starting with this single habit, I am helping turn off the plastic tap at its source and keeping Philippine shorelines and marine life thriving.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                <span className="text-[11px] text-slate-400 font-mono">PlasticEco.ph // 2026</span>
                <button
                  onClick={handleCopyPledge}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon name="share" />
                  <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy Commitment'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. THE FUTURE: “CHOOSE THE FUTURE” */}
      <section id="sol-future" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest font-mono">
            Final Horizon // Choose The Future
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display uppercase">
            WHICH FUTURE DO WE WORK TOWARD?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Compare three possible ecological trajectories for the Philippine archipelago. The crisis is urgent, but the path we choose right now determines the fate of our marine heritage.
          </p>
        </div>

        {/* 3 Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Scenario 1 */}
          <div
            onClick={() => setSelectedScenario('linear')}
            className={`p-6 rounded-3xl cursor-pointer transition hover:-translate-y-1 shadow-sm flex flex-col justify-between ${
              selectedScenario === 'linear'
                ? 'bg-rose-50/70 border-2 border-rose-500 shadow-md'
                : 'bg-white border-2 border-slate-200 hover:border-rose-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-rose-600 uppercase bg-rose-50 px-2.5 py-1 rounded">
                  Scenario 01
                </span>
                <span className="w-3 h-3 rounded-full bg-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Business As Usual</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Linear production expands unchecked. Tingi sachets and delivery packaging double by 2040 without producer accountability or municipal infrastructure.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Marine Plastic Leakage:</span>
                <strong className="text-rose-600">Critical (+85%)</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Reef Ecosystem Health:</span>
                <strong className="text-rose-600">Severe Decline</strong>
              </div>
            </div>
          </div>

          {/* Scenario 2 */}
          <div
            onClick={() => setSelectedScenario('cleanup')}
            className={`p-6 rounded-3xl cursor-pointer transition hover:-translate-y-1 shadow-sm flex flex-col justify-between ${
              selectedScenario === 'cleanup'
                ? 'bg-amber-50/70 border-2 border-amber-500 shadow-md'
                : 'bg-white border-2 border-slate-200 hover:border-amber-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded">
                  Scenario 02
                </span>
                <span className="w-3 h-3 rounded-full bg-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Cleanup Without Prevention</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Millions spent on continuous beach sweeps while packaging manufacturing increases. Mop the floor while the tap is still running at full pressure.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Public Cleanup Cost:</span>
                <strong className="text-amber-600">Unsustainable</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Microplastic Trajectory:</span>
                <strong className="text-amber-600">Persistent Leakage</strong>
              </div>
            </div>
          </div>

          {/* Scenario 3 */}
          <div
            onClick={() => setSelectedScenario('circular')}
            className={`p-6 rounded-3xl cursor-pointer transition hover:-translate-y-1 shadow-lg flex flex-col justify-between ${
              selectedScenario === 'circular'
                ? 'bg-emerald-50/70 border-2 border-emerald-500'
                : 'bg-white border-2 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase bg-emerald-100 px-2.5 py-1 rounded">
                  Scenario 03 // Recommended
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">A Circular, Restored Philippines</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Prevention and recovery work in unison: producers held to 80% EPR recovery, refill sari-sari networks ubiquitous, dignified waste workers, and pristine reef corridors.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-emerald-200 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Packaging Diverted:</span>
                <strong className="text-emerald-700">Over 90%</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Marine Sanctuaries:</span>
                <strong className="text-emerald-700">Regenerated</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Future Spotlight Box */}
        <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 p-8 sm:p-10 rounded-3xl text-white border border-emerald-500/30 text-center space-y-6">
          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider border border-emerald-400/30">
            {futureScenarios[selectedScenario].badge}
          </span>

          <h3 className="text-2xl sm:text-4xl font-black uppercase font-display leading-tight">
            {futureScenarios[selectedScenario].title}
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/90 font-light max-w-2xl mx-auto leading-relaxed">
            {futureScenarios[selectedScenario].desc}
          </p>

          <div className="text-lg sm:text-xl font-display font-bold text-amber-300 italic pt-2">
            "Every choice shapes the world we leave behind."
          </div>

          {/* Navigation Switchers */}
          <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-white/10">
            <button
              onClick={() => onSwitchView('crisis')}
              className="px-8 py-3.5 rounded-full bg-ocean-800 hover:bg-ocean-700 text-cyan-300 border border-cyan-500/40 font-bold text-xs uppercase tracking-wider transition hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span>← Review Crisis Data</span>
            </button>
            <button
              onClick={() => onSwitchView('gateway')}
              className="px-8 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span>Return to Home</span>
            </button>
            <a
              href="#sol-swaps"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition hover:scale-105"
            >
              <span>Restart Solution Journey ↑</span>
            </a>
          </div>
        </div>
      </section>

      {/* Solution Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 leading-relaxed">
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-sm">
                Key Environmental Policies &amp; Frameworks
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>
                  <strong>Republic Act 11898:</strong> Extended Producer Responsibility (EPR) Act of 2022.
                </li>
                <li>
                  <strong>Republic Act 9003:</strong> Ecological Solid Waste Management Act of 2000.
                </li>
                <li>
                  <strong>DENR Administrative Order:</strong> Guidelines on Phasing Out Non-Essential Single-Use Plastics.
                </li>
                <li>
                  <strong>National Plan of Action on Marine Litter (NPOA-ML):</strong> Philippines Zero Marine Litter 2040.
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-sm">
                Empirical Research References
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>
                  World Bank Group — <em>Market Study for the Philippines Plastics Circularity</em>.
                </li>
                <li>
                  GAIA (Global Alliance for Incinerator Alternatives) — <em>Plastik-onomya &amp; Zero Waste Cities</em>.
                </li>
                <li>
                  DENR-EMB — <em>Solid Waste Management Bureau Annual Assessment</em>.
                </li>
                <li>
                  United Nations Environment Programme (UNEP) — <em>From Pollution to Solution</em>.
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-slate-400 text-[11px] space-y-1">
            <p>PLASTIC ECO PH — The Crisis &amp; The Solution | People and Earth's Ecosystem Academic Platform</p>
            <p className="text-slate-300 font-semibold">Created by Alexies Jean Ballesteros</p>
          </div>
        </div>
      </footer>
    </main>
  );
};
