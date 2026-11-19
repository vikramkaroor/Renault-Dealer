import { useState } from 'react';
import { VEHICLE_HIGHLIGHTS } from '../data/duster';
import { ResilientImage } from './ResilientImage';

export function VehicleHighlights() {
  const [selectedId, setSelectedId] = useState<string>(VEHICLE_HIGHLIGHTS[0].id);

  const activeHighlight =
    VEHICLE_HIGHLIGHTS.find((item) => item.id === selectedId) ||
    VEHICLE_HIGHLIGHTS[0];

  return (
    <section
      id="features"
      className="scroll-mt-16 bg-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Key Highlights
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B162C]">
            Engineered Around Real Indian Roads
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Explore the core architectural strengths of the Renault Duster. Exact trim-wise figures are verified during your showroom walkaround.
          </p>
        </div>

        {/* Interactive Feature Selector + Preview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 space-y-3">
            {VEHICLE_HIGHLIGHTS.map((item) => {
              const isActive = item.id === activeHighlight.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left p-5 rounded-xl border transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B162C] text-white border-[#0B162C]'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className={`text-xs font-medium ${
                        isActive ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {item.index}. {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                  <p
                    className={`text-sm mt-1.5 leading-relaxed ${
                      isActive ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item.summary}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-xl overflow-hidden flex-1 flex flex-col">
              <div className="aspect-video w-full bg-slate-900 overflow-hidden">
                <ResilientImage
                  src={activeHighlight.image}
                  alt={activeHighlight.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-[#D9232E]">
                    {activeHighlight.index} · {activeHighlight.category}
                  </p>
                  <h3 className="text-2xl font-semibold text-[#0B162C]">
                    {activeHighlight.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {activeHighlight.summary}
                  </p>
                </div>
                <p className="pt-4 border-t border-slate-200 text-sm text-slate-500 leading-relaxed">
                  {activeHighlight.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
