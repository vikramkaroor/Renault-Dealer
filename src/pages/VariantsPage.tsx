import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { DUSTER_VARIANTS } from '../data/duster';
import { ResilientImage } from '../components/ResilientImage';

interface VariantsPageProps {
  onBookTestDrive: (variantName: string) => void;
  onEnquireVariant: (variantName: string) => void;
}

export function VariantsPage({
  onBookTestDrive,
  onEnquireVariant,
}: VariantsPageProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    DUSTER_VARIANTS.map((v) => v.id)
  );
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  const toggleVariantSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((item) => item !== id) : prev;
      }
      return [...prev, id];
    });
  };

  const comparedVariants = DUSTER_VARIANTS.filter((v) =>
    selectedIds.includes(v.id)
  );

  const comparisonRows = [
    {
      label: 'Trim Positioning',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) => v.trimLevel,
    },
    {
      label: 'Indicative Price Status',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) => v.priceLabel,
    },
    {
      label: 'Powertrain Lineup',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) => v.powertrain,
    },
    {
      label: 'Transmission',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) => v.transmission,
    },
    {
      label: 'Drivetrain',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) => v.drivetrain,
    },
    {
      label: 'Safety Equipment',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) => v.safetyFeatures.join(' · '),
    },
    {
      label: 'Infotainment & Display',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) =>
        v.infotainmentFeatures.join(' · '),
    },
    {
      label: 'Comfort & Convenience',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) => v.comfortFeatures.join(' · '),
    },
    {
      label: 'Exterior Highlights',
      getValue: (v: (typeof DUSTER_VARIANTS)[number]) => v.exteriorFeatures.join(' · '),
    },
  ];

  const visibleRows = showDifferencesOnly
    ? comparisonRows.filter((row) => {
        const values = comparedVariants.map((v) => row.getValue(v));
        return new Set(values).size > 1;
      })
    : comparisonRows;

  return (
    <div className="bg-white text-slate-900">
      {/* Header */}
      <section className="bg-[#0B162C] text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Variants & Comparison
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Renault Duster Variant Lineup
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Compare trim specifications, drivetrain configurations, and equipment differences side by side. Prices remain editable by the showroom per current city taxes and schemes.
          </p>
        </div>
      </section>

      {/* Variant Cards */}
      <section className="py-14 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DUSTER_VARIANTS.map((variant) => (
            <article
              key={variant.id}
              className="border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between bg-white"
            >
              <div>
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <ResilientImage
                    src={variant.image}
                    alt={variant.name}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {variant.trimLevel}
                    </p>
                    <h2 className="text-xl font-semibold text-[#0B162C] mt-0.5">
                      {variant.name}
                    </h2>
                    <p className="text-sm font-medium text-[#D9232E] mt-1">
                      {variant.priceLabel}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {variant.tagline}
                  </p>

                  <ul className="pt-3 border-t border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
                    {variant.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          className="w-4 h-4 text-[#0B162C] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => onBookTestDrive(variant.name)}
                  className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors cursor-pointer"
                >
                  Book Test Drive
                </button>
                <button
                  type="button"
                  onClick={() => onEnquireVariant(variant.name)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-sm font-semibold text-[#0B162C] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                >
                  <span>Request On-Road Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Side-by-Side Comparison Matrix */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                Side-by-Side Variant Comparison
              </h2>
              <p className="text-sm text-slate-600">
                Select at least one trim to compare equipment, safety, and powertrain specifications.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {DUSTER_VARIANTS.map((variant) => {
                const selected = selectedIds.includes(variant.id);
                return (
                  <button
                    key={variant.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleVariantSelection(variant.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#0B162C] text-white border-[#0B162C]'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {variant.name}
                  </button>
                );
              })}

              <label className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 pl-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDifferencesOnly}
                  onChange={(e) => setShowDifferencesOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#0B162C] rounded"
                />
                <span>Highlight differences only</span>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="py-4 px-5 font-semibold text-slate-800 w-52">
                    Parameter
                  </th>
                  {comparedVariants.map((variant) => (
                    <th
                      key={variant.id}
                      className="py-4 px-5 font-semibold text-[#0B162C] min-w-[240px]"
                    >
                      {variant.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visibleRows.map((row) => (
                  <tr key={row.label} className="align-top hover:bg-slate-50/70">
                    <td className="py-4 px-5 font-medium text-slate-900">
                      {row.label}
                    </td>
                    {comparedVariants.map((variant) => (
                      <td
                        key={`${variant.id}-${row.label}`}
                        className="py-4 px-5 text-slate-600 leading-relaxed"
                      >
                        {row.getValue(variant)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
