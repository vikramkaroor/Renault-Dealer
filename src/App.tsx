import { useState, useEffect, useCallback } from 'react';
import type { RoutePath, ModalContextState } from './types/navigation';
import { DEALERSHIP_NAME } from './config/dealership';
import { getDisplayDealershipName } from './utils/dealershipHelpers';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { TestDriveModal } from './components/TestDriveModal';
import { LegalModal } from './components/LegalModal';
import { HomePage } from './pages/HomePage';
import { ExploreDusterPage } from './pages/ExploreDusterPage';
import { VariantsPage } from './pages/VariantsPage';
import { GalleryPage } from './pages/GalleryPage';
import { OffersFinancePage } from './pages/OffersFinancePage';
import { AboutShowroomPage } from './pages/AboutShowroomPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PATHS: RoutePath[] = [
  '/',
  '/explore',
  '/variants',
  '/gallery',
  '/offers',
  '/about',
  '/contact',
];

function resolvePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return VALID_PATHS.includes(clean as RoutePath) ? (clean as RoutePath) : '/';
}

const PAGE_TITLES: Record<RoutePath, string> = {
  '/': 'Renault Duster Showroom | Explore Variants, Test Drive & Offers',
  '/explore': 'Explore Renault Duster | Specifications, Features & Brochure',
  '/variants': 'Renault Duster Variants | Compare Trims & Request Quote',
  '/gallery': 'Renault Duster Gallery | Exterior & Interior Showcase',
  '/offers': 'Renault Duster Offers & EMI Calculator | Finance Desk',
  '/about': 'About Our Showroom | Renault Duster Experience',
  '/contact': 'Contact Showroom & Book Test Drive | Renault Duster',
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    resolvePath(window.location.pathname)
  );
  const [modal, setModal] = useState<ModalContextState>({
    isOpen: false,
    mode: 'test-drive',
  });
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(resolvePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const brandName = getDisplayDealershipName(DEALERSHIP_NAME);
    const baseTitle = PAGE_TITLES[currentPath];
    document.title =
      brandName !== 'Renault Duster Showroom'
        ? `${baseTitle} — ${brandName}`
        : baseTitle;
  }, [currentPath]);

  const navigate = useCallback(
    (targetPath: RoutePath, hashSection?: string) => {
      const targetUrl = hashSection ? `${targetPath}#${hashSection}` : targetPath;
      if (window.location.pathname !== targetPath || hashSection) {
        window.history.pushState({}, '', targetUrl);
      }
      setCurrentPath(targetPath);

      if (hashSection) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(hashSection);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 50);
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    },
    []
  );

  const openTestDrive = useCallback((variantName?: string) => {
    setModal({
      isOpen: true,
      mode: 'test-drive',
      preselectedVariant: variantName,
    });
  }, []);

  const openOfferEnquiry = useCallback((subject?: string, variantName?: string) => {
    setModal({
      isOpen: true,
      mode: 'offer-enquiry',
      preselectedSubject: subject,
      preselectedVariant: variantName,
    });
  }, []);

  const openWhatsAppFallback = useCallback(() => {
    setModal({
      isOpen: true,
      mode: 'whatsapp-fallback',
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0B162C] focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenTestDrive={() => openTestDrive()}
      />

      <main id="main-content" className="flex-1">
        {currentPath === '/' && (
          <HomePage
            onNavigate={navigate}
            onOpenTestDrive={openTestDrive}
            onOpenOfferEnquiry={(subject) => openOfferEnquiry(subject)}
            onWhatsAppFallback={openWhatsAppFallback}
          />
        )}

        {currentPath === '/explore' && (
          <ExploreDusterPage
            onNavigate={navigate}
            onBookTestDrive={() => openTestDrive()}
            onRequestEnquiry={(subject) => openOfferEnquiry(subject)}
          />
        )}

        {currentPath === '/variants' && (
          <VariantsPage
            onBookTestDrive={(variantName) => openTestDrive(variantName)}
            onEnquireVariant={(variantName) =>
              openOfferEnquiry(`Quote Request: ${variantName}`, variantName)
            }
          />
        )}

        {currentPath === '/gallery' && <GalleryPage />}

        {currentPath === '/offers' && (
          <OffersFinancePage
            onEnquireOffer={(subject) => openOfferEnquiry(subject)}
          />
        )}

        {currentPath === '/about' && <AboutShowroomPage />}

        {currentPath === '/contact' && (
          <ContactPage onWhatsAppFallback={openWhatsAppFallback} />
        )}
      </main>

      <Footer
        onNavigate={navigate}
        onOpenLegal={(tab) => setLegalTab(tab)}
        onOpenEnquiry={() => openOfferEnquiry('General Showroom Callback Request')}
        onWhatsAppFallback={openWhatsAppFallback}
      />

      <WhatsAppButton onFallbackOpen={openWhatsAppFallback} />

      <TestDriveModal modal={modal} onClose={closeModal} />

      <LegalModal activeTab={legalTab} onClose={() => setLegalTab(null)} />
    </div>
  );
}
