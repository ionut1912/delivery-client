import { RestaurantAddress } from './RestaurantAddress';
import { MenuItemWithImage } from '../MenuItem/MenuItemWithImage';
import { ReviewForRestaurant } from '../ReviewForRestaurant/ReviewForRestaurant';

export interface RestaurantWithImage {
  id: string;
  name: string;
  image: string;
  address: RestaurantAddress;
  menuItems: MenuItemWithImage[];
  reviews: ReviewForRestaurant[];
}
