import { ArrowRight } from 'lucide-react';
import { SHOWROOM_OFFERS } from '../data/duster';

interface OffersSectionProps {
  onEnquireOffers: (subject?: string) => void;
  onOpenOffersPage?: () => void;
}

export function OffersSection({
  onEnquireOffers,
  onOpenOffersPage,
}: OffersSectionProps) {
  return (
    <section
      id="offers"
      className="bg-slate-50 text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
              Showroom Offers & Finance
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B162C]">
              Ownership Benefits & Finance Programs
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Dealership offers, exchange bonuses, and bank finance schemes vary by variant and month. Speak with our showroom desk for verified eligibility.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEnquireOffers('Current Renault Duster Showroom Offers')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <span>Enquire About Offers</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWROOM_OFFERS.map((offer, idx) => (
            <article
              key={offer.id}
              className={`bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-500">
                  {offer.type} · {offer.statusLabel}
                </p>
                <h3 className="text-lg font-semibold text-[#0B162C]">
                  {offer.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onEnquireOffers(offer.title)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B162C] hover:text-[#D9232E] transition-colors cursor-pointer"
                >
                  <span>{offer.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}

          {onOpenOffersPage && (
            <div className="bg-[#0B162C] text-white rounded-xl p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-300">
                  Monthly Planning Tool
                </p>
                <h3 className="text-lg font-semibold text-white">
                  Interactive EMI Calculator
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Estimate monthly installments across custom on-road amounts, down payments, interest rates, and tenures before visiting the showroom.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15">
                <button
                  type="button"
                  onClick={onOpenOffersPage}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <span>Open EMI Calculator & Finance Desk</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
