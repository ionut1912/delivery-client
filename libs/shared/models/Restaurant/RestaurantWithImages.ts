import { RestaurantAddress } from './RestaurantAddress';
import { MenuItemWithImage } from '../MenuItem/MenuItemWithImage';
import { ReviewForRestaurant } from '../ReviewForRestaurant/ReviewForRestaurant';

export interface RestaurantWithImages {
  id: string;
  name: string;
  images: string[];
  address: RestaurantAddress;
  menuItems: MenuItemWithImage[];
  reviews: ReviewForRestaurant[];
}
