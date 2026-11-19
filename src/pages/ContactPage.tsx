import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
  Navigation,
  ArrowUpRight,
} from 'lucide-react';
import {
  DEALERSHIP_NAME,
  DEALERSHIP_ADDRESS,
  CONTACT_NUMBER,
  EMAIL_ADDRESS,
  BUSINESS_HOURS,
  WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
  INSTAGRAM_PROFILE_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
} from '../config/dealership';
import {
  getDisplayDealershipName,
  isConfiguredValue,
  buildWhatsAppUrl,
} from '../utils/dealershipHelpers';
import { TestDriveForm } from '../components/TestDriveForm';
import { GeneralEnquiryForm } from '../components/GeneralEnquiryForm';

interface ContactPageProps {
  onWhatsAppFallback: () => void;
}

export function ContactPage({ onWhatsAppFallback }: ContactPageProps) {
  const [formTab, setFormTab] = useState<'test-drive' | 'enquiry'>('test-drive');

  const brandName = getDisplayDealershipName(DEALERSHIP_NAME);
  const hasAddress = isConfiguredValue(DEALERSHIP_ADDRESS);
  const hasPhone = isConfiguredValue(CONTACT_NUMBER);
  const hasEmail = isConfiguredValue(EMAIL_ADDRESS);
  const hasHours = isConfiguredValue(BUSINESS_HOURS);
  const hasInstagram = isConfiguredValue(INSTAGRAM_PROFILE_URL);
  const hasDirections = isConfiguredValue(GOOGLE_MAPS_DIRECTIONS_URL);
  const hasEmbed = isConfiguredValue(GOOGLE_MAPS_EMBED_URL);
  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    WHATSAPP_DEFAULT_MESSAGE
  );

  return (
    <div className="bg-white text-slate-900">
      <section className="bg-[#0B162C] text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
            Contact & Appointments
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Connect With {brandName}
          </h1>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Book your Renault Duster test drive, request an on-road quote, or connect directly with our showroom team.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-[#0B162C]">
                Showroom Information
              </h2>

              <dl className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0B162C] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-slate-900">Address</dt>
                    <dd className="text-slate-600 mt-0.5 leading-relaxed">
                      {hasAddress
                        ? DEALERSHIP_ADDRESS
                        : 'Showroom address is currently being updated in configuration.'}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0B162C] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-slate-900">Phone</dt>
                    <dd className="text-slate-600 mt-0.5">
                      {hasPhone ? (
                        <a
                          href={`tel:${CONTACT_NUMBER}`}
                          className="font-medium text-[#0B162C] hover:underline"
                        >
                          {CONTACT_NUMBER}
                        </a>
                      ) : (
                        'Use the form alongside to request a priority phone callback.'
                      )}
                    </dd>
                  </div>
                </div>

                {hasEmail && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#0B162C] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <dt className="font-medium text-slate-900">Email</dt>
                      <dd className="text-slate-600 mt-0.5">
                        <a
                          href={`mailto:${EMAIL_ADDRESS}`}
                          className="hover:underline"
                        >
                          {EMAIL_ADDRESS}
                        </a>
                      </dd>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#0B162C] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-slate-900">Business Hours</dt>
                    <dd className="text-slate-600 mt-0.5">
                      {hasHours
                        ? BUSINESS_HOURS
                        : 'Monday – Sunday · Confirm visit timing on request'}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3">
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onWhatsAppFallback}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-md transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </button>
                )}

                {hasInstagram && (
                  <a
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0B162C] bg-white border border-slate-300 hover:border-slate-500 rounded-md transition-colors"
                  >
                    <Instagram className="w-4 h-4" aria-hidden="true" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}

                {hasDirections && (
                  <a
                    href={GOOGLE_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#162747] rounded-md transition-colors"
                  >
                    <Navigation className="w-4 h-4" aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>
                )}
              </div>
            </div>

            {/* Map Embed / Ready Card */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[260px]">
              {hasEmbed ? (
                <iframe
                  title={`${brandName} Location Map`}
                  src={GOOGLE_MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[280px] border-0"
                  allowFullScreen
                />
              ) : (
                <div className="p-8 h-[260px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <MapPin className="w-8 h-8 text-[#0B162C] mb-2" aria-hidden="true" />
                  <p className="text-sm font-semibold text-[#0B162C]">
                    Google Maps Embed Ready
                  </p>
                  <p className="text-xs text-slate-600 mt-1 max-w-xs">
                    Add your showroom’s Google Maps embed URL in dealership settings to display live map navigation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Forms */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0B162C]">
                    {formTab === 'test-drive'
                      ? 'Book a Test Drive'
                      : 'Send a Showroom Enquiry'}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {formTab === 'test-drive'
                      ? 'Choose your preferred Duster variant, date, and slot.'
                      : 'Ask about pricing, offers, finance, or vehicle exchange.'}
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label="Contact form type"
                  className="inline-flex p-1 bg-slate-200/80 rounded-lg self-start"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formTab === 'test-drive'}
                    onClick={() => setFormTab('test-drive')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      formTab === 'test-drive'
                        ? 'bg-white text-[#0B162C] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Test Drive
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formTab === 'enquiry'}
                    onClick={() => setFormTab('enquiry')}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      formTab === 'enquiry'
                        ? 'bg-white text-[#0B162C] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    General Enquiry
                  </button>
                </div>
              </div>

              {formTab === 'test-drive' ? (
                <TestDriveForm />
              ) : (
                <GeneralEnquiryForm defaultType="general" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
