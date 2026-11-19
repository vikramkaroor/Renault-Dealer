import { Calendar, PhoneCall, MessageCircle } from 'lucide-react';
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
} from '../config/dealership';
import { buildWhatsAppUrl } from '../utils/dealershipHelpers';

interface FinalCTASectionProps {
  onBookTestDrive: () => void;
  onContactShowroom: () => void;
  onWhatsAppFallback: () => void;
}

export function FinalCTASection({
  onBookTestDrive,
  onContactShowroom,
  onWhatsAppFallback,
}: FinalCTASectionProps) {
  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    WHATSAPP_DEFAULT_MESSAGE
  );

  return (
    <section
      aria-label="Closing call to action"
      className="bg-[#111827] text-white py-16 sm:py-24"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          Experience The Drive
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          YOUR NEXT ADVENTURE STARTS HERE.
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Schedule a test drive at our showroom, connect with a Duster specialist for on-road pricing, or start a quick chat on WhatsApp.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onBookTestDrive}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Book a Test Drive</span>
          </button>

          <button
            type="button"
            onClick={onContactShowroom}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
            <span>Contact Our Showroom</span>
          </button>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-md transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={onWhatsAppFallback}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
