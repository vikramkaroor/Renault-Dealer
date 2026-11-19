import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { DUSTER_VARIANTS } from '../data/duster';
import {
  validateGeneralEnquiryForm,
  type GeneralEnquiryFormData,
} from '../utils/dealershipHelpers';
import {
  submitGeneralEnquiry,
  type SubmissionResult,
} from '../services/enquiryService';

interface GeneralEnquiryFormProps {
  defaultType?: GeneralEnquiryFormData['enquiryType'];
  defaultVariant?: string;
  submitLabel?: string;
}

export function GeneralEnquiryForm({
  defaultType = 'general',
  defaultVariant = '',
  submitLabel = 'Send Showroom Enquiry',
}: GeneralEnquiryFormProps) {
  const [formData, setFormData] = useState<GeneralEnquiryFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    enquiryType: defaultType,
    preferredVariant: defaultVariant || DUSTER_VARIANTS[1].name,
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<SubmissionResult | null>(null);

  const handleChange = (
    field: keyof GeneralEnquiryFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateGeneralEnquiryForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitGeneralEnquiry(formData);
      setConfirmation(result);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Unable to submit enquiry right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div
        data-testid="enquiry-confirmation"
        className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="w-6 h-6 text-[#15803D] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs font-medium text-[#15803D]">
              Enquiry Recorded · Reference {confirmation.referenceId}
            </p>
            <h3 className="text-lg font-semibold text-slate-900 mt-1">
              Thank You, {confirmation.summary.fullName}
            </h3>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              {confirmation.message}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setConfirmation(null);
            setFormData((prev) => ({
              ...prev,
              fullName: '',
              mobileNumber: '',
              email: '',
              message: '',
            }));
          }}
          className="text-sm font-medium text-[#0B162C] hover:text-[#D9232E] underline underline-offset-4 cursor-pointer"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="enq-name"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Full Name <span className="text-[#D9232E]">*</span>
          </label>
          <input
            id="enq-name"
            type="text"
            required
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            aria-invalid={Boolean(fieldErrors.fullName)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
          />
          {fieldErrors.fullName && (
            <p className="mt-1 text-xs text-[#D9232E]">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="enq-mobile"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Mobile Number <span className="text-[#D9232E]">*</span>
          </label>
          <input
            id="enq-mobile"
            type="tel"
            required
            placeholder="10-digit Indian mobile number"
            value={formData.mobileNumber}
            onChange={(e) => handleChange('mobileNumber', e.target.value)}
            aria-invalid={Boolean(fieldErrors.mobileNumber)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C] tabular-nums"
          />
          {fieldErrors.mobileNumber && (
            <p className="mt-1 text-xs text-[#D9232E]">
              {fieldErrors.mobileNumber}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="enq-type"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Enquiry Topic
          </label>
          <select
            id="enq-type"
            value={formData.enquiryType}
            onChange={(e) =>
              handleChange(
                'enquiryType',
                e.target.value as GeneralEnquiryFormData['enquiryType']
              )
            }
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
          >
            <option value="offers">Showroom Offers & Pricing</option>
            <option value="finance">Finance & EMI Consultation</option>
            <option value="exchange">Used Car Exchange Valuation</option>
            <option value="general">General Showroom Enquiry</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="enq-variant"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Variant of Interest
          </label>
          <select
            id="enq-variant"
            value={formData.preferredVariant}
            onChange={(e) => handleChange('preferredVariant', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
          >
            {DUSTER_VARIANTS.map((variant) => (
              <option key={variant.id} value={variant.name}>
                {variant.name}
              </option>
            ))}
            <option value="Undecided — Seeking Recommendation">
              Undecided — Seeking Recommendation
            </option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="enq-email"
          className="block text-sm font-medium text-slate-800 mb-1.5"
        >
          Email Address <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <input
          id="enq-email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-xs text-[#D9232E]">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="enq-message"
          className="block text-sm font-medium text-slate-800 mb-1.5"
        >
          Message <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="enq-message"
          rows={3}
          placeholder="Share your questions regarding variants, delivery timelines, exchange vehicle details, or loan requirements."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#162747] disabled:opacity-60 rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B162C]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>{submitLabel}</span>
          </>
        )}
      </button>
    </form>
  );
}
