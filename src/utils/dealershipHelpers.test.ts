import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isConfiguredValue,
  getDisplayDealershipName,
  validateIndianMobile,
  validateEmail,
  validateTestDriveForm,
  buildWhatsAppUrl,
  calculateEMI,
  formatINR,
} from './dealershipHelpers';

test('isConfiguredValue identifies bracketed placeholders vs real values', () => {
  assert.equal(isConfiguredValue('[SHOWROOM_NAME]'), false);
  assert.equal(isConfiguredValue('  [WHATSAPP_NUMBER] '), false);
  assert.equal(isConfiguredValue(''), false);
  assert.equal(isConfiguredValue('Apex Renault Bengaluru'), true);
});

test('getDisplayDealershipName never leaks raw bracketed placeholders', () => {
  assert.equal(getDisplayDealershipName('[SHOWROOM_NAME]'), 'Renault Duster Showroom');
  assert.equal(getDisplayDealershipName('Trident Renault Indiranagar'), 'Trident Renault Indiranagar');
});

test('validateIndianMobile accepts valid formats and rejects invalid numbers', () => {
  assert.deepEqual(validateIndianMobile('9876543210'), {
    valid: true,
    normalized: '9876543210',
  });
  assert.deepEqual(validateIndianMobile('+91 98765-43210'), {
    valid: true,
    normalized: '9876543210',
  });
  assert.equal(validateIndianMobile('1234567890').valid, false);
  assert.equal(validateIndianMobile('98765').valid, false);
  assert.equal(validateIndianMobile('').valid, false);
});

test('validateEmail handles optional vs required checks', () => {
  assert.equal(validateEmail('', false).valid, true);
  assert.equal(validateEmail('', true).valid, false);
  assert.equal(validateEmail('driver@example.in', true).valid, true);
  assert.equal(validateEmail('not-an-email', false).valid, false);
});

test('validateTestDriveForm catches missing fields and passes valid payload', () => {
  const invalidErrors = validateTestDriveForm({
    fullName: '',
    mobileNumber: '123',
    email: 'bad',
    preferredVariant: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  assert.ok(invalidErrors.fullName);
  assert.ok(invalidErrors.mobileNumber);
  assert.ok(invalidErrors.email);
  assert.ok(invalidErrors.preferredVariant);
  assert.ok(invalidErrors.preferredDate);
  assert.ok(invalidErrors.preferredTime);

  const validErrors = validateTestDriveForm({
    fullName: 'Vikram Karoor',
    mobileNumber: '+91 9876543210',
    email: 'vikram@example.in',
    preferredVariant: 'Techno',
    preferredDate: '2026-11-25',
    preferredTime: '11:00 AM',
    message: 'Interested in highway ride evaluation.',
  });
  assert.deepEqual(validErrors, {});
});

test('buildWhatsAppUrl returns null for unconfigured placeholder and formats configured numbers', () => {
  assert.equal(buildWhatsAppUrl('[WHATSAPP_NUMBER]', 'Hello'), null);
  assert.equal(
    buildWhatsAppUrl('9876543210', 'Hi Duster'),
    'https://wa.me/919876543210?text=Hi%20Duster'
  );
  assert.equal(
    buildWhatsAppUrl('+91 98765 43210', 'Hi'),
    'https://wa.me/919876543210?text=Hi'
  );
});

test('calculateEMI computes accurate reducing-balance EMI and zero-interest edge case', () => {
  const standard = calculateEMI({
    onRoadPrice: 1400000,
    downPayment: 400000,
    annualRatePercent: 9.0,
    tenureMonths: 60,
  });
  assert.equal(standard.loanAmount, 1000000);
  // Standard EMI for 10,00,000 at 9% p.a. over 60 months is ~20,758
  assert.equal(standard.monthlyEmi, 20758);
  assert.ok(standard.totalRepayment > standard.loanAmount);
  assert.equal(standard.totalInterest, standard.totalRepayment - standard.loanAmount);
  assert.equal(standard.principalPercentage + standard.interestPercentage, 100);

  const zeroRate = calculateEMI({
    onRoadPrice: 1200000,
    downPayment: 0,
    annualRatePercent: 0,
    tenureMonths: 12,
  });
  assert.equal(zeroRate.monthlyEmi, 100000);
  assert.equal(zeroRate.totalInterest, 0);
});

test('formatINR formats Indian currency grouping correctly', () => {
  assert.equal(formatINR(1400000), '₹14,00,000');
  assert.equal(formatINR(20758), '₹20,758');
});
