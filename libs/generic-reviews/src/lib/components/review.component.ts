import {
  Component,
  Input,

  OnInit,

} from '@angular/core';
import { Users } from '../../../../shared/models/User/Users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewForMenuItemsService } from '../../../../shared/services/ReviewForMenuItemsService';
export interface InputType {
  id: string;
  reviewTitle: string;
  reviewDescription: string;
  numberOfStars: number;
  user: Users;
  menuItemsId?: string;
  restaurantsId?: string;
}
@Component({
  selector: 'delivery-reviews',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  ratingArr: any[] = [];
  @Input() rowData!: InputType[];
  @Input() menuItemId!: string;
  private rating = 3;
  private starCount = 5;

  constructor(private reviewService: ReviewForMenuItemsService) {}
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
    return `Field ${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.reviews.controls[controlName].hasError(errorName);
  };

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number) {
    this.rating = rating;
  }
  addReview() {
    const reviewData = {
      reviewTitle: this.reviews.value.reviewTitle,
      reviewDescription: this.reviews.value.reviewDescription,
      numberOfStars: this.rating,
      menuItemId: this.menuItemId,
    };
    this.reviewService.addReview(reviewData);
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
