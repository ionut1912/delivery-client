import { MenuItem } from '../MenuItem/MenuItem';
import { Restaurant } from '../Restaurant/Restaurant';

export interface MenuItemsRestaurants {
  menuItemsId: string;
  menuItems: MenuItem;
  restaurantsId: string;
  restaurants: Restaurant;
}
