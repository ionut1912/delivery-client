import { RestaurantAddressDto } from './RestaurantAddressDto';

export interface RestaurantDto {
  name: string;
  address: RestaurantAddressDto;
  menuItemsName: string[];
}
