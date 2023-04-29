import { ModifyOrderRequest } from './../models/Order/ModifyOrderRequest';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderForCreation } from '../models/Order/OrderForCreation';
import { Order } from '../models/Order/Order';
import { OrderForUpdate } from '../models/Order/OrderForUpdate';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonResponse } from '../models/JsonResponse';
import { AddOrderRequest } from '../models/Order/AddOrderRequest';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  addOrder(order: AddOrderRequest) {
    this.httpClient.post<JsonResponse>('Orders', order).subscribe(
      (response) => {
        const closeMessage = order.language === 'EN' ? 'Close' : 'Inchide';
        this.snackBar.open(response.message, closeMessage, {
          duration: 5000,
        });
      },
      (error) => {
        const closeMessage = order.language === 'EN' ? 'Close' : 'Inchide';
        this.snackBar.open(error.message, closeMessage, {
          duration: 5000,
        });
      }
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
  modifyOrderStatus(id: string, orderForUpdate: ModifyOrderRequest) {
    this.httpClient
      .put<JsonResponse>(`Orders/${id}`, orderForUpdate)
      .subscribe(() => console.log('success'));
  }
}
