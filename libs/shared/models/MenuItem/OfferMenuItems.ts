import { Offer } from './Offer';
import { MenuItem } from './MenuItem';

export interface OfferMenuItems {
  offerId: string;
  offer: Offer;
  menuItemId: string;
  menuItem: MenuItem;
}
