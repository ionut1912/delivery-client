import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentUserReviewForMenuItems } from './../../../../../libs/shared/models/ReviewForMenuItem/CurrentUserReviewForMenuItem';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ReviewForMenuItemsService } from 'libs/shared/services/ReviewForMenuItemsService';
import { ActivatedRoute } from '@angular/router';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';

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
    private route: ActivatedRoute
  ) {
    this.initializeTableData();
  }
  dataSource: MatTableDataSource<CurrentUserReviewForMenuItems> =
    new MatTableDataSource<CurrentUserReviewForMenuItems>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.data = this.route.snapshot.data[0];
    console.log(this.data);
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
}
