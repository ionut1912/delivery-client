import { Component, OnInit } from '@angular/core';

import { MenuItemService } from '../../../../../libs/shared/services/MenuItemService';
import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
import { ReviewForMenuItemsService } from '../../../../../libs/shared/services/ReviewForMenuItemsService';
import { ReviewForMenuItem } from '../../../../../libs/shared/models/ReviewForMenuItem/ReviewForMenuItem';
import { ActivatedRoute } from '@angular/router';
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
    private reviewsForMenuItemService: ReviewForMenuItemsService
  ) {}
  ngOnInit() {
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
}
