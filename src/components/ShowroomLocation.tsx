import { MapPin, Phone, Clock, Mail, Navigation, ArrowRight } from 'lucide-react';
import {
  DEALERSHIP_NAME,
  DEALERSHIP_ADDRESS,
  CONTACT_NUMBER,
  EMAIL_ADDRESS,
  BUSINESS_HOURS,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
} from '../config/dealership';
import {
  getDisplayDealershipName,
  isConfiguredValue,
} from '../utils/dealershipHelpers';

interface ShowroomLocationProps {
  onOpenContactPage?: () => void;
  onRequestCallback?: () => void;
}

export function ShowroomLocation({
  onOpenContactPage,
  onRequestCallback,
}: ShowroomLocationProps) {
  const brandName = getDisplayDealershipName(DEALERSHIP_NAME);
  const hasAddress = isConfiguredValue(DEALERSHIP_ADDRESS);
  const hasPhone = isConfiguredValue(CONTACT_NUMBER);
  const hasEmail = isConfiguredValue(EMAIL_ADDRESS);
  const hasHours = isConfiguredValue(BUSINESS_HOURS);
  const hasDirections = isConfiguredValue(GOOGLE_MAPS_DIRECTIONS_URL);
  const hasEmbed = isConfiguredValue(GOOGLE_MAPS_EMBED_URL);

  return (
    <section
      id="showroom-location"
      className="bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Visit Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B162C]">
            Showroom Location & Hours
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Plan your in-person visit for a physical cabin walkaround, colour comparison, and test drive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Dealership Location
                </p>
                <h3 className="text-2xl font-semibold text-[#0B162C] mt-1">
                  {brandName}
                </h3>
              </div>

              <dl className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0B162C] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-slate-900">Showroom Address</dt>
                    <dd className="text-slate-600 mt-0.5 leading-relaxed">
                      {hasAddress
                        ? DEALERSHIP_ADDRESS
                        : 'Showroom street address will appear here once updated in the dealership configuration.'}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0B162C] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-slate-900">Sales Desk Phone</dt>
                    <dd className="text-slate-600 mt-0.5">
                      {hasPhone ? (
                        <a
                          href={`tel:${CONTACT_NUMBER}`}
                          className="font-medium text-[#0B162C] hover:underline"
                        >
                          {CONTACT_NUMBER}
                        </a>
                      ) : (
                        'Direct phone line updating — request a callback anytime.'
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
                        : 'Showroom hours available upon enquiry confirmation.'}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3">
              {hasDirections ? (
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#162747] rounded-md transition-colors whitespace-nowrap"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onRequestCallback || onOpenContactPage}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#162747] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  <span>Get Directions</span>
                </button>
              )}

              {onOpenContactPage && (
                <button
                  type="button"
                  onClick={onOpenContactPage}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#0B162C] border border-slate-300 hover:border-slate-500 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Contact Showroom</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 min-h-[320px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
            {hasEmbed ? (
              <iframe
                title={`${brandName} Google Map`}
                src={GOOGLE_MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[320px] border-0"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-100 to-slate-200">
                <MapPin className="w-10 h-10 text-[#0B162C] mb-3" aria-hidden="true" />
                <h4 className="text-lg font-semibold text-[#0B162C]">
                  Interactive Map Ready
                </h4>
                <p className="text-sm text-slate-600 max-w-md mt-1.5 leading-relaxed">
                  Configure your showroom’s Google Maps embed URL in the central dealership settings to display live interactive pin directions here.
                </p>
                {onRequestCallback && (
                  <button
                    type="button"
                    onClick={onRequestCallback}
                    className="mt-5 px-4 py-2 text-xs font-semibold text-white bg-[#0B162C] hover:bg-[#162747] rounded-md transition-colors cursor-pointer"
                  >
                    Request Location Pin via Callback
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
