import { Component, OnInit } from '@angular/core';

import { MenuItemService } from '../../../../../libs/shared/services/MenuItemService';
import { ReviewForMenuItemsService } from '../../../../../libs/shared/services/ReviewForMenuItemsService';
import { ReviewForMenuItem } from '../../../../../libs/shared/models/ReviewForMenuItem/ReviewForMenuItem';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app-state.module';

import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
import { CartActions } from '../cart/store/cart.actions';

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
    private store: Store<AppState>,
    private reviewsForMenuItemService: ReviewForMenuItemsService
  ) {}
  ItemForm: FormGroup = new FormGroup({
    quantity: new FormControl(null),
  });
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
  getImagesUrls(menuItem: MenuItem) {
    return menuItem.photos.map((item) => item.url);
  }
  updateQuantity() {
    console.log(this.menuItem);
    const updatedMenuItem: MenuItem = {
      ...this.menuItem,
      quantity: this.ItemForm.value.quantity, // replace newQuantity with the updated quantity value
    };
    console.log(updatedMenuItem);
    this.store.dispatch(
      CartActions.addMenuitem({
        menuItemInOrder: updatedMenuItem,
      })
    );
  }
}
