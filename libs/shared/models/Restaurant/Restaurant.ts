import { RestaurantAddress } from './RestaurantAddress';
import { MenuItem } from '../MenuItem/MenuItem';
import { ReviewForRestaurant } from '../ReviewForRestaurant/ReviewForRestaurant';

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  address: RestaurantAddress;
  menuItems: MenuItem[];
  reviews: ReviewForRestaurant[];
}
