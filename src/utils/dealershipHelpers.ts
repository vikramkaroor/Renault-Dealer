export interface TestDriveFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  preferredVariant: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface GeneralEnquiryFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  enquiryType: 'offers' | 'finance' | 'exchange' | 'general';
  preferredVariant: string;
  message: string;
}

export interface EMICalculationInput {
  onRoadPrice: number;
  downPayment: number;
  annualRatePercent: number;
  tenureMonths: number;
}

export interface EMIBreakdown {
  loanAmount: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
  principalPercentage: number;
  interestPercentage: number;
}

/**
 * Determines whether a central configuration field holds a real value
 * rather than an unconfigured bracketed placeholder such as "[SHOWROOM_NAME]".
 */
export function isConfiguredValue(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return false;
  return true;
}

/**
 * Returns a clean visitor-facing showroom title without exposing raw placeholder tokens.
 */
export function getDisplayDealershipName(configuredName: string): string {
  return isConfiguredValue(configuredName)
    ? configuredName.trim()
    : 'Renault Duster Showroom';
}

/**
 * Normalizes and validates an Indian 10-digit mobile number.
 * Accepts optional +91, 91, or leading 0 prefixes, spaces, or hyphens.
 */
export function validateIndianMobile(raw: string): {
  valid: boolean;
  normalized: string;
  error?: string;
} {
  const digitsOnly = raw.replace(/[\s\-().+]/g, '');
  let core = digitsOnly;

  if (core.startsWith('91') && core.length === 12) {
    core = core.slice(2);
  } else if (core.startsWith('0') && core.length === 11) {
    core = core.slice(1);
  }

  if (!core) {
    return {
      valid: false,
      normalized: '',
      error: 'Please enter your 10-digit mobile number.',
    };
  }

  if (!/^[6-9]\d{9}$/.test(core)) {
    return {
      valid: false,
      normalized: core,
      error: 'Enter a valid 10-digit Indian mobile number starting with 6–9.',
    };
  }

  return {
    valid: true,
    normalized: core,
  };
}

export function validateEmail(
  raw: string,
  required = false
): { valid: boolean; error?: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return required
      ? { valid: false, error: 'Please enter your email address.' }
      : { valid: true };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

export function validateTestDriveForm(
  data: TestDriveFormData
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const mobileCheck = validateIndianMobile(data.mobileNumber);
  if (!mobileCheck.valid && mobileCheck.error) {
    errors.mobileNumber = mobileCheck.error;
  }

  const emailCheck = validateEmail(data.email, false);
  if (!emailCheck.valid && emailCheck.error) {
    errors.email = emailCheck.error;
  }

  if (!data.preferredVariant.trim()) {
    errors.preferredVariant = 'Please select a preferred Duster variant.';
  }

  if (!data.preferredDate.trim()) {
    errors.preferredDate = 'Please select your preferred date.';
  }

  if (!data.preferredTime.trim()) {
    errors.preferredTime = 'Please select a preferred time slot.';
  }

  return errors;
}

export function validateGeneralEnquiryForm(
  data: GeneralEnquiryFormData
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const mobileCheck = validateIndianMobile(data.mobileNumber);
  if (!mobileCheck.valid && mobileCheck.error) {
    errors.mobileNumber = mobileCheck.error;
  }

  const emailCheck = validateEmail(data.email, false);
  if (!emailCheck.valid && emailCheck.error) {
    errors.email = emailCheck.error;
  }

  return errors;
}

/**
 * Builds a properly encoded WhatsApp click-to-chat URL if configured.
 * Returns null if WHATSAPP_NUMBER is still an unconfigured placeholder.
 */
export function buildWhatsAppUrl(
  configuredNumber: string,
  prefillMessage: string
): string | null {
  if (!isConfiguredValue(configuredNumber)) return null;
  const numeric = configuredNumber.replace(/[^\d]/g, '');
  if (!numeric) return null;
  const formattedNumber = numeric.length === 10 ? `91${numeric}` : numeric;
  const text = encodeURIComponent(prefillMessage);
  return `https://wa.me/${formattedNumber}?text=${text}`;
}

/**
 * Calculates reducing-balance monthly EMI and repayment totals.
 * All returned values are rounded to nearest integer INR.
 */
export function calculateEMI(input: EMICalculationInput): EMIBreakdown {
  const safePrice = Math.max(0, Number.isFinite(input.onRoadPrice) ? input.onRoadPrice : 0);
  const safeDown = Math.min(
    safePrice,
    Math.max(0, Number.isFinite(input.downPayment) ? input.downPayment : 0)
  );
  const loanAmount = Math.max(0, Math.round(safePrice - safeDown));
  const tenureMonths = Math.max(1, Math.round(input.tenureMonths || 12));
  const annualRate = Math.max(0, Number.isFinite(input.annualRatePercent) ? input.annualRatePercent : 0);

  if (loanAmount === 0) {
    return {
      loanAmount: 0,
      monthlyEmi: 0,
      totalInterest: 0,
      totalRepayment: 0,
      principalPercentage: 100,
      interestPercentage: 0,
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  let monthlyEmiFloat = 0;

  if (monthlyRate === 0) {
    monthlyEmiFloat = loanAmount / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEmiFloat = (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  const monthlyEmi = Math.round(monthlyEmiFloat);
  const totalRepayment = Math.round(monthlyEmiFloat * tenureMonths);
  const totalInterest = Math.max(0, totalRepayment - loanAmount);
  const principalPercentage =
    totalRepayment > 0 ? Math.round((loanAmount / totalRepayment) * 100) : 100;
  const interestPercentage = Math.max(0, 100 - principalPercentage);

  return {
    loanAmount,
    monthlyEmi,
    totalInterest,
    totalRepayment,
    principalPercentage,
    interestPercentage,
  };
}

/**
 * Formats an integer amount in standard Indian Numbering System (lakhs/crores).
 */
export function formatINR(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(safe);
}
