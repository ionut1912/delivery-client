export interface ReviewForRestaurantDto {
  reviewTitle: string;
  reviewDescription: string;
  numberOfStars:number;
  restaurantId?: string;
}
