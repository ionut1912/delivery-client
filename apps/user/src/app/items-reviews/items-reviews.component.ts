import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentUserReviewForMenuItems } from './../../../../../libs/shared/models/ReviewForMenuItem/CurrentUserReviewForMenuItem';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ReviewForMenuItemsService } from 'libs/shared/services/ReviewForMenuItemsService';
import { ActivatedRoute } from '@angular/router';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { MatDialog } from '@angular/material/dialog';
import { ReviewEditModalComponent } from '../review-edit-modal/review-edit-modal.component';
import { GenericDeleteModalComponent } from 'libs/generic-delete-modal/src/lib/components/generic-delete-modal.component';

@Component({
  selector: 'delivery-app-client-items-reviews',
  templateUrl: './items-reviews.component.html',
  styleUrls: ['./items-reviews.component.scss'],
})
export class ItemsReviewsComponent implements OnInit {
  displayedColumns = [
    'id',
    'reviewTitle',
    'reviewDescription',
    'numberOfStars',
    'username',
    'itemName',
    'Actions',
  ];
  data!: InternationalizationConfig;
  constructor(
    private reviewService: ReviewForMenuItemsService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.initializeTableData();
  }
  dataSource: MatTableDataSource<CurrentUserReviewForMenuItems> =
    new MatTableDataSource<CurrentUserReviewForMenuItems>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.data = this.route.snapshot.data[0];

    this.initializeTableData();
  }

  initializeTableData() {
    this.reviewService.getReviewsForCurrentUser().subscribe((result) => {
      this.dataSource = new MatTableDataSource<CurrentUserReviewForMenuItems>(
        result
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  editReview(element: CurrentUserReviewForMenuItems) {
    const dialogRef = this.dialog.open(ReviewEditModalComponent, {
      data: {
        element: {
          reviewTitle: this.data.dynamicConfigs[element.reviewTitle],
          reviewDescription:
            this.data.dynamicConfigs[element.reviewDescription],
          menuItemId: element.menuItemId,
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
        item: 'reviewForMenuItem',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initializeTableData();
    });
  }
}
