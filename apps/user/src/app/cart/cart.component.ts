import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app-state.module';
import { getAllProductsInCart } from './store/getAllMenuItemsInCart';
import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'delivery-client-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems!: MenuItem[];
  ItemForm: FormGroup = new FormGroup({
    quantity: new FormControl(null),
  });

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.store.select(getAllProductsInCart).subscribe((item) => {
      this.cartItems = item;
    });
  }
  getMainPhoto(item: MenuItem) {
    return item.photos.find((photo) => photo.isMain)?.url;
  }
  calculateFinalPrice() {
    let finalPrice = 0;
    for (const element of this.cartItems) {
      finalPrice = finalPrice + element.price * this.ItemForm.value.quantity;
    }
    return finalPrice;
  }
}
