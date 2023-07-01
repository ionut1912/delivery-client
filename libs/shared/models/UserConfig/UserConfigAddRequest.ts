import { UserConfigDto } from './UserConfigDto';
export interface UserConfigAddRequest {
  language: string;
  userConfig: UserConfigDto;
}
