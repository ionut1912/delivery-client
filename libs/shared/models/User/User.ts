import { UserAddress } from './UserAddress';
import { UserConfigs } from './UserConfigs';

export interface User {
  id: number;
  username: string;
  email: string;
  address: UserAddress;
  userConfig: UserConfigs;
  phoneNumber: string;
  photos: string[];
  role: string;
  ordersCount: number;
}
