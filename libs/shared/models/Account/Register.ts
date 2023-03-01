import { UserAddress } from '../User/UserAddress';

export interface Register {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  address: UserAddress;
}
