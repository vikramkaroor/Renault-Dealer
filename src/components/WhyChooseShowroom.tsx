import { SHOWROOM_TRUST_PILLARS, DUSTER_IMAGES } from '../data/duster';
import { ResilientImage } from './ResilientImage';
import { DEALERSHIP_NAME } from '../config/dealership';
import { getDisplayDealershipName } from '../utils/dealershipHelpers';

export function WhyChooseShowroom() {
  const brandName = getDisplayDealershipName(DEALERSHIP_NAME);

  return (
    <section
      id="why-choose-us"
      className="bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                Dealership Experience
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B162C]">
                Why Visit {brandName}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Buying an SUV is a long-term decision. Our showroom focus is straightforward: clear variant guidance, unhurried test drives, transparent proforma quotes, and dependable after-sales coordination.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3]">
              <ResilientImage
                src={DUSTER_IMAGES.showroom}
                alt="Modern automotive dealership lounge and vehicle display bay"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SHOWROOM_TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-2.5"
              >
                <p className="text-xs font-mono font-medium text-[#D9232E]">
                  {pillar.index}.
                </p>
                <h3 className="text-base font-semibold text-[#0B162C]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
