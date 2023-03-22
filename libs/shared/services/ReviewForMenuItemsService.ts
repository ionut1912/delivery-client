import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewForMenuItemDto } from '../models/ReviewForMenuItem/ReviewForMenuItemDto';
import { ReviewForMenuItem } from '../models/ReviewForMenuItem/ReviewForMenuItem';

@Injectable({
  providedIn: 'root',
})
export class ReviewForMenuItemsService {
  constructor(private httpClient: HttpClient) {}
  addReview(review: ReviewForMenuItemDto) {
    this.httpClient.post('/ReviewForMenuItems', review);
  }
  getReviewsForMenuItem() {
    return this.httpClient.get<ReviewForMenuItem>('ReviewForMenuItems');
  }
}
