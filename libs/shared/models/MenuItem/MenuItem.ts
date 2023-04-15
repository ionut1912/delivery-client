import { PhotoForMenuItem } from '../Photos/PhotoForMenuItem';
import { OfferMenuItems } from './OfferMenuItems';
import { MenuItemsRestaurants } from '../MenuItemsRestaurants/MenuItemsRestaurants';

export interface MenuItem {
  id: string;
  itemName: string;
  category: string;
  ingredients: string;
  price: number;
  offerMenuItems: OfferMenuItems[];
  quantity: number;
  active: boolean;
  photos: PhotoForMenuItem[];
  menuItemsRestaurants: MenuItemsRestaurants[];
}
