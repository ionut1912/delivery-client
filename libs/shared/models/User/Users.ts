import { UserConfigs } from './UserConfigs';
import { UserAddress } from './UserAddress';

export interface Users {
  token: string;
  username: string;
  image: string;
  email: string;
  userConfig: UserConfigs;
  address: UserAddress;
}
