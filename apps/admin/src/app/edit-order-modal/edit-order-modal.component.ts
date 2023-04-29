/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Inject } from '@angular/core';
import { OrderTableDataSource } from '../order-management/order-management.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../../../libs/shared/services/OrderService';
import { FormControl, FormGroup } from '@angular/forms';
import { ModifyOrderRequest } from 'libs/shared/models/Order/ModifyOrderRequest';
export interface OrderEditData {
  element: OrderTableDataSource;
}
@Component({
  selector: 'delivery-app-client-edit-order-modal',
  templateUrl: './edit-order-modal.component.html',
  styleUrls: ['./edit-order-modal.component.scss'],
})
export class EditOrderModalComponent {
  orders: FormGroup = new FormGroup({
    status: new FormControl(this.data.element.status),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrderEditData,
    public dialogRef: MatDialogRef<EditOrderModalComponent>,
    private orderService: OrderService
  ) {}

  cancel() {
    this.dialogRef.close();
  }

  editOrder() {
    const orderForEdit: ModifyOrderRequest = {
      orderForEdit: {
        status: this.orders.value.status,
      },
    };
    this.orderService.modifyOrderStatus(this.data.element.id, orderForEdit);
    this.dialogRef.close();
  }
}
