import { Component, OnInit } from '@angular/core';

import { MenuItemService } from '../../../../../libs/shared/services/MenuItemService';
import { ReviewForMenuItemsService } from '../../../../../libs/shared/services/ReviewForMenuItemsService';
import { ReviewForMenuItem } from '../../../../../libs/shared/models/ReviewForMenuItem/ReviewForMenuItem';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';

export interface ViewMenuItemData {
  id: string;
}
@Component({
  selector: 'delivery-client-view-menuitem',
  templateUrl: './view-menuitem.component.html',
  styleUrls: ['./view-menuitem.component.scss'],
})
export class ViewMenuitemComponent implements OnInit {
  menuItem!: MenuItem;
  ingredients!: string[];
  id!: string;
  reviewsForMenuItem!: ReviewForMenuItem[];
  constructor(
    private router: ActivatedRoute,
    private menuItemService: MenuItemService,
    private reviewsForMenuItemService: ReviewForMenuItemsService,
    private route: ActivatedRoute
  ) {}
  data!: InternationalizationConfig;

  ngOnInit() {
    this.data = this.route.snapshot.data[0];
    console.log(this.data);
    this.router.params.subscribe((params) => {
      this.id = params['id'];
      this.menuItemService.getMenuItemById(this.id).subscribe((response) => {
        this.menuItem = response;
        this.ingredients = this.menuItem.ingredients.split(',');
      });
      this.reviewsForMenuItemService
        .getReviewsForMenuItem(this.id)
        .subscribe((reviewData) => {
          this.reviewsForMenuItem = reviewData;
        });
    });
  }
  getImagesUrls(menuItem: MenuItem) {
    return menuItem.photos.map((item) => item.url);
  }
}
