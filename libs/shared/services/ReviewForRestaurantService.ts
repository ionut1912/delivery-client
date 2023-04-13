import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewForRestaurantDto } from '../models/ReviewForRestaurant/ReviewForRestaurantDto';
import { ReviewForRestaurant } from '../models/ReviewForRestaurant/ReviewForRestaurant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonResponse } from '../models/JsonResponse';

@Injectable({
  providedIn: 'root',
})
export class ReviewForRestaurantService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  addReview(review: ReviewForRestaurantDto) {
    this.httpClient
      .post<JsonResponse>('/ReviewForRestaurants', review)
      .subscribe((response) =>
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        })
      );
  }
  getReviewsForRestaurant() {
    return this.httpClient.get<ReviewForRestaurant>('ReviewForRestaurants');
  }
}
