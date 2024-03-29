/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../../../libs/shared/services/OrderService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditOrderModalComponent } from '../edit-order-modal/edit-order-modal.component';
import { StatisticsService } from 'libs/shared/services/StatisticsService';
import { OrderDetailStatistic } from 'libs/shared/models/Order/OrderDetailStatistic';

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
  selector: 'delivery-app-client-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
})
export class OrderManagementComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private statisticsService: StatisticsService,
    private dialog: MatDialog
  ) {
    this.initializeOrdersTable();
  }
  displayedColumns = [
    'id',
    'receivedTime',
    'finalPrice',
    'status',
    'username',
    'restaurants',
    'menuItems',
    'Actions',
  ];
  orderDetailsForSevenDays!: OrderDetailStatistic;
  orderDetailsForThirtyDays!: OrderDetailStatistic;
  dataSource: MatTableDataSource<OrderTableDataSource> =
    new MatTableDataSource<OrderTableDataSource>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.initializeOrdersTable();
    this.statisticsService.getOrderStatistics(-7).subscribe((orderDetails) => {
      this.orderDetailsForSevenDays = orderDetails;
    });
    this.statisticsService.getOrderStatistics(-30).subscribe((orderDetails) => {
      this.orderDetailsForThirtyDays = orderDetails;
    });
  }

  editOrder(element: OrderTableDataSource) {
    const dialogRef = this.dialog.open(EditOrderModalComponent, {
      data: {
        element,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initializeOrdersTable();
    });
  }
  initializeOrdersTable() {
    this.orderService.getAllOrders().subscribe((order) => {
      const orderTableDataSource: OrderTableDataSource[] = [];
      for (const element of order) {
        const orderTableValue: OrderTableDataSource = {
          id: element.id,
          receivedTime: element.receivedTime,
          finalPrice: element.finalPrice,
          status: element.status,
          username: element.user.username,
          restaurantNames: element.restaurants.map((x) => x.name),
          menuItems: element.menuItems.map((x) => x.itemName),
        };
        orderTableDataSource.push(orderTableValue);
      }

      this.dataSource = new MatTableDataSource<OrderTableDataSource>(
        orderTableDataSource
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
