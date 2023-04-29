import { UserAddress } from '../User/UserAddress';

export interface ModifyUserAddressRequest {
  language: string;
  useraddressForCreation: UserAddress;
}
