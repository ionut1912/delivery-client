import { UserDto } from '../User/UserDto';
import { Restaurant } from '../Restaurant/Restaurant';
import { MenuItem } from '../MenuItem/MenuItem';

export interface Order {
  id: string;
  receivedTime: string;
  finalPrice: number;
  status: string;
  user: UserDto;
  restaurants: Restaurant[];
  menuItems: MenuItem[];
}
