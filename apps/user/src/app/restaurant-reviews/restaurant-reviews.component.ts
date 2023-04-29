import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { CurrentUserReviewForRestaurant } from 'libs/shared/models/ReviewForRestaurant/CurrentUserReviewForRestaurant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewForRestaurant } from 'libs/shared/models/ReviewForRestaurant/ReviewForRestaurant';
import { ReviewForRestaurantService } from 'libs/shared/services/ReviewForRestaurantService';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReviewEditModalComponent } from '../review-edit-modal/review-edit-modal.component';
import { GenericDeleteModalComponent } from 'libs/generic-delete-modal/src/lib/components/generic-delete-modal.component';

@Component({
  selector: 'delivery-client-restaurant-reviews',
  templateUrl: './restaurant-reviews.component.html',
  styleUrls: ['./restaurant-reviews.component.scss'],
})
export class RestaurantReviewsComponent implements OnInit {
  displayedColumns = [
    'id',
    'reviewTitle',
    'reviewDescription',
    'numberOfStars',
    'username',
    'restaurantName',
    'Actions',
  ];
  data!: InternationalizationConfig;
  constructor(
    private reviewService: ReviewForRestaurantService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.initializeTableData();
  }
  dataSource: MatTableDataSource<CurrentUserReviewForRestaurant> =
    new MatTableDataSource<CurrentUserReviewForRestaurant>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.data = this.route.snapshot.data[0];

    this.initializeTableData();
  }

  initializeTableData() {
    this.reviewService.getReviewsForCurrentUser().subscribe((result) => {
      this.dataSource = new MatTableDataSource<CurrentUserReviewForRestaurant>(
        result
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  editReview(element: CurrentUserReviewForRestaurant) {
    console.log(this.data.dynamicConfigs[element.reviewDescription]);
    const dialogRef = this.dialog.open(ReviewEditModalComponent, {
      data: {
        element: {
          reviewTitle: this.data.dynamicConfigs[element.reviewTitle],
          reviewDescription:
            this.data.dynamicConfigs[element.reviewDescription],
          restaurantId: element.restaurantId,
          reviewId: element.id,
          numberOfStars: element.numberOfStars,
        },
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initializeTableData();
    });
  }
  deleteReview(id: string) {
    const dialogRef = this.dialog.open(GenericDeleteModalComponent, {
      data: {
        id: id,
        item: 'reviewForRestaurants',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initializeTableData();
    });
  }
}
