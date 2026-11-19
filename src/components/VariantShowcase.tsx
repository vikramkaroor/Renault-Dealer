import { ArrowRight, Check } from 'lucide-react';
import { DUSTER_VARIANTS, type DusterVariant } from '../data/duster';
import { ResilientImage } from './ResilientImage';

interface VariantShowcaseProps {
  onExploreVariant: (variant: DusterVariant) => void;
  onEnquireVariant: (variantName: string) => void;
}

export function VariantShowcase({
  onExploreVariant,
  onEnquireVariant,
}: VariantShowcaseProps) {
  return (
    <section
      id="variants"
      className="bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
              Lineup & Trims
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B162C]">
              Explore Renault Duster Variants
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Select a trim to compare core equipment or request the latest ex-showroom and on-road quotation for your city.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            All prices and trim availability are showroom-configurable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DUSTER_VARIANTS.map((variant) => (
            <article
              key={variant.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <ResilientImage
                    src={variant.image}
                    alt={`${variant.name} exterior view`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500">
                      {variant.trimLevel} · {variant.drivetrain}
                    </p>
                    <h3 className="text-xl font-semibold text-[#0B162C]">
                      {variant.name}
                    </h3>
                    <p className="text-sm font-medium text-[#D9232E] pt-0.5">
                      {variant.priceLabel}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {variant.tagline}
                  </p>

                  <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">Powertrain:</span>{' '}
                      {variant.powertrain}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Transmission:</span>{' '}
                      {variant.transmission}
                    </p>
                  </div>

                  <ul className="pt-3 border-t border-slate-200 space-y-2">
                    {variant.highlights.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                      >
                        <Check
                          className="w-4 h-4 text-[#0B162C] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onExploreVariant(variant)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0B162C] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Variant</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onEnquireVariant(variant.name)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Enquire Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
