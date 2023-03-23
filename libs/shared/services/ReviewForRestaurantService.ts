import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewForRestaurantDto } from '../models/ReviewForRestaurant/ReviewForRestaurantDto';
import { ReviewForRestaurant } from '../models/ReviewForRestaurant/ReviewForRestaurant';

@Injectable({
  providedIn: 'root',
})
export class ReviewForRestaurantService {
  constructor(private httpClient: HttpClient) {}
  addReview(review: ReviewForRestaurantDto) {
    this.httpClient.post('/ReviewForRestaurants', review).subscribe((result)=>
    console.log(result));
  }
  getReviewsForMenuItem() {
    return this.httpClient.get<ReviewForRestaurant>('ReviewForRestaurants');
  }
}
