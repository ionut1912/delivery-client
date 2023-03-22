import { Users } from '../User/Users';

export interface ReviewForMenuItem {
  id: string;
  reviewTitle: string;
  reviewDescription: string;
  numberOfStars: number;
  user: Users;
  menuItemsId: string;
}
