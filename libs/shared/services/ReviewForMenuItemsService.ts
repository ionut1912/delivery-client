import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewForMenuItemDto } from '../models/ReviewForMenuItem/ReviewForMenuItemDto';
import { ReviewForMenuItem } from '../models/ReviewForMenuItem/ReviewForMenuItem';
import { JsonResponse } from '../models/JsonResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ReviewForMenuItemsService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  addReview(review: ReviewForMenuItemDto) {
    this.httpClient
      .post<JsonResponse>('/ReviewForMenuItems', review)
      .subscribe((response) =>
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        })
      );
  }
  getReviewsForMenuItem(itemId: string) {
    return this.httpClient.get<ReviewForMenuItem[]>(
      `/ReviewForMenuItems/${itemId}`
    );
  }
}
