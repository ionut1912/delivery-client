import { UserDto } from '../User/UserDto';

export interface ReviewForRestaurant {
  id: string;
  reviewTitle: string;
  reviewDescription: string;
  numberOfStars: number;
  user: UserDto;
  restaurantsId: string;
}
