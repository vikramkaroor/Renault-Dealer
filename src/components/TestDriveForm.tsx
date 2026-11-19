import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Calendar } from 'lucide-react';
import { DUSTER_VARIANTS } from '../data/duster';
import {
  validateTestDriveForm,
  type TestDriveFormData,
} from '../utils/dealershipHelpers';
import {
  submitTestDriveBooking,
  type SubmissionResult,
} from '../services/enquiryService';

interface TestDriveFormProps {
  initialVariant?: string;
  compact?: boolean;
  onSuccess?: (result: SubmissionResult) => void;
}

const TIME_SLOTS = [
  '10:30 AM',
  '12:00 PM',
  '02:30 PM',
  '04:30 PM',
  '06:00 PM',
];

function getTomorrowIsoDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function TestDriveForm({
  initialVariant,
  compact = false,
  onSuccess,
}: TestDriveFormProps) {
  const [formData, setFormData] = useState<TestDriveFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    preferredVariant: initialVariant || DUSTER_VARIANTS[1].name,
    preferredDate: getTomorrowIsoDate(),
    preferredTime: TIME_SLOTS[0],
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<SubmissionResult | null>(null);

  const handleFieldChange = (field: keyof TestDriveFormData, value: string) => {
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
    const errors = validateTestDriveForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitTestDriveBooking(formData);
      setConfirmation(result);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Unable to submit booking right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div
        data-testid="test-drive-confirmation"
        className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="w-6 h-6 text-[#15803D] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs font-medium text-[#15803D]">
              Request Logged · Reference {confirmation.referenceId}
            </p>
            <h3 className="text-xl font-semibold text-slate-900 mt-1">
              Test Drive Request Received
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {confirmation.message}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-sm">
          <div>
            <dt className="text-xs text-slate-500">Customer Name</dt>
            <dd className="font-medium text-slate-900 mt-0.5">
              {confirmation.summary.fullName}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Mobile Number</dt>
            <dd className="font-medium text-slate-900 mt-0.5 tabular-nums">
              {confirmation.summary.mobileNumber}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Preferred Variant</dt>
            <dd className="font-medium text-slate-900 mt-0.5">
              {confirmation.summary.variant}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Requested Schedule</dt>
            <dd className="font-medium text-slate-900 mt-0.5">
              {confirmation.summary.schedule}
            </dd>
          </div>
        </dl>

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
          Book another test drive slot
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

      <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label
            htmlFor="td-fullName"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Full Name <span className="text-[#D9232E]">*</span>
          </label>
          <input
            id="td-fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g., Arjun Deshmukh"
            value={formData.fullName}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            aria-invalid={Boolean(fieldErrors.fullName)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
          />
          {fieldErrors.fullName && (
            <p className="mt-1 text-xs text-[#D9232E]">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="td-mobile"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Mobile Number (India) <span className="text-[#D9232E]">*</span>
          </label>
          <input
            id="td-mobile"
            name="mobileNumber"
            type="tel"
            required
            autoComplete="tel"
            placeholder="10-digit mobile number"
            value={formData.mobileNumber}
            onChange={(e) => handleFieldChange('mobileNumber', e.target.value)}
            aria-invalid={Boolean(fieldErrors.mobileNumber)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C] tabular-nums"
          />
          {fieldErrors.mobileNumber && (
            <p className="mt-1 text-xs text-[#D9232E]">{fieldErrors.mobileNumber}</p>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label
            htmlFor="td-email"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="td-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-[#D9232E]">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="td-variant"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Preferred Variant <span className="text-[#D9232E]">*</span>
          </label>
          <select
            id="td-variant"
            name="preferredVariant"
            required
            value={formData.preferredVariant}
            onChange={(e) => handleFieldChange('preferredVariant', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
          >
            {DUSTER_VARIANTS.map((variant) => (
              <option key={variant.id} value={variant.name}>
                {variant.name} ({variant.trimLevel})
              </option>
            ))}
          </select>
          {fieldErrors.preferredVariant && (
            <p className="mt-1 text-xs text-[#D9232E]">
              {fieldErrors.preferredVariant}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="td-date"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Preferred Date <span className="text-[#D9232E]">*</span>
          </label>
          <input
            id="td-date"
            name="preferredDate"
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            value={formData.preferredDate}
            onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
            aria-invalid={Boolean(fieldErrors.preferredDate)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
          />
          {fieldErrors.preferredDate && (
            <p className="mt-1 text-xs text-[#D9232E]">
              {fieldErrors.preferredDate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="td-time"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Preferred Time <span className="text-[#D9232E]">*</span>
          </label>
          <select
            id="td-time"
            name="preferredTime"
            required
            value={formData.preferredTime}
            onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {fieldErrors.preferredTime && (
            <p className="mt-1 text-xs text-[#D9232E]">
              {fieldErrors.preferredTime}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="td-message"
          className="block text-sm font-medium text-slate-800 mb-1.5"
        >
          Additional Message <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="td-message"
          name="message"
          rows={compact ? 2 : 3}
          placeholder="Let us know if you prefer a doorstep test drive or have an existing vehicle for exchange."
          value={formData.message}
          onChange={(e) => handleFieldChange('message', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B162C] focus:ring-1 focus:ring-[#0B162C]"
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] disabled:opacity-60 rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B162C]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Submit Test Drive Request</span>
            </>
          )}
        </button>
        <p className="mt-2.5 text-xs text-slate-500">
          Your appointment slot is confirmed once our showroom coordinator verifies availability by phone.
        </p>
      </div>
    </form>
  );
}
