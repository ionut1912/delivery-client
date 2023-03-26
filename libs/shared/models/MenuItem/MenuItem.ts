import { PhotoForMenuItem } from '../Photos/PhotoForMenuItem';

export interface MenuItem {
  id: string;
  itemName: string;
  category: string;
  ingredients: string;
  price: number;
  quantity: number;
  active: number;
  photos: PhotoForMenuItem[];
}
