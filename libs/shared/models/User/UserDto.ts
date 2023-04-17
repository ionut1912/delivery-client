import { UserConfigs } from './UserConfigs';
import { UserAddress } from './UserAddress';

export interface UserDto {
  token?: string;
  username: string;
  image?: string;
  phoneNumber: string;
  email: string;
  userConfig: UserConfigs;
  address: UserAddress;
}
