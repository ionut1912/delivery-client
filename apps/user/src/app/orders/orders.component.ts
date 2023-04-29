/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../libs/shared/models/Order/Order';
import { OrderService } from '../../../../../libs/shared/services/OrderService';
import { TableColumn } from '../../../../../libs/shared/models/Table/TableColumn';
import { TableBtn } from '../../../../../libs/shared/models/Table/TableBtn';
import { MatDialog } from '@angular/material/dialog';
import { GenericDeleteModalComponent } from '../../../../../libs/generic-delete-modal/src/lib/components/generic-delete-modal.component';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'delivery-app-client-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  language!: string;
  columnsEn!: TableColumn[];
  columnsRo!: TableColumn[];
  buttons!: TableBtn[];
  data!: InternationalizationConfig;
  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.columnsEn = [
      {
        columnDef: 'Recieved Time',
        header: 'Recieved Time',
        cell: (element: Order) => `${element.receivedTime}`,
      },
      {
        columnDef: 'UserName',
        header: 'Username',
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
    this.columnsRo = [
      {
        columnDef: 'Recieved Time',
        header: 'Timpul Plasarii',
        cell: (element: Order) => `${element.receivedTime}`,
      },
      {
        columnDef: 'UserName',
        header: 'Numele Utilizatorului',
        cell: (element: Order) => `${element.user.username}`,
      },
      {
        columnDef: 'finalPrice',
        header: 'Pretul Final',
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
    this.data = this.route.snapshot.data[0];
    this.language = sessionStorage.getItem('LANGUAGE') ?? 'EN';
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
