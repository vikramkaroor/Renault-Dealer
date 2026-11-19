export type RoutePath =
  | '/'
  | '/explore'
  | '/variants'
  | '/gallery'
  | '/offers'
  | '/about'
  | '/contact';

export interface ModalContextState {
  isOpen: boolean;
  mode: 'test-drive' | 'offer-enquiry' | 'whatsapp-fallback';
  preselectedVariant?: string;
  preselectedSubject?: string;
}
