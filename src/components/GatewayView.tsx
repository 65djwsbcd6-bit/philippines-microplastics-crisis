import React from 'react';

interface GatewayViewProps {
  onSwitchView: (view: 'crisis' | 'solution') => void;
}

export const GatewayView: React.FC<GatewayViewProps> = ({ onSwitchView }) => {
  return (
    <main className="view-section relative min-h-screen h-screen w-full flex items-center justify-center overflow-hidden bg-[#fbf9f6] pt-16">
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-110 saturate-125"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=1920"
          aria-hidden="true"
        >
          <source src="videos/hero-manila-bay.mp4" type="video/mp4" />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-plastic-garbage-floating-in-the-sea-41584-large.mp4"
            type="video/mp4"
          />
        </video>
        <img
          src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=1920"
          alt="Marine plastic waste and discarded packaging along shoreline waters"
          className="w-full h-full object-cover opacity-25 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f6] via-[#fbf9f6]/80 to-[#78AAA1]/15" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 uppercase whitespace-nowrap overflow-hidden text-ellipsis font-display">
            PLASTIC. PEOPLE. PLANET.
          </h1>
          <p className="text-xs sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#5a8069] via-[#48877d] to-[#ad8b66] whitespace-nowrap overflow-hidden text-ellipsis">
            SEE THE CRISIS. IMAGINE THE CHANGE.
          </p>
        </div>

        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Every sachet, bottle, and carrier bag tells a story of systemic design and ecological consequence. Choose an interactive lens to explore the problem or build the solution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left pt-4">
          <button
            onClick={() => onSwitchView('crisis')}
            className="group p-8 rounded-2xl bg-[#fcfbf9]/95 hover:bg-white backdrop-blur-md border-2 border-[#CDB499]/60 hover:border-[#8AA494] hover:shadow-xl hover:shadow-[#CDB499]/20 transition duration-300 text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#9e7d59] uppercase tracking-widest">
                  EXPOSE
                </span>
                <span className="w-3 h-3 rounded-full bg-[#CDB499] animate-pulse" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#9e7d59] transition uppercase mb-2 font-display">
                THE CRISIS
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dive deep into empirical research, hotspot maps, daily footprint calculators, and marine food web fragmentation.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-[#CDB499]/30 pt-4 text-xs font-bold text-[#9e7d59] group-hover:text-[#78AAA1] uppercase tracking-wider transition">
              <span>Explore The Data &amp; Impacts</span>
              <span className="text-lg group-hover:translate-x-2 transition duration-300">→</span>
            </div>
          </button>

          <button
            onClick={() => onSwitchView('solution')}
            className="group p-8 rounded-2xl bg-[#f9fbfb]/95 hover:bg-white backdrop-blur-md border-2 border-[#78AAA1]/60 hover:border-[#78AAA1] hover:shadow-xl hover:shadow-[#78AAA1]/20 transition duration-300 text-left flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#447a71] uppercase tracking-widest">
                  RESTORE
                </span>
                <span className="w-3 h-3 rounded-full bg-[#78AAA1] animate-ping" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#447a71] transition uppercase mb-2 font-display">
                THE SOLUTION
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Discover Extended Producer Responsibility (EPR Law), refill economies, community trash-to-cash networks, and your personal action plan.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-[#78AAA1]/30 pt-4 text-xs font-bold text-[#447a71] group-hover:text-[#8AA494] uppercase tracking-wider transition">
              <span>Discover Systemic Action</span>
              <span className="text-lg group-hover:translate-x-2 transition duration-300">→</span>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};
