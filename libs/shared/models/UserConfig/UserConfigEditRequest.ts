import { UserConfigDto } from './UserConfigDto';

export interface UserConfigEditRequest {
  language: string;
  userConfigDto: UserConfigDto;
}
