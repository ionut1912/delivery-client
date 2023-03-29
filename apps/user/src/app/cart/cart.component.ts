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
import { MatSnackBar } from '@angular/material/snack-bar';

export interface OfferDetails extends Offer {
  menuItemId: string;
}
@Component({
  selector: 'delivery-client-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems!: OrderMenuItem[];
  offerForMenuItem!: OfferDetails;
  ItemForm: FormGroup = new FormGroup({
    quantity: new FormControl(null),
  });

  constructor(
    private store: Store<AppState>,
    private orderService: OrderService,
    private offerMenuItemService: OfferForMenuItemsService,
    private matSnackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.store.select(getAllProductsInCart).subscribe((item) => {
      this.cartItems = item;
      console.log(this.cartItems);
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
    const addOrder: OrderForCreation = {
      restaurantNames: restaurantNames,
      menuItems: updatedMenuItem,
    };
    this.orderService.addOrder(addOrder);
    this.store.dispatch(CartActions.removeAllMenuitems());
    this.matSnackBar.open('Order created successfully', 'Close', {
      duration: 5000,
    });
  }
}
