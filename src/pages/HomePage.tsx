import type { RoutePath } from '../types/navigation';
import type { DusterVariant } from '../data/duster';
import { HeroSection } from '../components/HeroSection';
import { IntroSection } from '../components/IntroSection';
import { VehicleHighlights } from '../components/VehicleHighlights';
import { VariantShowcase } from '../components/VariantShowcase';
import { ShowcaseGallerySection } from '../components/ShowcaseGallerySection';
import { TechSafetySection } from '../components/TechSafetySection';
import { OffersSection } from '../components/OffersSection';
import { WhyChooseShowroom } from '../components/WhyChooseShowroom';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ShowroomLocation } from '../components/ShowroomLocation';
import { FinalCTASection } from '../components/FinalCTASection';

interface HomePageProps {
  onNavigate: (path: RoutePath, hashSection?: string) => void;
  onOpenTestDrive: (variantName?: string) => void;
  onOpenOfferEnquiry: (subject?: string) => void;
  onWhatsAppFallback: () => void;
}

export function HomePage({
  onNavigate,
  onOpenTestDrive,
  onOpenOfferEnquiry,
  onWhatsAppFallback,
}: HomePageProps) {
  const handleExploreVariant = (variant: DusterVariant) => {
    onNavigate('/variants');
    // Variant page highlights the lineup; user can compare immediately.
    void variant;
  };

  return (
    <>
      <HeroSection
        onExploreDuster={() => onNavigate('/explore')}
        onBookTestDrive={() => onOpenTestDrive()}
      />

      <IntroSection onExploreDuster={() => onNavigate('/explore')} />

      <VehicleHighlights />

      <VariantShowcase
        onExploreVariant={handleExploreVariant}
        onEnquireVariant={(variantName) => onOpenTestDrive(variantName)}
      />

      <ShowcaseGallerySection
        onOpenFullGallery={() => onNavigate('/gallery')}
      />

      <TechSafetySection />

      <OffersSection
        onEnquireOffers={(subject) => onOpenOfferEnquiry(subject)}
        onOpenOffersPage={() => onNavigate('/offers')}
      />

      <WhyChooseShowroom />

      <TestimonialsSection />

      <ShowroomLocation
        onOpenContactPage={() => onNavigate('/contact')}
        onRequestCallback={() => onOpenOfferEnquiry('Showroom Location & Visit Request')}
      />

      <FinalCTASection
        onBookTestDrive={() => onOpenTestDrive()}
        onContactShowroom={() => onNavigate('/contact')}
        onWhatsAppFallback={onWhatsAppFallback}
      />
    </>
  );
}
