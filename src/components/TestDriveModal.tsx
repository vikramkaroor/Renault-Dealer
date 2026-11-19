import { useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import type { ModalContextState } from '../types/navigation';
import { TestDriveForm } from './TestDriveForm';
import { GeneralEnquiryForm } from './GeneralEnquiryForm';
import { WHATSAPP_NUMBER } from '../config/dealership';
import { isConfiguredValue } from '../utils/dealershipHelpers';

interface TestDriveModalProps {
  modal: ModalContextState;
  onClose: () => void;
}

export function TestDriveModal({ modal, onClose }: TestDriveModalProps) {
  useEffect(() => {
    if (!modal.isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modal.isOpen, onClose]);

  if (!modal.isOpen) return null;

  const title =
    modal.mode === 'test-drive'
      ? 'Book a Renault Duster Test Drive'
      : modal.mode === 'whatsapp-fallback'
        ? 'Connect With Our Showroom Team'
        : modal.preselectedSubject || 'Showroom Offer & Pricing Enquiry';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="showroom-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white text-slate-900 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Renault Duster Showroom Desk
            </p>
            <h2 id="showroom-modal-title" className="text-xl font-semibold mt-1">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5">
          {modal.mode === 'whatsapp-fallback' && (
            <div className="mb-5 p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3 text-sm text-slate-700">
              <MessageCircle className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                {isConfiguredValue(WHATSAPP_NUMBER)
                  ? 'Leave your details below if you prefer a callback from our showroom desk.'
                  : 'Direct WhatsApp chat will go live as soon as the showroom phone line is linked. Meanwhile, send your enquiry below and our team will respond promptly.'}
              </p>
            </div>
          )}

          {modal.mode === 'test-drive' ? (
            <TestDriveForm initialVariant={modal.preselectedVariant} compact />
          ) : (
            <GeneralEnquiryForm
              defaultType={modal.mode === 'offer-enquiry' ? 'offers' : 'general'}
              defaultVariant={modal.preselectedVariant}
              submitLabel={
                modal.mode === 'offer-enquiry'
                  ? 'Request Offer Details'
                  : 'Request Showroom Callback'
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
