import { RestaurantAddress } from './RestaurantAddress';
import { MenuItem } from '../MenuItem/MenuItem';
import { ReviewForRestaurant } from '../ReviewForRestaurant/ReviewForRestaurant';
import { PhotoForRestaurant } from '../Photos/PhotoForRestaurant';
import { MenuItemsRestaurants } from '../MenuItemsRestaurants/MenuItemsRestaurants';

export interface Restaurant {
  id: string;
  name: string;
  restaurantPhotos: PhotoForRestaurant[];
  address: RestaurantAddress;
  reviews: ReviewForRestaurant[];
  menuItemsRestaurants: MenuItemsRestaurants[];
}
