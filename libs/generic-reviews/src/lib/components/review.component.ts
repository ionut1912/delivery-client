import { ReviewForRestaurantAddRequest } from './../../../../shared/models/ReviewForRestaurant/ReviewForRestaurantAddRequest';
import { ReviewForMenuItemAddRequest } from './../../../../shared/models/ReviewForMenuItem/ReviewForMenuItemAddRequest';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewForMenuItemsService } from '../../../../shared/services/ReviewForMenuItemsService';
import { ReviewForRestaurantService } from '../../../../shared/services/ReviewForRestaurantService';

@Component({
  selector: 'delivery-app-client-reviews',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  ratingArr: any[] = [];

  @Input() menuItemId!: string;
  @Input() restaurantId!: string;
  @Input() dynamicConfigs!: Record<string, string>;
  language!: string;
  private rating = 3;
  private starCount = 5;

  constructor(
    private reviewForRestaurantService: ReviewForRestaurantService,
    private reviewForMenuItemService: ReviewForMenuItemsService
  ) {}
  reviews: FormGroup = new FormGroup({
    reviewTitle: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    reviewDescription: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  error = (field: string, rule: string) => {
    return `${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.reviews.controls[controlName].hasError(errorName);
  };

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.language = sessionStorage.getItem('LANGUAGE') ?? 'EN';
  }
  onClick(rating: number) {
    this.rating = rating;
  }
  addReview() {
    if (this.menuItemId != null) {
      const reviewData: ReviewForMenuItemAddRequest = {
        language: this.language,
        reviewForMenuItemDto: {
          reviewTitle: this.reviews.value.reviewTitle,
          reviewDescription: this.reviews.value.reviewDescription,
          numberOfStars: this.rating,
          menuItemId: this.menuItemId,
        },
      };
      this.reviewForMenuItemService.addReview(reviewData);
    } else {
      const reviewData: ReviewForRestaurantAddRequest = {
        language: this.language,
        reviewForRestaurantDto: {
          reviewTitle: this.reviews.value.reviewTitle,
          reviewDescription: this.reviews.value.reviewDescription,
          numberOfStars: this.rating,
          restaurantId: this.restaurantId,
        },
      };
      this.reviewForRestaurantService.addReview(reviewData);
    }
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
