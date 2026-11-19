import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { RoutePath } from '../types/navigation';
import { DEALERSHIP_NAME, SHOWROOM_LOGO } from '../config/dealership';
import { getDisplayDealershipName, isConfiguredValue } from '../utils/dealershipHelpers';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath, hashSection?: string) => void;
  onOpenTestDrive: () => void;
}

interface NavItem {
  label: string;
  path: RoutePath;
  hash?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Explore Duster', path: '/explore' },
  { label: 'Variants', path: '/variants' },
  { label: 'Features', path: '/', hash: 'features' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Offers', path: '/offers' },
  { label: 'About Showroom', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar({
  currentPath,
  onNavigate,
  onOpenTestDrive,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const brandName = getDisplayDealershipName(DEALERSHIP_NAME);
  const hasLogo = isConfiguredValue(SHOWROOM_LOGO);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  const handleLinkClick = (item: NavItem) => {
    setMobileOpen(false);
    onNavigate(item.path, item.hash);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0B162C]/95 backdrop-blur-md border-b border-white/10 text-white'
          : 'bg-[#0B162C] border-b border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm"
        >
          {hasLogo ? (
            <img
              src={SHOWROOM_LOGO}
              alt={brandName}
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          ) : null}
          <span>{brandName}</span>
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-300"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = !item.hash && currentPath === item.path;
            return (
              <a
                key={item.label}
                href={item.hash ? `${item.path}#${item.hash}` : item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  isActive
                    ? 'text-white border-[#D9232E]'
                    : 'border-transparent hover:text-white hover:border-white/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenTestDrive}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] transition-colors duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book a Test Drive
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="lg:hidden bg-[#0B162C] border-t border-white/10 px-4 py-5 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = !item.hash && currentPath === item.path;
            return (
              <a
                key={item.label}
                href={item.hash ? `${item.path}#${item.hash}` : item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-3 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenTestDrive();
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#D9232E] hover:bg-[#B91C1C] rounded-md transition-colors cursor-pointer"
            >
              Book a Test Drive
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
