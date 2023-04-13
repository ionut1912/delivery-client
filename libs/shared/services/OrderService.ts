import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderForCreation } from '../models/Order/OrderForCreation';
import { Order } from '../models/Order/Order';
import { OrderForUpdate } from '../models/Order/OrderForUpdate';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonResponse } from '../models/JsonResponse';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  addOrder(order: OrderForCreation) {
    this.httpClient.post<JsonResponse>('Orders', order).subscribe((response) =>
      this.snackBar.open(response.message, 'Close', {
        duration: 5000,
      })
    );
  }
  getCurrentUserOrders() {
    return this.httpClient.get<Order[]>(`Orders/current`);
  }
  getAllOrders() {
    return this.httpClient.get<Order[]>('Orders');
  }
  getOrderById(id: string) {
    return this.httpClient.get<Order>(`Orders/${id}`);
  }
  modifyOrderStatus(id: string | undefined, orderForUpdate: OrderForUpdate) {
    this.httpClient
      .put<JsonResponse>(`Orders/${id}`, orderForUpdate)
      .subscribe((response) =>
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        })
      );
  }
}
