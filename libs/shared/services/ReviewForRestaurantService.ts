import { CurrentUserReviewForRestaurant } from './../models/ReviewForRestaurant/CurrentUserReviewForRestaurant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewForRestaurant } from '../models/ReviewForRestaurant/ReviewForRestaurant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonResponse } from '../models/JsonResponse';
import { ReviewForRestaurantAddRequest } from '../models/ReviewForRestaurant/ReviewForRestaurantAddRequest';

@Injectable({
  providedIn: 'root',
})
export class ReviewForRestaurantService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  addReview(review: ReviewForRestaurantAddRequest) {
    console.log(review);
    this.httpClient
      .post<JsonResponse>('/ReviewForRestaurants', review)
      .subscribe(
        (response) => {
          const closeMessage = review.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(response.message, closeMessage, {
            duration: 5000,
          });
        },
        (err) => {
          const closeMessage = review.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(err.error, closeMessage, {
            duration: 5000,
          });
        }
      );
  }
  getReviewsForRestaurant() {
    return this.httpClient.get<ReviewForRestaurant>('ReviewForRestaurants');
  }
  getReviewsForCurrentUser() {
    return this.httpClient.get<CurrentUserReviewForRestaurant[]>(
      'ReviewForRestaurants'
    );
  }
}
