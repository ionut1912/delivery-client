import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../../../libs/shared/services/OrderService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from '../../../../../libs/shared/models/Order/Order';

export interface OrderTableDataSource {
  id: string;
  receivedTime: string;
  finalPrice: number;
  status: string;
  username: string;
  restaurantNames: string[];
  menuItems: string[];
}
@Component({
  selector: 'delivery-client-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
})
export class OrderManagementComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  displayedColumns = [
    'id',
    'receivedTime',
    'finalPrice',
    'status',
    'username',
    'restaurants',
    'menuItems',
    'Actions',
    'create_order',
  ];
  dataSource: MatTableDataSource<OrderTableDataSource> =
    new MatTableDataSource<OrderTableDataSource>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((order) => {
      const orderTableDataSource: OrderTableDataSource[] = [];
      for (let i = 0; i < order.length; i++) {
        const orderTableValue: OrderTableDataSource = {
          id: order[i].id,
          receivedTime: order[i].receivedTime,
          finalPrice: order[i].finalPrice,
          status: order[i].status,
          username: order[i].user.username,
          restaurantNames: order[i].restaurants.map((x) => x.name),
          menuItems: order[i].menuItems.map((x) => x.itemName),
        };
        orderTableDataSource.push(orderTableValue);
      }
      console.log(orderTableDataSource);
      this.dataSource = new MatTableDataSource<OrderTableDataSource>(
        orderTableDataSource
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editOrder(element: Order) {
    console.log(element);
  }

  addOrder() {
    console.log('Order added');
  }
}
