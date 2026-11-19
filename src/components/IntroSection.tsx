import { ArrowRight } from 'lucide-react';
import { DUSTER_IMAGES } from '../data/duster';
import { ResilientImage } from './ResilientImage';

interface IntroSectionProps {
  onExploreDuster: () => void;
}

export function IntroSection({ onExploreDuster }: IntroSectionProps) {
  return (
    <section
      id="introduction"
      className="scroll-mt-16 bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#D9232E]">
                SUV Heritage Reimagined
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B162C]">
                BUILT FOR THE UNEXPECTED.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                From uneven urban tarmac to winding hill-station switchbacks, the Renault Duster pairs unmistakable road presence with practical, everyday cabin usability.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Squared-off wheel arches, protective lower body cladding, generous boot space, and a poised driving position come together in an SUV crafted for drivers who refuse to be limited by road conditions.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Commanding Stance
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  High ground-clearance geometry with protective front and rear skid plates.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Touring Practicality
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Spacious five-passenger cabin paired with modular roof rails and wide boot access.
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onExploreDuster}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B162C] hover:text-[#D9232E] transition-colors cursor-pointer"
              >
                <span>Read complete vehicle overview</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full min-h-[300px] sm:min-h-[380px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <ResilientImage
                src={DUSTER_IMAGES.mountain}
                alt="Renault Duster side profile driving on an Indian mountain pass at golden hour"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
