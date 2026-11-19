import { SHOWROOM_OFFERS } from '../data/duster';
import { EMICalculator } from '../components/EMICalculator';
import { GeneralEnquiryForm } from '../components/GeneralEnquiryForm';

interface OffersFinancePageProps {
  onEnquireOffer: (subject: string) => void;
}

export function OffersFinancePage({ onEnquireOffer }: OffersFinancePageProps) {
  return (
    <div className="bg-white text-slate-900">
      <section className="bg-[#0B162C] text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Showroom Finance & Schemes
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Offers, Exchange & EMI Calculator
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Plan your purchase budget with our interactive EMI estimator, explore editable showroom benefit categories, or request a trade-in valuation.
          </p>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <EMICalculator
            onRequestFinanceCallback={() =>
              document
                .getElementById('finance-exchange-enquiry')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          />
        </div>
      </section>

      {/* Current Editable Offers */}
      <section className="py-14 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
              Showroom Offer Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              All benefits below are configurable by our dealership desk based on monthly schemes, corporate eligibility, and variant inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWROOM_OFFERS.map((offer) => (
              <article
                key={offer.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500">
                    {offer.type}
                  </p>
                  <h3 className="text-lg font-semibold text-[#0B162C]">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {offer.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onEnquireOffer(offer.title)}
                  className="text-left text-sm font-semibold text-[#D9232E] hover:text-[#B91C1C] cursor-pointer"
                >
                  {offer.actionLabel} →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Finance & Exchange Enquiry Form */}
      <section id="finance-exchange-enquiry" className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                Finance & Trade-In Desk
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B162C]">
                Request Finance Quote or Vehicle Exchange
              </h2>
              <p className="text-sm text-slate-600">
                Share your preferred Duster trim and whether you have an existing car to exchange. Our finance coordinator will prepare an itemized quotation.
              </p>
            </div>

            <GeneralEnquiryForm
              defaultType="finance"
              submitLabel="Request Finance & Offer Quote"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
