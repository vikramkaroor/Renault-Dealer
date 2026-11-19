import { useEffect } from 'react';
import { X } from 'lucide-react';
import { DEALERSHIP_NAME } from '../config/dealership';
import { getDisplayDealershipName } from '../utils/dealershipHelpers';

interface LegalModalProps {
  activeTab: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export function LegalModal({ activeTab, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!activeTab) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeTab, onClose]);

  if (!activeTab) return null;

  const brandName = getDisplayDealershipName(DEALERSHIP_NAME);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white text-slate-900 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <h2 id="legal-modal-title" className="text-xl font-semibold">
            {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal dialog"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-600 leading-relaxed">
          {activeTab === 'privacy' ? (
            <>
              <p>
                {brandName} collects contact details submitted via our test drive booking and showroom enquiry forms solely to schedule appointments, share requested variant information, and assist with finance or exchange queries.
              </p>
              <p>
                Personal details including your name, mobile number, and email address are never sold to third-party data brokers. Information may be shared strictly with authorized showroom advisors or banking partners if you request retail finance assistance.
              </p>
              <p>
                You may request correction or deletion of your enquiry record at any time by contacting the showroom desk.
              </p>
            </>
          ) : (
            <>
              <p>
                Vehicle imagery, trim descriptions, feature lists, and EMI calculations displayed on this website are provided for informational guidance and are subject to confirmation at {brandName}.
              </p>
              <p>
                Ex-showroom prices, registration charges, insurance premiums, promotional schemes, and finance interest rates vary by state, variant, and effective booking date. Only an itemized proforma invoice issued by the showroom represents a formal quote.
              </p>
              <p>
                Test drive bookings submitted online represent an appointment request until confirmed by a showroom coordinator with valid driving licence verification.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#162747] rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
