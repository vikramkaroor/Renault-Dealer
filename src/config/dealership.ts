/**
 * Central Dealership Configuration
 *
 * Replace these placeholder values with your actual showroom details.
 * Updating this single file automatically propagates across every page,
 * header, footer, WhatsApp link, Google Maps embed, and contact view.
 */

export const DEALERSHIP_NAME = '[SHOWROOM_NAME]';
export const DEALERSHIP_ADDRESS = '[SHOWROOM_ADDRESS]';
export const CONTACT_NUMBER = '[CONTACT_NUMBER]';
export const WHATSAPP_NUMBER = '[WHATSAPP_NUMBER]';
export const INSTAGRAM_PROFILE_URL = '[INSTAGRAM_PROFILE_URL]';
export const GOOGLE_MAPS_DIRECTIONS_URL = '[GOOGLE_MAPS_DIRECTIONS_URL]';
export const GOOGLE_MAPS_EMBED_URL = '[GOOGLE_MAPS_EMBED_URL]';
export const EMAIL_ADDRESS = '[EMAIL_ADDRESS]';
export const BUSINESS_HOURS = '[BUSINESS_HOURS]';
export const SHOWROOM_LOGO = '[LOGO_ASSET]';

/**
 * Optional CRM / Google Sheets webhook endpoint for forwarding
 * test-drive bookings and enquiries from the backend API.
 */
export const CRM_WEBHOOK_URL = '';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello, I would like to know more about the Renault Duster variants, on-road pricing, and test drive availability.';

export const DEALERSHIP_CONFIG = {
  name: DEALERSHIP_NAME,
  address: DEALERSHIP_ADDRESS,
  contactNumber: CONTACT_NUMBER,
  whatsappNumber: WHATSAPP_NUMBER,
  instagramProfileUrl: INSTAGRAM_PROFILE_URL,
  googleMapsDirectionsUrl: GOOGLE_MAPS_DIRECTIONS_URL,
  googleMapsEmbedUrl: GOOGLE_MAPS_EMBED_URL,
  emailAddress: EMAIL_ADDRESS,
  businessHours: BUSINESS_HOURS,
  logoAsset: SHOWROOM_LOGO,
  whatsappDefaultMessage: WHATSAPP_DEFAULT_MESSAGE,
} as const;
