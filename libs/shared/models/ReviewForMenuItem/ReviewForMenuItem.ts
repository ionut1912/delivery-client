import { UserDto } from '../User/UserDto';

export interface ReviewForMenuItem {
  id: string;
  reviewTitle: string;
  reviewDescription: string;
  numberOfStars: number;
  user: UserDto;
  menuItemsId: string;
}
