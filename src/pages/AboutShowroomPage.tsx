import { DUSTER_IMAGES, SHOWROOM_TRUST_PILLARS } from '../data/duster';
import { ResilientImage } from '../components/ResilientImage';
import { TestDriveForm } from '../components/TestDriveForm';
import { DEALERSHIP_NAME } from '../config/dealership';
import { getDisplayDealershipName } from '../utils/dealershipHelpers';

const EXPERIENCE_STEPS = [
  {
    step: '01',
    title: 'Variant Discovery & Walkaround',
    description:
      'Compare trims side by side in our showroom bay with a dedicated product specialist who answers technical, safety, and space questions clearly.',
  },
  {
    step: '02',
    title: 'Curated Test Drive Experience',
    description:
      'Evaluate urban maneuverability, suspension composure, and highway stability on real routes—either from our showroom or via a scheduled doorstep slot.',
  },
  {
    step: '03',
    title: 'Transparent Quote & Exchange',
    description:
      'Receive an itemized on-road price breakdown alongside optional trade-in valuation and bank finance comparisons.',
  },
  {
    step: '04',
    title: 'Structured Delivery & Handover',
    description:
      'Complete documentation with full feature orientation on delivery day and direct service desk contact for scheduled maintenance.',
  },
];

export function AboutShowroomPage() {
  const brandName = getDisplayDealershipName(DEALERSHIP_NAME);

  return (
    <div className="bg-white text-slate-900">
      <section className="bg-[#0B162C] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              About Our Showroom
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Welcome to {brandName}
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Built around transparent automotive consultation, unhurried test drives, and attentive after-sales guidance for Renault Duster buyers in India.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-slate-900">
              <ResilientImage
                src={DUSTER_IMAGES.showroom}
                alt={`${brandName} showroom interior`}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Purchase Journey */}
      <section className="py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
              The Showroom Experience
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every touchpoint is organized to make evaluating and owning a Renault Duster clear and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCE_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3"
              >
                <p className="text-xs font-mono font-semibold text-[#D9232E]">
                  {item.step}.
                </p>
                <h3 className="text-lg font-semibold text-[#0B162C]">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
              Dedicated Sales & Ownership Support
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              How our showroom specialists support you before and after vehicle delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHOWROOM_TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5"
              >
                <p className="text-xs font-mono text-slate-500">{pillar.index}.</p>
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
      </section>

      {/* Book Visit / Test Drive */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                Schedule a Showroom Appointment
              </h2>
              <p className="text-sm text-slate-600">
                Reserve a dedicated slot with our Duster advisor for an in-person tour and test drive.
              </p>
            </div>
            <TestDriveForm />
          </div>
        </div>
      </section>
    </div>
  );
}
