import { MessageCircle } from 'lucide-react';
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DEFAULT_MESSAGE,
} from '../config/dealership';
import { buildWhatsAppUrl } from '../utils/dealershipHelpers';

interface WhatsAppButtonProps {
  onFallbackOpen: () => void;
}

export function WhatsAppButton({ onFallbackOpen }: WhatsAppButtonProps) {
  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP_NUMBER,
    WHATSAPP_DEFAULT_MESSAGE
  );

  if (whatsappUrl) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with showroom"
        title="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-13 h-13 rounded-full bg-[#15803D] hover:bg-[#166534] text-white shadow-lg transition-transform duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B162C]"
      >
        <MessageCircle className="w-6 h-6" aria-hidden="true" />
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onFallbackOpen}
      aria-label="Chat on WhatsApp with showroom"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-13 h-13 rounded-full bg-[#15803D] hover:bg-[#166534] text-white shadow-lg transition-transform duration-150 hover:scale-105 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B162C]"
    >
      <MessageCircle className="w-6 h-6" aria-hidden="true" />
    </button>
  );
}
