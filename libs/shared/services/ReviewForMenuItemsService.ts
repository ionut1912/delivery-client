import { ReviewForMenuItemDeleteRequest } from './../models/ReviewForMenuItem/ReviewForMenuItemDeleteRequest';
import { CurrentUserReviewForMenuItems } from './../models/ReviewForMenuItem/CurrentUserReviewForMenuItem';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewForMenuItemDto } from '../models/ReviewForMenuItem/ReviewForMenuItemDto';
import { ReviewForMenuItem } from '../models/ReviewForMenuItem/ReviewForMenuItem';
import { JsonResponse } from '../models/JsonResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewForMenuItemAddRequest } from '../models/ReviewForMenuItem/ReviewForMenuItemAddRequest';
import { ReviewForMenuItemEditRequest } from '../models/ReviewForMenuItem/ReviewForMenuItemEditRequest';

@Injectable({
  providedIn: 'root',
})
export class ReviewForMenuItemsService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  addReview(review: ReviewForMenuItemAddRequest) {
    this.httpClient.post<JsonResponse>('/ReviewForMenuItems', review).subscribe(
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
  getReviewsForMenuItem(itemId: string) {
    return this.httpClient.get<ReviewForMenuItem[]>(
      `/ReviewForMenuItems/${itemId}`
    );
  }
  getReviewsForCurrentUser() {
    return this.httpClient.get<CurrentUserReviewForMenuItems[]>(
      `/ReviewForMenuItems`
    );
  }
  editReviewForMenuItem(
    reviewId: string,
    reviewRequest: ReviewForMenuItemEditRequest
  ) {
    this.httpClient
      .put<JsonResponse>(`/ReviewForMenuItems/${reviewId}`, reviewRequest)
      .subscribe(
        (response) => {
          const closeMessage =
            reviewRequest.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(response.message, closeMessage, {
            duration: 5000,
          });
        },
        (err) => {
          const closeMessage =
            reviewRequest.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(err.error, closeMessage, {
            duration: 5000,
          });
        }
      );
  }
  deleteReviewForMenuItem(reviewId: string, language: string) {
    this.httpClient
      .delete<JsonResponse>(`/ReviewForMenuItems/${reviewId}/${language}`)
      .subscribe(
        (response) => {
          const closeMessage = language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(response.message, closeMessage, {
            duration: 5000,
          });
        },
        (err) => {
          const closeMessage = language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(err.error, closeMessage, {
            duration: 5000,
          });
        }
      );
  }
}
