import { AddOrderRequest } from './../../../../../libs/shared/models/Order/AddOrderRequest';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app-state.module';
import { getAllProductsInCart } from './store/getAllMenuItemsInCart';
import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
import { FormControl, FormGroup } from '@angular/forms';
import { OfferForMenuItemsService } from '../../../../../libs/shared/services/OfferForMenuItemsService';
import { Offer } from '../../../../../libs/shared/models/Offer/Offer';
import { OrderMenuItem } from '../../../../../libs/shared/models/State/OrderMenuItem';
import { OrderService } from '../../../../../libs/shared/services/OrderService';
import { OrderForCreation } from '../../../../../libs/shared/models/Order/OrderForCreation';
import { CartActions } from './store/cart.actions';
import { MatDialog } from '@angular/material/dialog';
import { GenericDeleteModalComponent } from '../../../../../libs/generic-delete-modal/src/lib/components/generic-delete-modal.component';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';

export interface OfferDetails extends Offer {
  menuItemId: string;
}
@Component({
  selector: 'delivery-app-client-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems!: OrderMenuItem[];
  data!: InternationalizationConfig;
  offerForMenuItem!: {
    dateActiveTo: string;
    discount: number;
    active: boolean;
    id: string;
    menuItemId: string;
    dateActiveFrom: string;
  };
  ItemForm: FormGroup = new FormGroup({
    quantity: new FormControl(null),
  });

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService,
    private offerMenuItemService: OfferForMenuItemsService,
    private rote: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.data = this.rote.snapshot.data[0]; 
    this.store.select(getAllProductsInCart).subscribe((item) => {
      this.cartItems = item;
      for (const element of this.cartItems) {
        if (element.menuItem.offerMenuItems) {
          for (const offer of element.menuItem.offerMenuItems) {
            this.offerMenuItemService
              .getOfferById(offer.offerId)
              .subscribe((offer) => {
                this.offerForMenuItem = {
                  id: offer.id,
                  dateActiveFrom: offer.dateActiveFrom,
                  dateActiveTo: offer.dateActiveTo,
                  discount: offer.discount,
                  active: offer.active,
                  menuItemId: element.menuItem.id,
                };
              });
          }
        }
      }
    });
  }
  getMainPhoto(item: MenuItem) {
    return item.photos.find((photo) => photo.isMain)?.url;
  }
  calculateFinalPrice() {
    let finalPrice = 0;
    for (const element of this.cartItems) {
      if (element.menuItem.offerMenuItems) {
        const discountedPrice =
          finalPrice +
          element.menuItem.price -
          element.menuItem.price * (this.offerForMenuItem.discount / 100);
        finalPrice =
          finalPrice + discountedPrice * this.ItemForm.value.quantity;
      } else {
        finalPrice =
          finalPrice + element.menuItem.price * this.ItemForm.value.quantity;
      }
    }
    return finalPrice;
  }

  makeOrder() {
    const restaurantNames: string[] = this.cartItems.map(
      (item) => item.restaurantName
    );
    const menuItems: MenuItem[] = this.cartItems.map((item) => item.menuItem);
    const updatedMenuItem = menuItems.map((item) => {
      return { ...item, quantity: this.ItemForm.value.quantity };
    });
    const addOrder: AddOrderRequest = {
      language: sessionStorage.getItem('LANGUAGE') ?? 'EN',
      order: {
        restaurantNames: restaurantNames,
        menuItems: updatedMenuItem,
      },
    };
    this.orderService.addOrder(addOrder);
    this.store.dispatch(CartActions.removeAllMenuitems());
  }

  deleteFromCart(menuItem: MenuItem) {
    const menuItemToBeDeleted = this.cartItems.find(
      (x) => x.menuItem == menuItem
    );
    if (menuItemToBeDeleted) {
      this.dialog.open(GenericDeleteModalComponent, {
        data: {
          menuItem: menuItemToBeDeleted,

          item: 'Menu Item From Cart',
        },
      });
    }
  }
}
