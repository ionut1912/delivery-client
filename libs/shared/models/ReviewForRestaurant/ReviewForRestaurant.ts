import { Users } from '../User/Users';

export interface ReviewForRestaurant {
  id: string;
  reviewTitle: string;
  reviewDescription: string;
  numberOfStars: number;
  user: Users;
  restaurantsId: string;
}
