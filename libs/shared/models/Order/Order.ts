import { Users } from '../User/Users';
import { Restaurant } from '../Restaurant/Restaurant';
import { MenuItem } from '../MenuItem/MenuItem';

export interface Order {
  id: string;
  receivedTime: string;
  finalPrice: number;
  status: string;
  user: Users;
  restaurants: Restaurant[];
  menuItems: MenuItem[];
}
