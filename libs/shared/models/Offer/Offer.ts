import { OfferMenuItems } from '../MenuItem/OfferMenuItems';

export interface Offer {
  id: string;
  dateActiveFrom: string;
  dateActiveTo: string;
  discount: number;
  active: boolean;
  offerMenuItems: OfferMenuItems[];
}
