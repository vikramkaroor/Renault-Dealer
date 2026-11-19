import { ArrowRight, ChevronDown } from 'lucide-react';
import { DUSTER_IMAGES } from '../data/duster';
import { ResilientImage } from './ResilientImage';
import { DEALERSHIP_NAME } from '../config/dealership';
import { getDisplayDealershipName } from '../utils/dealershipHelpers';

interface HeroSectionProps {
  onExploreDuster: () => void;
  onBookTestDrive: () => void;
}

export function HeroSection({
  onExploreDuster,
  onBookTestDrive,
}: HeroSectionProps) {
  const showroomTitle = getDisplayDealershipName(DEALERSHIP_NAME);

  return (
    <section
      aria-label="Renault Duster Hero Showcase"
      className="relative min-h-[calc(100vh-4rem)] max-h-[920px] w-full bg-[#060D1A] text-white overflow-hidden flex items-end lg:items-center"
    >
      {/* Cinematic Full-Bleed Vehicle Photography */}
      <div className="absolute inset-0">
        <ResilientImage
          src={DUSTER_IMAGES.hero}
          alt="The New Renault Duster parked inside a modern architectural pavilion"
          loading="eager"
          className="w-full h-full object-cover object-center"
          fallbackTitle="The New Renault Duster"
        />
        {/* Measured scrim ensuring >= 4.5:1 text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#060D1A]/90 via-[#060D1A]/55 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/85 via-transparent to-[#060D1A]/30"
        />
      </div>

      {/* Foreground Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:py-24">
        <div className="max-w-xl space-y-5">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-slate-300">
            {showroomTitle} · India Showcase
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.06] text-white">
            THE NEW RENAULT DUSTER
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-slate-100">
            Unleash Your Spirit of Adventure.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
            Sculpted SUV proportions, elevated ground clearance, and a driver-centric digital cockpit engineered for Indian highways, mountain passes, and city streets.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onExploreDuster}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Explore Duster</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onBookTestDrive}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/35 backdrop-blur-sm rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a Test Drive
            </button>
          </div>
        </div>
      </div>

      {/* Optional Subtle Scroll Indicator */}
      <a
        href="#introduction"
        aria-label="Scroll to introduction section"
        className="hidden md:inline-flex items-center gap-1.5 absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-xs font-medium text-slate-300 hover:text-white transition-colors"
      >
        <span>Scroll to discover</span>
        <ChevronDown className="w-4 h-4" aria-hidden="true" />
      </a>
    </section>
  );
}
