import { useState } from 'react';
import { Download, ArrowRight, ShieldCheck, Compass, Layers } from 'lucide-react';
import { DUSTER_IMAGES, SHOWCASE_ITEMS } from '../data/duster';
import { ResilientImage } from '../components/ResilientImage';
import type { RoutePath } from '../types/navigation';

interface ExploreDusterPageProps {
  onNavigate: (path: RoutePath) => void;
  onBookTestDrive: () => void;
  onRequestEnquiry: (subject: string) => void;
}

const SPECIFICATION_ROWS = [
  {
    category: 'Body & Architecture',
    parameter: 'Vehicle Segment',
    detail: '5-Seater Compact / Mid-Size Rugged SUV',
  },
  {
    category: 'Body & Architecture',
    parameter: 'Ground Clearance & Protection',
    detail: 'Elevated SUV clearance with front & rear skid plates and perimeter cladding (verify exact mm figure per India-spec trim)',
  },
  {
    category: 'Powertrain & Gearbox',
    parameter: 'Engine Options',
    detail: 'Showroom-configurable turbo-petrol / hybrid options — confirm final India homologation specs at showroom',
  },
  {
    category: 'Powertrain & Gearbox',
    parameter: 'Transmission',
    detail: 'Manual and automatic gearbox availability dependent on selected variant',
  },
  {
    category: 'Cockpit & Infotainment',
    parameter: 'Displays',
    detail: '10.1-inch driver-angled touchscreen + 7-inch digital driver cluster (Techno & higher trims)',
  },
  {
    category: 'Cockpit & Infotainment',
    parameter: 'Connectivity',
    detail: 'Wireless smartphone mirroring, Bluetooth hands-free, USB-C ports, wireless charging (trim dependent)',
  },
  {
    category: 'Safety & Assistance',
    parameter: 'Occupant Protection',
    detail: 'Reinforced safety cell, multiple airbags, ESC, Hill Start Assist, ABS with EBD, ISOFIX mounts',
  },
  {
    category: 'Utility & Cargo',
    parameter: 'Seating & Roof Utility',
    detail: '60:40 split rear seats, wide tailgate boot access, modular roof rails (trim dependent)',
  },
];

export function ExploreDusterPage({
  onNavigate,
  onBookTestDrive,
  onRequestEnquiry,
}: ExploreDusterPageProps) {
  const [featureTab, setFeatureTab] = useState<'exterior' | 'interior'>('exterior');
  const tabItems = SHOWCASE_ITEMS.filter((item) => item.category === featureTab);

  return (
    <div className="bg-white text-slate-900">
      {/* Page Header Hero */}
      <section className="bg-[#0B162C] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Vehicle Overview
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Explore The Renault Duster
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Designed around tough geometry, honest SUV proportions, and everyday practicality for Indian roads—without unnecessary complexity.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onBookTestDrive}
                className="px-5 py-3 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Book a Test Drive
              </button>
              <a
                href="/api/brochure"
                download="Renault-Duster-Showroom-Overview.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-md transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Brochure (PDF)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-video rounded-xl overflow-hidden border border-white/15 bg-black">
              <ResilientImage
                src={DUSTER_IMAGES.hero}
                alt="Renault Duster front three-quarter profile"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Exterior & Interior Feature Breakdown */}
      <section className="py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                Exterior & Interior Craftsmanship
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Inspect each structural, lighting, and cabin highlight across the Duster lineup.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Explore exterior or interior features"
              className="inline-flex p-1 bg-slate-100 rounded-lg self-start"
            >
              <button
                type="button"
                role="tab"
                aria-selected={featureTab === 'exterior'}
                onClick={() => setFeatureTab('exterior')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  featureTab === 'exterior'
                    ? 'bg-[#0B162C] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Exterior Features
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={featureTab === 'interior'}
                onClick={() => setFeatureTab('interior')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  featureTab === 'interior'
                    ? 'bg-[#0B162C] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Interior Features
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabItems.map((item) => (
              <article
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-200 overflow-hidden">
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-3 flex-1">
                  <p className="text-xs font-medium text-[#D9232E]">
                    {item.label}
                  </p>
                  <h3 className="text-lg font-semibold text-[#0B162C]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                  <ul className="pt-2 border-t border-slate-200 space-y-1 text-xs text-slate-600">
                    {item.specs.map((spec) => (
                      <li key={spec}>· {spec}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Performance, Technology & Safety Pillars */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <Compass className="w-6 h-6 text-[#0B162C]" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-[#0B162C]">
              Performance & Composure
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Modern platform tuning engineered for composed highway cruising, predictable cornering balance, and effortless suspension absorption over broken urban surfaces.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <Layers className="w-6 h-6 text-[#0B162C]" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-[#0B162C]">
              Connected Cabin Technology
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Driver-oriented 10.1-inch infotainment interface, digital gauge cluster, steering controls, and multi-device USB-C power keep journeys intuitive.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#0B162C]" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-[#0B162C]">
              Occupant Safety Architecture
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Built around multi-airbag protection, electronic stability control, hill-start assist, and camera-assisted maneuvering tailored to each trim.
            </p>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                Vehicle Specifications Overview
              </h2>
              <p className="text-sm text-slate-600">
                Core architectural highlights. Confirm exact India-spec figures with our showroom product specialist.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/variants')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B162C] hover:text-[#D9232E] cursor-pointer"
            >
              <span>Compare All Variants</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="py-3.5 px-5 font-semibold">Category</th>
                  <th className="py-3.5 px-5 font-semibold">Specification</th>
                  <th className="py-3.5 px-5 font-semibold">Showroom Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {SPECIFICATION_ROWS.map((row) => (
                  <tr key={row.parameter} className="hover:bg-slate-50/70">
                    <td className="py-4 px-5 text-slate-500 font-medium whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="py-4 px-5 text-slate-900 font-medium whitespace-nowrap">
                      {row.parameter}
                    </td>
                    <td className="py-4 px-5 text-slate-600 leading-relaxed">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#0B162C] text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h3 className="text-xl font-semibold">
                Need the Official Trim-by-Trim Spec Sheet?
              </h3>
              <p className="text-sm text-slate-300">
                Request a personalised walkaround or receive the latest India specification sheet directly from our showroom desk.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onRequestEnquiry('Request Official Renault Duster Spec Sheet')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
