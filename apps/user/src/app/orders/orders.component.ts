import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../libs/shared/models/Order/Order';
import { OrderService } from '../../../../../libs/shared/services/OrderService';
import { TableColumn } from '../../../../../libs/shared/models/Table/TableColumn';
import { TableBtn } from '../../../../../libs/shared/models/Table/TableBtn';
import { MatDialog } from '@angular/material/dialog';
import { GenericDeleteModalComponent } from '../../../../../libs/generic-delete-modal/src/lib/components/generic-delete-modal.component';

@Component({
  selector: 'delivery-app-client-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  columns!: TableColumn[];
  buttons!: TableBtn[];
  constructor(private orderService: OrderService, public dialog: MatDialog) {
    this.columns = [
      {
        columnDef: 'Recieved Time',
        header: 'Recieved Time',
        cell: (element: Order) => `${element.receivedTime}`,
      },
      {
        columnDef: 'UserName',
        header: 'Name',
        cell: (element: Order) => `${element.user.username}`,
      },
      {
        columnDef: 'finalPrice',
        header: 'Final Price',
        cell: (element: Order) => `${element.finalPrice} `,
      },
      {
        columnDef: 'status',
        header: 'Status',
        cell: (element: Order) => `${element.status}`,
      },
    ];
    this.buttons = [
      {
        styleClass: 'btn px-2',
        icon: 'delete',
        payload: (element: Order) => `${element.id}`,
        action: 'delete',
      },
    ];
  }

  ngOnInit() {
    this.orderService.getCurrentUserOrders().subscribe((item) => {
      this.orders = item;
    });
  }
  buttonClick(result: string[]) {
    const dialogRef = this.dialog.open(GenericDeleteModalComponent, {
      data: {
        id: result[1],

        item: 'order',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
