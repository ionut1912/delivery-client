import { ReviewForMenuItemEditRequest } from './../../../../../libs/shared/models/ReviewForMenuItem/ReviewForMenuItemEditRequest';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { CurrentUserReviewForMenuItems } from 'libs/shared/models/ReviewForMenuItem/CurrentUserReviewForMenuItem';

import { ReviewForRestaurantAddRequest } from 'libs/shared/models/ReviewForRestaurant/ReviewForRestaurantAddRequest';
import { InternationalizationService } from 'libs/shared/services/InternationalizationService';
import { ReviewForMenuItemsService } from 'libs/shared/services/ReviewForMenuItemsService';
import { ReviewForRestaurantService } from 'libs/shared/services/ReviewForRestaurantService';
export interface ReviewModalData {
  reviewId: string;
  reviewTitle: string;
  numberOfStars: number;
  reviewDescription: string;
  menuItemId?: string;
  restaurantId?: string;
}
export interface IReviewEditData {
  element: ReviewModalData;
}
@Component({
  selector: 'delivery-app-client-review-edit-modal',
  templateUrl: './review-edit-modal.component.html',
  styleUrls: ['./review-edit-modal.component.scss'],
})
export class ReviewEditModalComponent implements OnInit {
  ratingArr: any[] = [];

  language!: string;
  private rating = this.data.element.numberOfStars;

  constructor(
    private dialogRef: MatDialogRef<ReviewEditModalComponent>,
    private reviewForRestaurantService: ReviewForRestaurantService,
    private reviewForMenuItemService: ReviewForMenuItemsService,
    private internationalizationService: InternationalizationService,
    @Inject(MAT_DIALOG_DATA) private data: IReviewEditData
  ) {}
  reviews: FormGroup = new FormGroup({
    reviewTitle: new FormControl(this.data.element.reviewTitle),
    reviewDescription: new FormControl(this.data.element.reviewDescription),
  });

  dataConfig!: InternationalizationConfig;
  ngOnInit() {
    for (let index = 0; index < 5; index++) {
      this.ratingArr.push(index);
    }
    let pageName = 'edit-review-modal';
    this.language = sessionStorage.getItem('LANGUAGE') ?? 'EN';
    pageName = pageName + '.' + this.language.toLowerCase();
    this.internationalizationService.getConfig(pageName).subscribe((result) => {
      this.dataConfig = result;
      console.log(this.dataConfig);
    });
  }
  onClick(rating: number) {
    this.rating = rating;
  }
  editReview() {
    if (this.data.element.menuItemId != null) {
      const reviewData: ReviewForMenuItemEditRequest = {
        language: this.language,
        reviewForMenuItemDto: {
          reviewTitle: this.reviews.value.reviewTitle,
          reviewDescription: this.reviews.value.reviewDescription,
          numberOfStars: this.rating,
          menuItemId: this.data.element.menuItemId,
        },
      };
      this.reviewForMenuItemService.editReviewForMenuItem(
        this.data.element.reviewId,
        reviewData
      );
      this.dialogRef.close();
    } else {
      const reviewData: ReviewForRestaurantAddRequest = {
        language: this.language,
        reviewForRestaurantDto: {
          reviewTitle: this.reviews.value.reviewTitle,
          reviewDescription: this.reviews.value.reviewDescription,
          numberOfStars: this.rating,
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
