import { useState } from 'react';
import { ShieldCheck, Cpu, Radio, SlidersHorizontal } from 'lucide-react';
import { DUSTER_VARIANTS } from '../data/duster';

export function TechSafetySection() {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    DUSTER_VARIANTS[1].id
  );

  const selectedVariant =
    DUSTER_VARIANTS.find((v) => v.id === selectedVariantId) ||
    DUSTER_VARIANTS[1];

  return (
    <section
      id="technology-safety"
      className="bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
              Technology & Safety
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B162C]">
              Variant-Verified Protection & Connectivity
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Select a Duster trim below to view only the driver assistance, infotainment, and occupant safety equipment specified for that variant.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Select variant to inspect technology and safety"
            className="inline-flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg self-start"
          >
            {DUSTER_VARIANTS.map((variant) => {
              const active = variant.id === selectedVariant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#0B162C] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {variant.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#0B162C]">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              <h3 className="text-base font-semibold">Safety & Driver Aids</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {selectedVariant.safetyFeatures.map((item) => (
                <li key={item} className="leading-relaxed">
                  · {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#0B162C]">
              <Cpu className="w-5 h-5" aria-hidden="true" />
              <h3 className="text-base font-semibold">Infotainment & Display</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {selectedVariant.infotainmentFeatures.map((item) => (
                <li key={item} className="leading-relaxed">
                  · {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#0B162C]">
              <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />
              <h3 className="text-base font-semibold">Comfort & Convenience</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {selectedVariant.comfortFeatures.map((item) => (
                <li key={item} className="leading-relaxed">
                  · {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#0B162C]">
              <Radio className="w-5 h-5" aria-hidden="true" />
              <h3 className="text-base font-semibold">Exterior Equipment</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {selectedVariant.exteriorFeatures.map((item) => (
                <li key={item} className="leading-relaxed">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
