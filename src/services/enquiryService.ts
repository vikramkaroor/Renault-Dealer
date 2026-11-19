import type {
  TestDriveFormData,
  GeneralEnquiryFormData,
} from '../utils/dealershipHelpers';

export interface SubmissionResult {
  success: boolean;
  referenceId: string;
  submittedAt: string;
  message: string;
  summary: {
    fullName: string;
    mobileNumber: string;
    variant?: string;
    schedule?: string;
  };
}

/**
 * Submits a test drive booking request to the showroom backend endpoint.
 * Confirmation is strictly gated on a verified HTTP 2xx JSON response.
 */
export async function submitTestDriveBooking(
  payload: TestDriveFormData
): Promise<SubmissionResult> {
  const response = await fetch('/api/test-drives', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    throw new Error(
      data?.error ||
        'Unable to submit your test drive request right now. Please review your details and try again.'
    );
  }

  return data as SubmissionResult;
}

/**
 * Submits a general, finance, exchange, or offer enquiry to the backend endpoint.
 */
export async function submitGeneralEnquiry(
  payload: GeneralEnquiryFormData
): Promise<SubmissionResult> {
  const response = await fetch('/api/enquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    throw new Error(
      data?.error ||
        'Unable to record your enquiry right now. Please verify your inputs and retry.'
    );
  }

  return data as SubmissionResult;
}
