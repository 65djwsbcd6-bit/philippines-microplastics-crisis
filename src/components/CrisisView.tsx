import React, { useState } from 'react';
import { Icon } from './Icon';
import { ImageWithFallback } from './ImageWithFallback';

interface CrisisViewProps {
  onSwitchView: (view: 'solution') => void;
}

export const CrisisView: React.FC<CrisisViewProps> = ({ onSwitchView }) => {
  // Video control
  const [videoPaused, setVideoPaused] = useState(false);

  // 1. Sachet Calculator State
  const [shampoo, setShampoo] = useState<number>(2);
  const [coffee, setCoffee] = useState<number>(2);
  const [detergent, setDetergent] = useState<number>(1);
  const [condiments, setCondiments] = useState<number>(0);

  const totalDaily = (shampoo || 0) + (coffee || 0) + (detergent || 0) + (condiments || 0);
  const calcMonth = totalDaily * 30;
  const calcYear = totalDaily * 365;
  const calc5Years = calcYear * 5;

  // 2. Interactive Map State
  type MapLocKey = 'manila' | 'pasig' | 'verde';
  const [selectedMapLoc, setSelectedMapLoc] = useState<MapLocKey>('manila');

  const mapLocations: Record<
    MapLocKey,
    {
      title: string;
      issue: string;
      desc: string;
      stat: string;
      img: string;
      source: string;
    }
  > = {
    manila: {
      title: 'Manila Bay Coastline',
      issue: 'Issue: Dense Coastal Marine Litter & Accumulation',
      desc: 'Receives macro and microplastic waste conveyed by multiple tributary river networks across Luzon. Heavy tidal deposition deposits single-use sachets, bags, and PET bottles along urban shorelines.',
      stat: 'Significant seasonal washup of single-use consumer plastics following monsoon storms.',
      img: 'images/manila-bay-shoreline-waste.jpg',
      source: 'Source: DENR-EMB Report',
    },
    pasig: {
      title: 'Pasig River System',
      issue: 'Issue: Major Riverine Plastic Conveyor',
      desc: 'Flowing directly through Metro Manila, the Pasig River basin conveys urban runoff, uncollected residential waste, and fragmented plastics from drainage streams straight into Manila Bay.',
      stat: 'Identified in technical studies as a significant riverine pathway.',
      img: 'images/pasig-river-plastic.jpg',
      source: 'Source: World Bank Hydrological Report',
    },
    verde: {
      title: 'Verde Island Passage',
      issue: 'Issue: Biodiversity Corridor Microplastic Exposure',
      desc: 'Recognized globally as a marine shorefish biodiversity center, surface marine currents convey microplastic fragments and synthetic fibers into delicate coral habitats and nursery grounds.',
      stat: 'High concentration of coastal marine organisms exposed to floating debris.',
      img: 'images/verde-island-passage-reef.jpg',
      source: 'Source: Academic Marine Research',
    },
  };

  // 3. Follow the Plastic Journey State
  const [journeyStage, setJourneyStage] = useState<number>(1);

  const journeyStages: Record<
    number,
    {
      tag: string;
      title: string;
      icon: any;
      desc: string;
      fact: string;
      img: string;
    }
  > = {
    1: {
      tag: 'Stage 1: Community Street Disposal',
      title: 'Uncollected Plastic Sando Bag',
      icon: 'bag',
      desc: 'A thin plastic bag discarded after market shopping sits on an urban curb. Without prompt waste collection, light wind easily shifts it toward road channels.',
      fact: 'Thin-film carrier bags represent one of the most common uncollected items in municipal solid waste streams.',
      img: 'images/ph-street-plastic-bag.jpg',
    },
    2: {
      tag: 'Stage 2: Urban Drainage Network',
      title: 'Storm Drains & Culverts',
      icon: 'rain',
      desc: 'Monsoon rains wash uncollected road trash directly into open municipal storm drains, clogging drainage grids and escalating localized flooding.',
      fact: 'Storm drains serve as the initial hydrological funnel moving urban litter into natural river channels.',
      img: 'images/ph-clogged-drainage-metro-manila.jpg',
    },
    3: {
      tag: 'Stage 3: River Basin Transport',
      title: 'River Outfalls (Pasig / Tullahan)',
      icon: 'waves',
      desc: 'The bag travels along river currents downstream toward estuarine bays, hitting rocks and weathering under solar UV exposure.',
      fact: 'Major river systems convey hundreds of thousands of metric tons of waste annually.',
      img: 'images/pasig-river-plastic.jpg',
    },
    4: {
      tag: 'Stage 4: Coastal Shoreline Accumulation',
      title: 'Tidal Beach Deposition',
      icon: 'umbrella',
      desc: 'Tides deposit floating plastic onto coastal shorelines, entangling mangrove prop roots and creating beach litter.',
      fact: 'Coastal mangroves trap large quantities of floating plastics, affecting root aeration.',
      img: 'images/ph-beach-plastic-waste.jpg',
    },
    5: {
      tag: 'Stage 5: Marine Degradation',
      title: 'Ocean Fragmentation into Microplastics',
      icon: 'micro',
      desc: 'Sunlight and salt water embrittle the bag, breaking it down into microscopic particles under 5mm.',
      fact: 'Microplastics stay floating suspended in water columns indefinitely.',
      img: 'images/ph-ocean-floating-plastic.jpg',
    },
    6: {
      tag: 'Stage 6: Trophic Food Web Entry',
      title: 'Marine Ingestion & Food Web Entry',
      icon: 'fish',
      desc: 'Fish and marine organisms ingest microplastic particles, mistaking floating fragments for natural plankton.',
      fact: 'Microparticles bioaccumulate upward through marine food chains.',
      img: 'images/ph-sea-turtle-plastic.jpg',
    },
  };

  // 4. Food Delivery Inspection State
  type DeliveryKey = 'container' | 'cup' | 'straw' | 'utensils' | 'bag' | 'sachet';
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryKey>('container');

  const deliveryData: Record<
    DeliveryKey,
    {
      title: string;
      label: string;
      icon: 'clamshell' | 'delivery-cup' | 'delivery-straw' | 'delivery-cutlery' | 'delivery-bag' | 'delivery-sachet';
      why: string;
      after: string;
    }
  > = {
    container: {
      title: 'Clamshell Meal Container',
      label: 'Meal Container',
      icon: 'clamshell',
      why: 'Provides thermal insulation and prevents spillages during transit.',
      after:
        'Commonly made of rigid expanded polystyrene or polypropylene. Low recycling demand means most go directly to landfills or incinerators.',
    },
    cup: {
      title: 'Plastic Cup & Lid',
      label: 'Plastic Cup & Lid',
      icon: 'delivery-cup',
      why: 'Holds cold beverages and sealed with a film lid to prevent liquid spills during transit.',
      after:
        'Thin sealing film cannot be recycled and breaks easily into small plastic fragments, while clear PET cups often escape collection.',
    },
    straw: {
      title: 'Plastic Straw',
      label: 'Plastic Straw',
      icon: 'delivery-straw',
      why: 'Included automatically for convenient cold beverage consumption.',
      after:
        'Lightweight size causes it to easily fall through sorting screens, washing into storm drains and coastal waters.',
    },
    utensils: {
      title: 'Spoon & Fork',
      label: 'Spoon & Fork',
      icon: 'delivery-cutlery',
      why: 'Bundled into takeout orders to enable eating away from home.',
      after:
        'Used for only 15 minutes, single-use cutlery persists in soil and landfills for decades.',
    },
    bag: {
      title: 'Carrier Bag',
      label: 'Carrier Bag',
      icon: 'delivery-bag',
      why: 'Holds all meal containers and cups together during transport.',
      after:
        'Easily carried by wind into drainage waterways if discarded improperly, choking storm pump stations during typhoons.',
    },
    sachet: {
      title: 'Sauce Sachet',
      label: 'Sauce Sachet',
      icon: 'delivery-sachet',
      why: 'Provides single-serving portions of soy sauce, calamansi, ketchup, or hot sauce.',
      after:
        'Laminated plastic-metal layers render condiment sachets non-recyclable, turning into persistent microplastic debris.',
    },
  };

  // 5. Timeline Inspector State
  type TimelineKey = 'morning' | 'afternoon' | 'evening' | 'online';
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineKey>('morning');

  const timelineData: Record<
    TimelineKey,
    {
      tag: string;
      title: string;
      desc: string;
      img: string;
    }
  > = {
    morning: {
      tag: 'Timeframe: Morning (07:00 AM)',
      title: 'Hygiene Sachets & Instant Coffee Packets',
      desc: 'Mornings routinely begin with multi-layer foil sachets for shampoo, toothpaste, and 3-in-1 coffee. These single-serving items are opened and thrown away within minutes.',
      img: 'images/ph-morning-sachets.jpg',
    },
    afternoon: {
      tag: 'Timeframe: Afternoon (03:30 PM)',
      title: 'Iced Beverage Cups & Straws',
      desc: 'Afternoon refreshments feature single-use plastic cups, dome lids, plastic sleeves, and straws consumed during breaks.',
      img: 'images/ph-iced-drink-plastic-cup.jpg',
    },
    evening: {
      tag: 'Timeframe: Evening (07:30 PM)',
      title: 'Takeout Dinner Containers & Cutlery',
      desc: 'Evening meals ordered via food delivery platforms arrive wrapped in plastic bags containing food boxes, plastic spoons, and sauce packets.',
      img: 'images/ph-takeout-lunch-utensils.jpg',
    },
    online: {
      tag: 'Timeframe: Online Shopping Delivery',
      title: 'Courier Poly-pouches & Bubble Wrap',
      desc: 'E-commerce deliveries arrive wrapped in multiple protective layers: poly-courier pouches, bubble wrap, and plastic packaging tape.',
      img: 'images/ph-online-shopping-courier-pouch.jpg',
    },
  };

  // 6. Marine Food Web Inspector State
  type TrophicKey = 'micro' | 'plankton' | 'smallfish' | 'largefish' | 'marine' | 'people';
  const [selectedTrophic, setSelectedTrophic] = useState<TrophicKey>('micro');

  const trophicData: Record<
    TrophicKey,
    {
      tag: string;
      title: string;
      desc: string;
      note: string;
    }
  > = {
    micro: {
      tag: 'Level: Base Physical Contaminant',
      title: 'Microplastic Particles in Water Sediment',
      desc: 'Tiny plastic fragments smaller than 5 millimeters float suspended in surface currents or settle into benthic seabed sediment.',
      note: 'Originates from primary manufacturing resin pellets or secondary degradation of macro plastics.',
    },
    plankton: {
      tag: 'Level: Primary Producers & Filter Feeders',
      title: 'Zooplankton & Microscopic Organisms',
      desc: 'Filter-feeding zooplankton ingest floating microparticles mistaken for phytoplankton, making them the initial biological vector.',
      note: 'Passes synthetic polymers into the biological food web.',
    },
    smallfish: {
      tag: 'Level: Primary Consumers',
      title: 'Small Coastal Fish & Shellfish',
      desc: 'Small forage fish consume plankton along with ingested plastic particles, accumulating synthetic fibers in digestive tracts.',
      note: 'Serves as food for larger commercial marine species.',
    },
    largefish: {
      tag: 'Level: Secondary / Apex Consumers',
      title: 'Pelagic & Commercial Fish Species',
      desc: 'Larger pelagic fish consume smaller marine organisms, concentrating non-biodegradable particles up trophic levels.',
      note: 'Directly harvested by commercial marine fisheries.',
    },
    marine: {
      tag: 'Level: Protected Marine Life',
      title: 'Sea Turtles & Cetaceans',
      desc: 'Sea turtles ingest floating plastic debris resembling jellyfish, leading to physical blockages and internal injury.',
      note: 'Macro debris causes gut impaction and entanglement.',
    },
    people: {
      tag: 'Level: Human Consumers',
      title: 'Human Seafood Consumption',
      desc: 'Microplastics enter human diets through seafood, salt, and water sources.',
      note: 'Potential health impacts remain a topic of active ongoing global scientific research.',
    },
  };

  // 7. Zoom Slider State
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const zoomLevels: Record<
    number,
    {
      icon: any;
      title: string;
      desc: string;
      ref: string;
    }
  > = {
    1: {
      icon: 'bottle',
      title: 'Stage 1: Intact PET Bottle (Macro Plastic)',
      desc: 'Large, easily visible bottle structure. At this stage, waste is readily noticeable along riverbanks and shorelines.',
      ref: 'Reference Scale: ~200 mm',
    },
    2: {
      icon: 'puzzle',
      title: 'Stage 2: Weathered Fragment (Macro-to-Micro)',
      desc: 'Sunlight and wave impact crack the plastic into coarse fragments ranging from 10mm to 50mm.',
      ref: 'Reference Scale: ~20 mm',
    },
    3: {
      icon: 'micro',
      title: 'Stage 3: Microplastic Particles (< 5 mm)',
      desc: 'Tiny resin particles smaller than 5mm. At this scale, particles float suspended in water columns and sediment.',
      ref: 'Reference Scale: < 5 mm (Microscopic Threshold)',
    },
  };

  // 8. Key Stats Reveal State
  const [revealedStats, setRevealedStats] = useState<Record<string, boolean>>({});
  const toggleStat = (id: string) => {
    setRevealedStats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="view-section bg-ocean-900 text-slate-100 overflow-x-hidden min-h-screen">
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            id="heroVideo"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            autoPlay={!videoPaused}
            muted
            loop
            playsInline
            preload="metadata"
            poster="images/manila-bay-shoreline-plastic.jpg"
            aria-hidden="true"
          >
            <source src="videos/hero-manila-bay.mp4" type="video/mp4" />
          </video>
          <img
            src="images/manila-bay-shoreline-plastic.jpg"
            alt="Plastic waste along the Manila Bay shoreline"
            className="w-full h-full object-cover opacity-25 filter contrast-125"
            onError={e => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-6">
            People &amp; Earth's Ecosystem Academic Presentation
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight mb-6 uppercase">
            THE PLASTIC WE THROW AWAY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              NEVER TRULY GOES AWAY
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Exploring the Global Plastic &amp; Microplastic Crisis through the Philippines. Plastic is deeply intertwined with daily Filipino life—from sachet culture to takeout delivery. But where does it go after disposal?
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="#interactives"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition hover:scale-105"
            >
              EXPLORE INTERACTIVE HUB ↓
            </a>
          </div>

          <div className="mt-12">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Everyday Consumer Plastics → Environmental Dispersal
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="glass-card rounded-xl overflow-hidden group">
                <ImageWithFallback
                  src="images/ph-plastic-bottles-waste.jpg"
                  alt="PET Bottles"
                  className="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="p-2.5 text-center bg-ocean-800/80">
                  <span className="text-xs font-medium text-slate-200">
                    PET Bottled Beverage Packaging
                  </span>
                </div>
              </div>
              <div className="glass-card rounded-xl overflow-hidden group">
                <ImageWithFallback
                  src="images/ph-sari-sari-sachets.jpg"
                  alt="Single-use Sachets"
                  className="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="p-2.5 text-center bg-ocean-800/80">
                  <span className="text-xs font-medium text-slate-200">
                    Multi-layer Sachet Packaging
                  </span>
                </div>
              </div>
              <div className="glass-card rounded-xl overflow-hidden group">
                <ImageWithFallback
                  src="images/ph-plastic-bags-utensils.jpg"
                  alt="Plastic Bags and Utensils"
                  className="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="p-2.5 text-center bg-ocean-800/80">
                  <span className="text-xs font-medium text-slate-200">
                    Single-Use Shopping Bags &amp; Utensils
                  </span>
                </div>
              </div>
              <div className="glass-card rounded-xl overflow-hidden group">
                <ImageWithFallback
                  src="images/manila-bay-shoreline-accumulation.jpg"
                  alt="Manila Bay shoreline with accumulated plastic"
                  className="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="p-2.5 text-center bg-ocean-800/80">
                  <span className="text-xs font-medium text-slate-200">
                    Philippine Shoreline Accumulation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const vid = document.getElementById('heroVideo') as HTMLVideoElement | null;
            if (vid) {
              if (vid.paused) {
                vid.play();
                setVideoPaused(false);
              } else {
                vid.pause();
                setVideoPaused(true);
              }
            }
          }}
          type="button"
          className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/50 border border-white/20 text-[11px] text-slate-200 hover:bg-black/70 cursor-pointer"
          aria-label={videoPaused ? 'Play background video' : 'Pause background video'}
        >
          {videoPaused ? 'Play video' : 'Pause video'}
        </button>
      </section>

      {/* SECTION: INTERACTIVE FEATURES HUB */}
      <section
        id="interactives"
        className="py-20 px-4 max-w-7xl mx-auto space-y-20 border-t border-cyan-500/20"
      >
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Interactive Discovery Modules
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
            EXPLORE THE CRISIS FIRSTHAND
          </h2>
          <p className="text-slate-300">
            Click, calculate, zoom, and navigate through interactive modules designed to reveal how everyday plastic decisions impact Philippine ecosystems.
          </p>
        </div>

        {/* 1. SACHET CALCULATOR */}
        <div className="glass-panel p-6 lg:p-10 rounded-2xl border border-cyan-500/30">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
              Interactive Tool 01
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              HOW MANY SACHETS DO YOU USE?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Enter your common daily household sachet consumption across various categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-ocean-900/80 p-3 rounded-lg border border-white/5">
                  <label className="block text-slate-300 font-semibold mb-1">Shampoo &amp; Soap</label>
                  <input
                    type="number"
                    min="0"
                    value={shampoo}
                    onChange={e => setShampoo(parseInt(e.target.value) || 0)}
                    className="w-full bg-ocean-950 border border-cyan-500/40 rounded px-2.5 py-1 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="bg-ocean-900/80 p-3 rounded-lg border border-white/5">
                  <label className="block text-slate-300 font-semibold mb-1">Instant Coffee</label>
                  <input
                    type="number"
                    min="0"
                    value={coffee}
                    onChange={e => setCoffee(parseInt(e.target.value) || 0)}
                    className="w-full bg-ocean-950 border border-cyan-500/40 rounded px-2.5 py-1 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="bg-ocean-900/80 p-3 rounded-lg border border-white/5">
                  <label className="block text-slate-300 font-semibold mb-1">Laundry Detergent</label>
                  <input
                    type="number"
                    min="0"
                    value={detergent}
                    onChange={e => setDetergent(parseInt(e.target.value) || 0)}
                    className="w-full bg-ocean-950 border border-cyan-500/40 rounded px-2.5 py-1 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="bg-ocean-900/80 p-3 rounded-lg border border-white/5">
                  <label className="block text-slate-300 font-semibold mb-1">Condiments / Other</label>
                  <input
                    type="number"
                    min="0"
                    value={condiments}
                    onChange={e => setCondiments(parseInt(e.target.value) || 0)}
                    className="w-full bg-ocean-950 border border-cyan-500/40 rounded px-2.5 py-1 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="p-4 bg-ocean-950/80 rounded-xl border border-cyan-500/30 text-center">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                  Estimated Total Daily Use
                </span>
                <span className="text-3xl font-black text-amber-400 font-display">
                  {totalDaily} Sachets / Day
                </span>
              </div>
            </div>

            <div className="bg-ocean-950/90 p-6 rounded-xl border border-white/10 text-center space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Calculated Consumption Projection
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 glass-card rounded-lg">
                  <span className="text-[10px] text-slate-400 block uppercase">Per Month</span>
                  <span className="text-lg font-bold text-white">{calcMonth.toLocaleString()}</span>
                </div>
                <div className="p-3 glass-card rounded-lg bg-cyan-900/30 border-cyan-400/40">
                  <span className="text-[10px] text-cyan-300 block uppercase font-bold">Per Year</span>
                  <span className="text-xl font-extrabold text-cyan-300">{calcYear.toLocaleString()}</span>
                </div>
                <div className="p-3 glass-card rounded-lg">
                  <span className="text-[10px] text-slate-400 block uppercase">In 5 Years</span>
                  <span className="text-lg font-bold text-amber-400">{calc5Years.toLocaleString()}</span>
                </div>
              </div>

              <div className="py-2 text-2xl tracking-widest break-all h-16 overflow-y-auto bg-ocean-900/50 p-2 rounded flex flex-wrap items-center justify-center gap-1">
                {totalDaily === 0 ? (
                  <span className="text-xs text-slate-500 italic">No sachets selected</span>
                ) : (
                  Array.from({ length: Math.min(totalDaily, 30) }).map((_, i) => (
                    <Icon key={i} name="sachet" className="w-5 h-5 text-amber-400" />
                  ))
                )}
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed">
                "One sachet seems small. Multiply that by millions of people, and the scale becomes much bigger."
              </p>
              <p className="text-[10px] text-slate-400">
                Note: This is an estimate of household usage, not a direct measurement of environmental leakage.
              </p>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE PHILIPPINES PLASTIC MAP */}
        <div className="glass-panel p-6 lg:p-10 rounded-2xl border border-cyan-500/30">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">
              Interactive Tool 02
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              WHERE DOES PLASTIC SHOW UP?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Click documented Philippine environmental hotspots to inspect research findings and photographs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 relative bg-ocean-950 rounded-xl p-4 border border-white/10 flex flex-col items-center justify-center min-h-[380px]">
              <div className="text-xs text-slate-400 mb-2 font-mono">
                Interactive Geographic Hotspot Map
              </div>
              <div className="relative w-full h-80 bg-ocean-900 rounded-lg overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 400 560"
                  className="w-full h-full"
                  role="img"
                  aria-label="Simplified map of the Philippines with three plastic study locations"
                >
                  <polygon
                    points="155.8,19.0 205.2,15.2 220.4,68.4 216.6,114.0 193.8,144.4 209.0,182.4 266.0,193.8 292.6,239.4 262.2,224.2 231.8,193.8 193.8,197.6 159.6,186.2 133.0,159.6 144.4,106.4 148.2,57.0"
                    fill="#133544"
                    stroke="#388ea8"
                    strokeWidth="1"
                  />
                  <polygon
                    points="144.4,209.0 186.2,212.8 190.0,254.6 167.2,258.4 148.2,228.0"
                    fill="#133544"
                    stroke="#388ea8"
                    strokeWidth="1"
                  />
                  <polygon
                    points="26.6,402.8 68.4,364.8 114.0,296.4 125.4,288.8 106.4,334.4 72.2,387.6 41.8,410.4"
                    fill="#133544"
                    stroke="#388ea8"
                    strokeWidth="1"
                  />
                  <polygon
                    points="205.2,269.8 250.8,285.0 239.4,323.0 212.8,326.8 205.2,304.0"
                    fill="#133544"
                    stroke="#388ea8"
                    strokeWidth="1"
                  />
                  <polygon
                    points="224.2,307.8 262.2,323.0 254.6,368.6 228.0,372.4 220.4,334.4"
                    fill="#133544"
                    stroke="#388ea8"
                    strokeWidth="1"
                  />
                  <polygon
                    points="292.6,247.0 345.8,250.8 342.0,304.0 323.0,334.4 304.0,334.4 296.4,288.8"
                    fill="#133544"
                    stroke="#388ea8"
                    strokeWidth="1"
                  />
                  <polygon
                    points="205.2,410.4 266.0,391.4 311.6,391.4 361.0,353.4 380.0,418.0 368.6,475.0 342.0,497.8 304.0,478.8 266.0,456.0 209.0,459.8"
                    fill="#133544"
                    stroke="#388ea8"
                    strokeWidth="1"
                  />

                  {/* Hotspot 1: Manila Bay */}
                  <g
                    onClick={() => setSelectedMapLoc('manila')}
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    role="button"
                    aria-label="Manila Bay"
                    onKeyDown={e => e.key === 'Enter' && setSelectedMapLoc('manila')}
                  >
                    <circle cx="163.4" cy="171.0" r="11" fill="#e63946" opacity=".25">
                      <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      cx="163.4"
                      cy="171.0"
                      r="8"
                      fill="#e63946"
                      stroke={selectedMapLoc === 'manila' ? '#fbbf24' : '#fff'}
                      strokeWidth={selectedMapLoc === 'manila' ? '3' : '2'}
                    />
                    <text x="163.4" y="174.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#000">
                      1
                    </text>
                  </g>

                  {/* Hotspot 2: Pasig River */}
                  <g
                    onClick={() => setSelectedMapLoc('pasig')}
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    role="button"
                    aria-label="Pasig River"
                    onKeyDown={e => e.key === 'Enter' && setSelectedMapLoc('pasig')}
                  >
                    <circle cx="172.9" cy="166.4" r="11" fill="#fbbf24" opacity=".25">
                      <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      cx="172.9"
                      cy="166.4"
                      r="8"
                      fill="#fbbf24"
                      stroke={selectedMapLoc === 'pasig' ? '#fff' : '#000'}
                      strokeWidth={selectedMapLoc === 'pasig' ? '3' : '2'}
                    />
                    <text x="172.9" y="169.9" textAnchor="middle" fontSize="10" fontWeight="700" fill="#000">
                      2
                    </text>
                  </g>

                  {/* Hotspot 3: Verde Island Passage */}
                  <g
                    onClick={() => setSelectedMapLoc('verde')}
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    role="button"
                    aria-label="Verde Island Passage"
                    onKeyDown={e => e.key === 'Enter' && setSelectedMapLoc('verde')}
                  >
                    <circle cx="171.0" cy="203.3" r="11" fill="#34d399" opacity=".25">
                      <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle
                      cx="171.0"
                      cy="203.3"
                      r="8"
                      fill="#34d399"
                      stroke={selectedMapLoc === 'verde' ? '#fbbf24' : '#fff'}
                      strokeWidth={selectedMapLoc === 'verde' ? '3' : '2'}
                    />
                    <text x="171.0" y="206.8" textAnchor="middle" fontSize="10" fontWeight="700" fill="#000">
                      3
                    </text>
                  </g>
                </svg>
              </div>
              <span className="text-[10px] text-slate-400 mt-2">
                Simplified outline, not to scale. Click pins 1, 2 or 3. Unmarked areas are not free of plastic.
              </span>
            </div>

            <div className="lg:col-span-7 bg-ocean-950 p-6 rounded-xl border border-cyan-500/30 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-plasticRed uppercase tracking-wider flex items-center gap-1">
                    <Icon name="pin" /> Selected Hotspot
                  </span>
                  <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {mapLocations[selectedMapLoc].source}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {mapLocations[selectedMapLoc].title}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mb-3">
                  {mapLocations[selectedMapLoc].issue}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {mapLocations[selectedMapLoc].desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-3 border-t border-white/10">
                <ImageWithFallback
                  src={mapLocations[selectedMapLoc].img}
                  alt={mapLocations[selectedMapLoc].title}
                  className="w-full h-28 object-cover rounded-lg"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    Documented Statistic
                  </span>
                  <p className="text-sm font-extrabold text-cyan-300">
                    {mapLocations[selectedMapLoc].stat}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. FOLLOW THE PLASTIC INTERACTIVE JOURNEY */}
        <div className="glass-panel p-6 lg:p-10 rounded-2xl border border-cyan-500/30">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">
              Interactive Tool 03
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              WHERE DOES THIS PLASTIC GO?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Click each stage to trace a single plastic bag's movement from a Filipino street to the marine web.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <button
                key={num}
                onClick={() => setJourneyStage(num)}
                className={`px-3 py-1.5 rounded-full text-xs transition cursor-pointer ${
                  journeyStage === num
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-ocean-800 text-slate-300 hover:bg-ocean-700'
                }`}
              >
                {num}. {['Street', 'Drainage', 'River', 'Coast', 'Ocean', 'Marine Web'][num - 1]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-ocean-950 p-6 rounded-xl border border-white/10">
            <ImageWithFallback
              src={journeyStages[journeyStage].img}
              alt={journeyStages[journeyStage].title}
              className="w-full h-56 object-cover rounded-lg"
            />
            <div className="space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">
                {journeyStages[journeyStage].tag}
              </span>
              <h4 className="text-2xl font-bold text-white flex items-center gap-2">
                <Icon name={journeyStages[journeyStage].icon} />
                <span>{journeyStages[journeyStage].title}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {journeyStages[journeyStage].desc}
              </p>
              <div className="p-3 bg-ocean-900 rounded-lg border border-cyan-500/30">
                <strong className="text-xs text-cyan-300 block mb-0.5">Factual Insight:</strong>
                <span className="text-xs text-slate-300">
                  {journeyStages[journeyStage].fact}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. WHAT'S IN ONE DELIVERY? INTERACTIVE */}
        <div className="rounded-3xl bg-[#061621] p-6 sm:p-10 lg:p-12 border border-[#143444] shadow-2xl">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <span className="text-cyan-400 font-bold text-xs sm:text-sm uppercase tracking-wider block mb-2 sm:mb-3">
              INTERACTIVE TOOL 04
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display uppercase tracking-tight leading-tight">
              HOW MUCH PLASTIC CAN COME WITH ONE DELIVERY?
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-slate-300 mt-3 sm:mt-4 max-w-3xl mx-auto leading-relaxed">
              Click any packaging component in a standard takeout meal order to inspect its purpose and post-disposal journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* 3x2 Grid of Delivery Packaging Items */}
            <div className="lg:col-span-6 grid grid-cols-3 gap-2.5 sm:gap-3.5">
              {(
                [
                  { key: 'container', label: 'Meal Container', icon: 'clamshell' },
                  { key: 'cup', label: 'Plastic Cup & Lid', icon: 'delivery-cup' },
                  { key: 'straw', label: 'Plastic Straw', icon: 'delivery-straw' },
                  { key: 'utensils', label: 'Spoon & Fork', icon: 'delivery-cutlery' },
                  { key: 'bag', label: 'Carrier Bag', icon: 'delivery-bag' },
                  { key: 'sachet', label: 'Sauce Sachet', icon: 'delivery-sachet' },
                ] as const
              ).map(item => {
                const isSelected = selectedDelivery === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedDelivery(item.key)}
                    className={`group rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer min-h-[110px] sm:min-h-[125px] ${
                      isSelected
                        ? 'bg-[#102a37] border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.22)] ring-1 ring-cyan-400/40'
                        : 'bg-[#0c202a] border border-[#173a4b] hover:border-cyan-500/50 hover:bg-[#122b39] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    <div
                      className={`mb-2 sm:mb-2.5 transition-transform duration-200 flex items-center justify-center ${
                        isSelected
                          ? 'scale-110 text-white'
                          : 'text-slate-200 group-hover:text-white group-hover:scale-105'
                      }`}
                    >
                      <Icon name={item.icon} className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Inspector Panel */}
            <div className="lg:col-span-6 rounded-2xl bg-[#061218] p-6 sm:p-8 border border-[#142833] shadow-2xl flex flex-col justify-center min-h-[250px]">
              <span className="text-cyan-400 font-bold tracking-wider text-xs uppercase mb-3 sm:mb-4 block">
                SELECT AN ITEM ABOVE
              </span>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 text-white flex items-center justify-center shrink-0">
                  <Icon name={deliveryData[selectedDelivery].icon} className="w-9 h-9 sm:w-10 sm:h-10" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight">
                  {deliveryData[selectedDelivery].title}
                </h4>
              </div>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-slate-300">
                <p>
                  <strong className="font-bold text-white">Why it's used: </strong>
                  {deliveryData[selectedDelivery].why}
                </p>
                <p>
                  <strong className="font-bold text-white">After Disposal: </strong>
                  {deliveryData[selectedDelivery].after}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. A DAY OF PLASTIC INTERACTIVE TIMELINE */}
        <div className="glass-panel p-6 lg:p-10 rounded-2xl border border-cyan-500/30">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-purple-400 font-bold text-xs uppercase tracking-widest">
              Interactive Tool 05
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              HOW MUCH PLASTIC DO WE ENCOUNTER IN ONE DAY?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Click timeframes to discover everyday single-use plastic touchpoints across an ordinary day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-center">
            {(
              [
                { key: 'morning', label: 'Morning Routine', icon: 'sunrise' },
                { key: 'afternoon', label: 'Afternoon Snack', icon: 'sun' },
                { key: 'evening', label: 'Evening Delivery', icon: 'moon' },
                { key: 'online', label: 'Online Shopping', icon: 'package' },
              ] as const
            ).map(t => (
              <button
                key={t.key}
                onClick={() => setSelectedTimeline(t.key)}
                className={`p-3 glass-card rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedTimeline === t.key
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-900/30'
                    : 'text-slate-300'
                }`}
              >
                <Icon name={t.icon} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-ocean-950 p-6 rounded-xl border border-white/10">
            <ImageWithFallback
              src={timelineData[selectedTimeline].img}
              alt={timelineData[selectedTimeline].title}
              className="w-full h-52 object-cover rounded-lg"
            />
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                {timelineData[selectedTimeline].tag}
              </span>
              <h4 className="text-xl font-bold text-white">
                {timelineData[selectedTimeline].title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {timelineData[selectedTimeline].desc}
              </p>
            </div>
          </div>
        </div>

        {/* 6. INTERACTIVE FOOD WEB */}
        <div className="glass-panel p-6 lg:p-10 rounded-2xl border border-cyan-500/30">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-rose-400 font-bold text-xs uppercase tracking-widest">
              Interactive Tool 06
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              WHERE CAN MICROPLASTICS TRAVEL?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Click each organism in the marine trophic sequence to examine microplastic transfer dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center mb-8">
            {(
              [
                { key: 'micro', label: 'Microplastics', file: 'images/trophic-microplastics.jpg', isAccent: true },
                { key: 'plankton', label: 'Plankton', file: 'images/trophic-plankton.jpg', isAccent: false },
                { key: 'smallfish', label: 'Small Fish', file: 'images/trophic-small-fish.jpg', isAccent: false },
                { key: 'largefish', label: 'Larger Fish', file: 'images/trophic-larger-fish.jpg', isAccent: false },
                { key: 'marine', label: 'Marine Life', file: 'images/trophic-marine-life.jpg', isAccent: false },
                { key: 'people', label: 'People', file: 'images/trophic-people.jpg', isAccent: false },
              ] as const
            ).map(trophic => {
              const isSelected = selectedTrophic === trophic.key;
              return (
                <button
                  key={trophic.key}
                  type="button"
                  onClick={() => setSelectedTrophic(trophic.key)}
                  className={`group rounded-2xl p-4 sm:p-5 text-center transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-rose-400 bg-[#122835] shadow-[0_0_24px_rgba(244,114,182,0.22)]'
                      : 'border border-[#173847] bg-[#0c1f2a] hover:border-rose-400/50 hover:bg-[#102735]'
                  }`}
                >
                  <ImageWithFallback
                    src={trophic.file}
                    alt={trophic.label}
                    placeholderOnly={true}
                    className="w-full h-36 sm:h-44 mb-4 object-cover"
                  />
                  <span
                    className={`font-bold text-sm sm:text-base block tracking-tight ${
                      trophic.isAccent || isSelected ? 'text-rose-400' : 'text-white'
                    }`}
                  >
                    {trophic.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-ocean-950 p-6 rounded-xl border border-white/10 space-y-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block">
              {trophicData[selectedTrophic].tag}
            </span>
            <h4 className="text-2xl font-bold text-white">
              {trophicData[selectedTrophic].title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {trophicData[selectedTrophic].desc}
            </p>
            <div className="p-3 bg-ocean-900 rounded-lg border border-white/5 text-[11px] text-slate-400">
              <strong className="text-slate-200 block mb-0.5">Scientific Distinction:</strong>
              {trophicData[selectedTrophic].note}
            </div>
          </div>
        </div>

        {/* 7. ZOOM INTO MICROPLASTICS */}
        <div className="glass-panel p-6 lg:p-10 rounded-2xl border border-cyan-500/30">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-cyan-300 font-bold text-xs uppercase tracking-widest">
              Interactive Tool 07
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              CAN YOU SEE THE DIFFERENCE?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Use the scale slider below to zoom from macro plastic objects down to sub-5mm microparticles.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <input
              type="range"
              min="1"
              max="3"
              value={zoomLevel}
              onChange={e => setZoomLevel(parseInt(e.target.value) || 1)}
              className="w-full accent-cyan-400 cursor-pointer"
            />

            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
              <span className={zoomLevel === 1 ? 'text-cyan-400' : ''}>1. Intact Bottle</span>
              <span className={zoomLevel === 2 ? 'text-cyan-400' : ''}>2. Fragment</span>
              <span className={zoomLevel === 3 ? 'text-cyan-400' : ''}>3. Microplastic (&lt;5mm)</span>
            </div>

            <div className="bg-ocean-950 p-6 rounded-xl border border-cyan-500/30 space-y-3">
              <div className="w-24 h-24 mx-auto rounded-full bg-cyan-900/40 border-2 border-cyan-400 flex items-center justify-center text-4xl transition-all duration-300">
                <Icon name={zoomLevels[zoomLevel].icon} className="w-10 h-10 text-cyan-300" />
              </div>
              <h4 className="text-xl font-bold text-white">
                {zoomLevels[zoomLevel].title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {zoomLevels[zoomLevel].desc}
              </p>
              <span className="inline-block px-3 py-1 bg-cyan-950 text-cyan-300 text-xs font-mono rounded border border-cyan-800">
                {zoomLevels[zoomLevel].ref}
              </span>
            </div>
          </div>
        </div>

        {/* 8. INTERACTIVE KEY STATISTICS */}
        <div className="glass-panel p-6 lg:p-10 rounded-2xl border border-cyan-500/30">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
              Interactive Tool 08
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              CLICK TO REVEAL KEY STATISTICS
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Click each statistic card to uncover verified research numbers, sources, and Philippine context.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => toggleStat('stat1')}
              className="glass-card p-6 rounded-2xl border-l-4 border-l-cyan-400 cursor-pointer hover:bg-ocean-800/60 transition"
            >
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                Statistic Card 01
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                Annual Philippine Plastic Waste Generation
              </h4>
              {revealedStats['stat1'] ? (
                <div className="space-y-2 pt-2 border-t border-white/10 animate-fade-in">
                  <span className="text-3xl font-black text-cyan-300 font-display block">
                    2.7 MILLION MT
                  </span>
                  <p className="text-xs text-slate-300">
                    Generated annually nationwide, with around 20% estimated to leak into marine waters.
                  </p>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Source: World Bank Group Country Study
                  </span>
                </div>
              ) : null}
              <span className="text-xs text-cyan-300 underline block mt-2">
                {revealedStats['stat1'] ? 'Click to collapse' : 'Click to reveal details'}
              </span>
            </div>

            <div
              onClick={() => toggleStat('stat2')}
              className="glass-card p-6 rounded-2xl border-l-4 border-l-amber-400 cursor-pointer hover:bg-ocean-800/60 transition"
            >
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                Statistic Card 02
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                Daily Single-Use Sachet Consumption
              </h4>
              {revealedStats['stat2'] ? (
                <div className="space-y-2 pt-2 border-t border-white/10 animate-fade-in">
                  <span className="text-3xl font-black text-amber-300 font-display block">
                    163 MILLION
                  </span>
                  <p className="text-xs text-slate-300">
                    Individual sachets consumed daily across neighborhood sari-sari stores.
                  </p>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Source: GAIA Alliance Report
                  </span>
                </div>
              ) : null}
              <span className="text-xs text-amber-300 underline block mt-2">
                {revealedStats['stat2'] ? 'Click to collapse' : 'Click to reveal details'}
              </span>
            </div>

            <div
              onClick={() => toggleStat('stat3')}
              className="glass-card p-6 rounded-2xl border-l-4 border-l-plasticRed cursor-pointer hover:bg-ocean-800/60 transition"
            >
              <span className="text-xs font-bold text-plasticRed uppercase tracking-widest block mb-2">
                Statistic Card 03
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                Pasig River Marine Plastic Transport
              </h4>
              {revealedStats['stat3'] ? (
                <div className="space-y-2 pt-2 border-t border-white/10 animate-fade-in">
                  <span className="text-3xl font-black text-rose-400 font-display block">
                    356,000 MT
                  </span>
                  <p className="text-xs text-slate-300">
                    Estimated annual riverine plastic discharge flowing through Metro Manila into Manila Bay.
                  </p>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Source: DENR-EMB Technical Study
                  </span>
                </div>
              ) : null}
              <span className="text-xs text-rose-400 underline block mt-2">
                {revealedStats['stat3'] ? 'Click to collapse' : 'Click to reveal details'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT HAPPENS TO PLASTIC AFTER WE THROW IT AWAY? */}
      <section id="breakdown" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Section 01 / Physical Transformation
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
            WHAT HAPPENS TO PLASTIC AFTER WE THROW IT AWAY?
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Unlike organic waste which biodegrades naturally into organic matter, synthetic polymers photodegrade. Sunlight ultraviolet radiation and mechanical wave action fragment larger objects into smaller particles.
          </p>
        </div>

        <div className="rounded-3xl p-6 sm:p-10 mb-12 border border-[#143444] bg-[#061621] shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-black text-cyan-400 text-center mb-8 uppercase tracking-wider font-display">
            The Degradation &amp; Microplastic Pathway
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {(
              [
                {
                  step: '1. Macro Plastic',
                  desc: 'Bottles, sachets, cups',
                  file: 'images/pathway-macro-plastic.jpg',
                  alt: 'Macro Plastic Bottles & Sachets',
                  isAccent: false,
                },
                {
                  step: '2. Weathering',
                  desc: 'UV ray exposure',
                  file: 'images/pathway-weathering.jpg',
                  alt: 'Solar UV Photodegradation',
                  isAccent: false,
                },
                {
                  step: '3. Fragmentation',
                  desc: 'Wave fragmentation',
                  file: 'images/pathway-fragmentation.jpg',
                  alt: 'Wave & Hydraulic Shear Breakdown',
                  isAccent: false,
                },
                {
                  step: '4. Microplastics',
                  desc: 'Particles < 5mm',
                  file: 'images/pathway-microplastics.jpg',
                  alt: 'Secondary Microplastic Particles',
                  isAccent: true,
                },
              ] as const
            ).map((item, idx) => (
              <div key={idx} className="relative flex flex-col">
                <div
                  className={`flex-1 rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-center ${
                    item.isAccent
                      ? 'bg-[#0f2735] border-2 border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                      : 'bg-[#0c1f2b] border border-[#173847]'
                  }`}
                >
                  <ImageWithFallback
                    src={item.file}
                    alt={item.alt}
                    placeholderOnly={true}
                    className="w-full h-36 sm:h-44 mb-4 object-cover"
                  />
                  <div>
                    <span
                      className={`text-base font-bold block ${
                        item.isAccent ? 'text-cyan-300' : 'text-white'
                      }`}
                    >
                      {item.step}
                    </span>
                    <span className="text-xs text-slate-400 mt-1 block">{item.desc}</span>
                  </div>
                </div>
                {idx < 3 && (
                  <div
                    className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#081b24] border border-cyan-500/40 text-cyan-400 items-center justify-center font-bold text-sm shadow-md"
                    aria-hidden="true"
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-xl overflow-hidden">
            <ImageWithFallback
              src="images/ph-pet-bottle-shoreline.jpg"
              alt="Discarded PET bottle on shoreline"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Macro Stage
              </span>
              <h4 className="font-bold text-white text-sm mb-1">Single-Use PET Bottle</h4>
              <p className="text-xs text-slate-300">
                Intact bottle dumped near water channel before breakdown begins.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl overflow-hidden">
            <ImageWithFallback
              src="images/ph-weathered-plastic-fragments.jpg"
              alt="Weathered plastic fragmenting"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Fragmentation
              </span>
              <h4 className="font-bold text-white text-sm mb-1">Solar &amp; Wave Weathering</h4>
              <p className="text-xs text-slate-300">
                Plastics break into sharp fragments through brittle photo-oxidation.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl overflow-hidden">
            <ImageWithFallback
              src="images/ph-microplastics-sediment.jpg"
              alt="Microplastics in water sediment"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-[10px] font-bold text-plasticRed uppercase tracking-wider block mb-1">
                Microscopic Stage
              </span>
              <h4 className="font-bold text-white text-sm mb-1">Microplastic Particles (&lt;5mm)</h4>
              <p className="text-xs text-slate-300">
                Tiny resin pellets, secondary fibers, and degraded fragments disperse into aquatic columns.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl overflow-hidden">
            <ImageWithFallback
              src="images/ph-underwater-plastic-debris.jpg"
              alt="Underwater ecosystem exposed to debris"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                Ecosystem Ingestion
              </span>
              <h4 className="font-bold text-white text-sm mb-1">Trophic Marine Ingestion</h4>
              <p className="text-xs text-slate-300">
                Plankton, small fish, and filter feeders ingest floating micro-particles mistaking them for food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW BIG IS THE PROBLEM IN THE PHILIPPINES? */}
      <section id="scale" className="py-20 bg-ocean-950/80 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
              Section 02 / National Context
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
              HOW BIG IS THE PROBLEM IN THE PHILIPPINES?
            </h2>
            <p className="text-slate-300">
              The Philippines faces severe waste management challenges due to archipelagic topography, high population density, and widespread dependence on single-use sachet packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card p-6 rounded-2xl border-l-4 border-l-cyan-400 text-center md:text-left">
              <h3 className="text-4xl font-black text-cyan-400 font-display mb-1">2.7 MILLION</h3>
              <p className="text-sm font-semibold text-white mb-2">
                Metric Tons of Plastic Waste Annually
              </p>
              <p className="text-xs text-slate-400 mb-4">
                Generated in the Philippines every single year, with an estimated 20% leaking directly into coastal waters.
              </p>
              <span className="text-[10px] text-cyan-300/80 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40">
                Source: World Bank Group Country Study
              </span>
            </div>

            <div className="glass-card p-6 rounded-2xl border-l-4 border-l-amber-400 text-center md:text-left">
              <h3 className="text-4xl font-black text-amber-400 font-display mb-1">163 MILLION</h3>
              <p className="text-sm font-semibold text-white mb-2">
                Single-Use Sachets Used Daily
              </p>
              <p className="text-xs text-slate-400 mb-4">
                Filipinos consume around 163 million individual sachet packets daily due to low-income consumer patterns.
              </p>
              <span className="text-[10px] text-amber-300/80 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/40">
                Source: GAIA Alliance Report
              </span>
            </div>

            <div className="glass-card p-6 rounded-2xl border-l-4 border-l-plasticRed text-center md:text-left">
              <h3 className="text-4xl font-black text-plasticRed font-display mb-1">356,000</h3>
              <p className="text-sm font-semibold text-white mb-2">
                Metric Tons Leaked from Pasig River
              </p>
              <p className="text-xs text-slate-400 mb-4">
                The Pasig River system ranks among the world's highest riverine contributors of marine plastic debris into the ocean.
              </p>
              <span className="text-[10px] text-rose-300/80 bg-rose-950/60 px-2.5 py-1 rounded border border-rose-800/40">
                Source: DENR-EMB Technical Report
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white text-center mb-8 uppercase tracking-wider">
              The Land-to-Sea Plastic Conveyor Belt
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                {
                  step: 1,
                  name: 'HOMES',
                  desc: 'Consumer use of single-use goods',
                  img: 'images/ph-filipino-community-homes.jpg',
                },
                {
                  step: 2,
                  name: 'STREETS',
                  desc: 'Uncollected trash on urban roads',
                  img: 'images/ph-street-plastic-waste.jpg',
                },
                {
                  step: 3,
                  name: 'DRAINAGE',
                  desc: 'Monsoon rains wash debris into drains',
                  img: 'images/ph-clogged-drainage-metro-manila.jpg',
                },
                {
                  step: 4,
                  name: 'RIVERS',
                  desc: 'Rivers transport waste downstream',
                  img: 'images/pasig-river-plastic.jpg',
                },
                {
                  step: 5,
                  name: 'COASTS',
                  desc: 'Trash accumulates on beaches',
                  img: 'images/manila-bay-shoreline-waste.jpg',
                },
                {
                  step: 6,
                  name: 'OCEAN',
                  desc: 'Fragments break down in ocean currents',
                  img: 'images/ph-ocean-floating-plastic.jpg',
                },
              ].map(item => (
                <div key={item.step} className="glass-card rounded-xl p-3 text-center">
                  <span className="text-cyan-400 font-bold text-xs uppercase block mb-1">
                    Step {item.step}
                  </span>
                  <ImageWithFallback
                    src={item.img}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <h4 className="font-bold text-xs text-white">{item.name}</h4>
                  <p className="text-[10px] text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY IS PLASTIC EVERYWHERE? */}
      <section id="causes" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Section 03 / Drivers &amp; Systemic Drivers
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
            WHY IS PLASTIC EVERYWHERE?
          </h2>
          <p className="text-slate-300">
            Plastic pollution is not merely an individual consumer issue. It is driven by socioeconomic retail packaging models, rapid food delivery systems, e-commerce, and infrastructure gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
            <ImageWithFallback
              src="images/ph-plastic-straw-drink.jpg"
              alt="Plastic Straw in Beverage"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                  01 / Beverage Utensils
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Plastic Straws</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Used briefly during cold drinks, plastic straws rarely get recycled due to light weight and small size, easily washing through drainage channels.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 bg-ocean-950/60 p-2.5 rounded border border-white/5">
                <strong className="text-slate-200">Philippine Impact:</strong> High daily usage in street refreshments and iced coffee stalls nationwide.
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
            <ImageWithFallback
              src="images/ph-disposable-spoon-fork-takeout.jpg"
              alt="Disposable Plastic Utensils"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  02 / Takeout Cutlery
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Disposable Spoons &amp; Forks</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Single-use polystyrene and polypropylene cutlery bundled with fast food meals provide brief convenience but last centuries in landfills.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 bg-ocean-950/60 p-2.5 rounded border border-white/5">
                <strong className="text-slate-200">Philippine Impact:</strong> Included automatically in millions of daily carinderia and fast food delivery packages.
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
            <ImageWithFallback
              src="images/ph-palengke-plastic-bags.jpg"
              alt="Market Plastic Carrier Bags"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                  03 / Carrier Packaging
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Single-Use Plastic Carrier Bags</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Thin film plastic bags ("sando bags") clog drainage grids during heavy typhoons, directly aggravating urban flash floods.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 bg-ocean-950/60 p-2.5 rounded border border-white/5">
                <strong className="text-slate-200">Philippine Impact:</strong> Heavily used in local wet markets (palengke) for seafood and fresh produce.
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden flex flex-col lg:col-span-2">
            <div className="grid md:grid-cols-2 h-full">
              <ImageWithFallback
                src="images/ph-sachets-sari-sari-store.jpg"
                alt="Philippine Sachet Packaging"
                className="w-full h-full min-h-[200px] object-cover"
              />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-plasticRed uppercase tracking-widest block mb-1">
                    04 / Sachet Economy
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">The Tingi / Sachet Market Model</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Multinationals package shampoo, coffee, seasoning, and laundry detergent in small, non-recyclable multi-layer aluminum-plastic sachets targeted at daily-wage earners.
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 bg-ocean-950/60 p-2.5 rounded border border-white/5">
                  <strong className="text-slate-200">Systemic Factor:</strong> Millions of neighborhood <em>sari-sari</em> stores rely on sachets to offer budget-friendly single-use products.
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
            <ImageWithFallback
              src="images/ph-food-delivery-packaging.jpg"
              alt="Food Delivery Containers and Plastics"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                  05 / Urban Delivery
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Food Delivery Packages</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  A single meal order often includes a plastic clam-shell container, outer carrier bag, beverage cup, lid, straw, and condiment sachets.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 bg-ocean-950/60 p-2.5 rounded border border-white/5">
                <strong className="text-slate-200">Visual Count:</strong> 1 Single Order = Up to 7 distinct single-use plastic components.
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden flex flex-col lg:col-span-3">
            <div className="grid md:grid-cols-3 h-full items-center">
              <ImageWithFallback
                src="images/ph-online-shopping-packaging.jpg"
                alt="E-Commerce Shipping Plastic Packages"
                className="w-full h-full min-h-[180px] object-cover"
              />
              <div className="p-6 md:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    06 / E-Commerce Growth
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">Convenience Comes With Packaging</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Online shopping platforms deliver thousands of items daily wrapped in multiple protective layers: courier plastic pouches, multi-layer bubble wrap, plastic stretch films, and synthetic adhesive tapes.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-slate-300">
                    <span className="px-2.5 py-1 bg-ocean-800 rounded border border-white/10">Courier Pouch</span>
                    <span className="px-2.5 py-1 bg-ocean-800 rounded border border-white/10">Bubble Wrap</span>
                    <span className="px-2.5 py-1 bg-ocean-800 rounded border border-white/10">Plastic Tape</span>
                    <span className="px-2.5 py-1 bg-ocean-800 rounded border border-white/10">Internal Cushioning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHERE DOES THE PLASTIC END UP? */}
      <section id="destinations" className="py-20 bg-ocean-950/90 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
              Section 04 / Ecological Impact
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
              WHERE DOES THE PLASTIC END UP?
            </h2>
            <p className="text-slate-300">
              Once entering the natural environment, plastic affects ecosystems across all layers of the biosphere—from inland rivers and coastal mangroves to delicate coral reefs and marine life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="images/ph-river-plastic-waterway.jpg"
                alt="Polluted Philippine River"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <span className="text-cyan-400 font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                  <Icon name="waves" /> Rivers &amp; Estuaries
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Urban Inland Waterways</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Floating waste accumulates in stagnant river choke points, blocking natural flow, smothering benthic habitats, and reducing dissolved oxygen levels essential for freshwater species.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="images/ph-beach-plastic-waste.jpg"
                alt="Philippine Beach Shoreline Waste"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <span className="text-amber-400 font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                  <Icon name="umbrella" /> Coastal Shorelines
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Pristine vs. Polluted Coasts</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Even remote island beaches receive tide-borne microplastics and macro waste, threatening coastal ecotourism, nesting sites, and shoreline ecological stability.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="images/ph-mangrove-plastic.jpg"
                alt="Philippine Mangrove Ecosystem"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <span className="text-emerald-400 font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                  <Icon name="sprout" /> Mangrove Forests
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Mangrove Root Trapping</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dense prop roots of Philippine mangroves trap floating plastic bags and sheets, suffocating pneumatophores (breathing roots) and damaging vital fish nursery habitats.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="images/ph-sea-turtle-plastic.jpg"
                alt="Marine Turtle and Wildlife"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <span className="text-plasticRed font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                  <Icon name="turtle" /> Marine Wildlife
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Ingestion &amp; Entanglement</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sea turtles confuse floating translucent plastic bags with jellyfish. Ingested plastics block digestive tracts, leading to starvation, while ghost nets entangle fish and cetaceans.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden lg:col-span-2">
              <div className="grid md:grid-cols-2 h-full">
                <ImageWithFallback
                  src="images/ph-coral-reef.jpg"
                  alt="Philippine Coral Reef System"
                  className="w-full h-full min-h-[200px] object-cover"
                />
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-cyan-300 font-bold text-xs uppercase flex items-center gap-1.5 mb-1">
                      <Icon name="coral" /> Coral Reef Ecosystems
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">Reef Abrasion &amp; Disease Transmission</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Plastics snagged on coral heads cause physical tissue abrasion, block sunlight needed for zooxanthellae photosynthesis, and increase likelihood of coral disease outbreaks.
                    </p>
                  </div>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/60 p-2 rounded border border-cyan-800/40">
                    Critical for Philippine coastal fisheries and marine biodiversity.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW MUCH PLASTIC DO WE USE WITHOUT THINKING ABOUT IT? */}
      <section id="day-in-life" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
            Section 05 / Everyday Reflection
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 mb-4">
            A NORMAL DAY. A LOT OF PLASTIC.
          </h2>
          <p className="text-slate-300">
            Tracing the routine plastic touchpoints of an ordinary day reveals how single-use packaging accumulates unconsciously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="glass-card p-5 rounded-2xl border-t-4 border-t-amber-400">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Icon name="sunrise" /> Morning
              </span>
              <span className="text-xs text-slate-400">07:00 AM</span>
            </div>
            <ImageWithFallback
              src="images/ph-morning-sachets.jpg"
              alt="Morning Instant Coffee Sachet"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-bold text-white text-sm mb-2">Hygiene &amp; Morning Coffee</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>3-in-1 Instant Coffee Sachet</li>
              <li>Single-use Shampoo Sachet</li>
              <li>Plastic Toothbrush</li>
              <li>Bottled Water</li>
            </ul>
          </div>

          <div className="glass-card p-5 rounded-2xl border-t-4 border-t-cyan-400">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                <Icon name="soup" /> Lunch
              </span>
              <span className="text-xs text-slate-400">12:30 PM</span>
            </div>
            <ImageWithFallback
              src="images/ph-takeout-lunch-utensils.jpg"
              alt="Takeout Meal Utensils"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-bold text-white text-sm mb-2">Carinderia or Takeout</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Styrofoam / Plastic Meal Box</li>
              <li>Disposable Spoon &amp; Fork</li>
              <li>Plastic Sando Carrier Bag</li>
              <li>Condiment Packet</li>
            </ul>
          </div>

          <div className="glass-card p-5 rounded-2xl border-t-4 border-t-teal-400">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1">
                <Icon name="cup" /> Afternoon
              </span>
              <span className="text-xs text-slate-400">03:30 PM</span>
            </div>
            <ImageWithFallback
              src="images/ph-iced-drink-plastic-cup.jpg"
              alt="Iced Beverage Plastic Cup and Straw"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-bold text-white text-sm mb-2">Iced Coffee / Refreshment</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Single-use Plastic Cup</li>
              <li>Plastic Sealing Film / Dome Lid</li>
              <li>Single-use Plastic Straw</li>
              <li>Plastic Cup Carrier Sleeve</li>
            </ul>
          </div>

          <div className="glass-card p-5 rounded-2xl border-t-4 border-t-purple-400">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                <Icon name="bike" /> Evening
              </span>
              <span className="text-xs text-slate-400">07:30 PM</span>
            </div>
            <ImageWithFallback
              src="images/ph-online-shopping-courier-pouch.jpg"
              alt="E-Commerce Online Delivery Package"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-bold text-white text-sm mb-2">Online Shopping / Food Delivery</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Outer Delivery Courier Poly-pouch</li>
              <li>Internal Bubble Wrap Cushioning</li>
              <li>Adhesive Packaging Tape</li>
              <li>Individual Item Plastic Wrap</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL REFLECTION SECTION */}
      <section
        id="reflection"
        className="py-24 px-4 bg-gradient-to-b from-ocean-900 via-ocean-950 to-black text-center relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-10">
            <span className="px-3 py-1.5 rounded-full bg-ocean-800 border border-white/10 text-cyan-300">Straw</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-ocean-800 border border-white/10 text-cyan-300">Spoon &amp; Fork</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-ocean-800 border border-white/10 text-cyan-300">Sachet</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-ocean-800 border border-white/10 text-cyan-300">PET Bottle</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-ocean-800 border border-white/10 text-cyan-300">Delivery Polybag</span>
          </div>

          <div className="text-cyan-400 text-2xl mb-8">↓</div>

          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-12">
            <span className="px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/40 text-rose-300">Street Drain</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/40 text-rose-300">River Basin</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/40 text-rose-300">Coastline</span>
            <span>→</span>
            <span className="px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-800/40 text-rose-300">Ocean Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-6">
            IT STARTS WITH SOMETHING WE USE EVERY DAY.
          </h2>

          <p className="text-xl sm:text-2xl text-cyan-300 font-light max-w-2xl mx-auto leading-relaxed italic mb-8">
            "Plastic may become smaller, but the problem does not simply disappear."
          </p>

          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed font-light mb-8">
            Understanding its pathway through ecosystems is the first step toward recognizing our shared connection to Earth's environmental systems.
          </p>

          <div className="pt-4">
            <button
              onClick={() => onSwitchView('solution')}
              className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition shadow-xl shadow-emerald-500/25 hover:scale-105 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Circular Solutions</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-black border-t border-white/10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <h4 className="font-bold text-white uppercase tracking-wider mb-4 text-sm">Academic Sources &amp; Image References</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed mb-8">
            <div>
              <h5 className="font-semibold text-slate-300 mb-2">Scientific Reports &amp; Institutional Data:</h5>
              <ul className="space-y-1 list-disc list-inside">
                <li>Department of Environment and Natural Resources (DENR-EMB), Philippines.</li>
                <li>World Bank Group — <em>Market Study for the Philippines Plastics Circularity</em>.</li>
                <li>United Nations Environment Programme (UNEP) — <em>Single-Use Plastics Assessment</em>.</li>
                <li>GAIA (Global Alliance for Incinerator Alternatives) — <em>Plastik-onomya: Philippine Sachet Report</em>.</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-slate-300 mb-2">Photographic &amp; Media Documentation:</h5>
              <ul className="space-y-1 list-disc list-inside">
                <li>Photographs: record the photographer, source and licence for each image and video in images/CREDITS.txt.</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center text-slate-400 text-[11px]">
            People and Earth's Ecosystem Academic Project | Philippine Plastic &amp; Microplastic Crisis Educational Portal
            <br />
            <span className="text-slate-300 font-semibold text-xs">Created by Alexies Jean Ballesteros</span>
          </div>
        </div>
      </footer>
    </main>
  );
};
