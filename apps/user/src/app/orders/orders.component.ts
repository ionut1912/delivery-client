import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../libs/shared/models/Order/Order';
import { OrderService } from '../../../../../libs/shared/services/OrderService';
import { TableColumn } from '../../../../../libs/shared/models/Table/TableColumn';

@Component({
  selector: 'delivery-client-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  columns!: TableColumn[];
  constructor(private orderService: OrderService) {
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
  }

  ngOnInit() {
    this.orderService.getCurrentUserOrders().subscribe((item) => {
      this.orders = item;
    });
  }
}
