import { AppState } from './../../../../../apps/user/state/app-state.module';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../../shared/services/OrderService';
import { OrderForUpdate } from '../../../../shared/models/Order/OrderForUpdate';
import { OrderMenuItem } from '../../../../shared/models/State/OrderMenuItem';
import { Store } from '@ngrx/store';

import { RestaurantService } from '../../../../shared/services/RestaurantService';
import { CartActions } from 'apps/user/src/app/cart/store/cart.actions';

export interface GenericDeleteModalData {
  id: string;
  menuItem?: OrderMenuItem;
  item: string;
}
@Component({
  selector: 'delivery-app-client-modal',
  templateUrl: './generic-delete-modal.component.html',
})
export class GenericDeleteModalComponent {
  itemName = '';
  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<GenericDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericDeleteModalData
  ) {
    this.itemName = data.item;
  }
  no() {
    this.dialogRef.close();
  }

  yes() {
    if (this.itemName === 'order') {
      const orderForUpdate: OrderForUpdate = {
        status: 'Canceled',
      };
      this.orderService.modifyOrderStatus(this.data.id, orderForUpdate);
      this.dialogRef.close();
      this.snackBar.open('Order deleted successfully', 'Close', {
        duration: 5000,
      });
    }
    if (this.itemName === 'restaurant') {
      this.restaurantService.deleteRestaurant(this.data.id);
      this.dialogRef.close();
    }
    if (this.itemName === 'Menu Item From Cart') {
      this.store.dispatch(
        CartActions.removeMenuitem({
          menuItemInOrder: this.data.menuItem,
        })
      );
      this.dialogRef.close();
      this.snackBar.open('Menu Item removed from cart', 'Close', {
        duration: 5000,
      });
    }
  }
}
