import { ArrowUpRight, Instagram, MapPin, MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import type { RoutePath } from '../types/navigation';
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
} from '../config/dealership';
import {
  getDisplayDealershipName,
  isConfiguredValue,
  buildWhatsAppUrl,
} from '../utils/dealershipHelpers';

interface FooterProps {
  onNavigate: (path: RoutePath, hashSection?: string) => void;
  onOpenLegal: (tab: 'privacy' | 'terms') => void;
  onOpenEnquiry: () => void;
  onWhatsAppFallback: () => void;
}

export function Footer({
  onNavigate,
  onOpenLegal,
  onOpenEnquiry,
  onWhatsAppFallback,
}: FooterProps) {
  const brandName = getDisplayDealershipName(DEALERSHIP_NAME);
  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    WHATSAPP_DEFAULT_MESSAGE
  );
  const hasInstagram = isConfiguredValue(INSTAGRAM_PROFILE_URL);
  const hasDirections = isConfiguredValue(GOOGLE_MAPS_DIRECTIONS_URL);
  const hasAddress = isConfiguredValue(DEALERSHIP_ADDRESS);
  const hasPhone = isConfiguredValue(CONTACT_NUMBER);
  const hasEmail = isConfiguredValue(EMAIL_ADDRESS);
  const hasHours = isConfiguredValue(BUSINESS_HOURS);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B162C] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Dealership Summary */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              {brandName}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dedicated Renault Duster showcase in India offering guided variant walkthroughs, test drive appointments, retail finance assistance, and vehicle exchange support.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {hasInstagram ? (
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-200 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span>Instagram</span>
                </button>
              )}

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-200 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onWhatsAppFallback}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Showroom Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about');
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Showroom
                </a>
              </li>
              <li>
                <a
                  href="/offers"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/offers');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Offers & EMI Calculator
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact & Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Renault Duster Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Renault Duster
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/explore"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/explore');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Explore Duster Overview
                </a>
              </li>
              <li>
                <a
                  href="/variants"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/variants');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Compare Variants
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/gallery');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Exterior & Interior Gallery
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenEnquiry}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Request Callback
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Contact */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-semibold text-white mb-4">
              Showroom Details
            </h3>
            <div className="flex items-start gap-2.5 text-slate-400">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span>
                {hasAddress
                  ? DEALERSHIP_ADDRESS
                  : 'Showroom address will be published here once finalized.'}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Phone className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
              {hasPhone ? (
                <a href={`tel:${CONTACT_NUMBER}`} className="hover:text-white">
                  {CONTACT_NUMBER}
                </a>
              ) : (
                <span>Callback via online enquiry form</span>
              )}
            </div>
            {hasEmail && (
              <div className="flex items-center gap-2.5 text-slate-400">
                <Mail className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
                <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-white">
                  {EMAIL_ADDRESS}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-slate-400">
              <Clock className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
              <span>
                {hasHours
                  ? BUSINESS_HOURS
                  : 'Open daily · Confirm showroom hours on request'}
              </span>
            </div>

            <div className="pt-2">
              {hasDirections ? (
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-slate-200 underline underline-offset-4"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-slate-200 underline underline-offset-4 cursor-pointer"
                >
                  <span>View Showroom Location</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {brandName}. Specifications, trims, and pricing are subject to manufacturer and showroom updates.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms and Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
