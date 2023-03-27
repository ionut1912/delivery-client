import { PhotoForMenuItem } from '../Photos/PhotoForMenuItem';
import { OfferMenuItems } from './OfferMenuItems';

export interface MenuItem {
  id: string;
  itemName: string;
  category: string;
  ingredients: string;
  price: number;
  offerMenuItems: OfferMenuItems[];
  quantity: number;
  active: number;
  photos: PhotoForMenuItem[];
}
