import { ReviewForRestaurantDto } from './ReviewForRestaurantDto';

export interface ReviewForRestaurantAddRequest {
  language: string;
  reviewForRestaurantDto: ReviewForRestaurantDto;
}
