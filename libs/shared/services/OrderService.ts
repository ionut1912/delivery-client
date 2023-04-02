import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderForCreation } from '../models/Order/OrderForCreation';
import { Order } from '../models/Order/Order';
import { OrderForUpdate } from '../models/Order/OrderForUpdate';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}
  addOrder(order: OrderForCreation) {
    this.httpClient.post('Orders', order).subscribe(() => {});
  }
  getCurrentUserOrders() {
    return this.httpClient.get<Order[]>(`Orders/current`);
  }

  modifyOrderStatus(id: string | undefined, orderForUpdate: OrderForUpdate) {
    this.httpClient
      .put(`Orders/${id}`, orderForUpdate)
      .subscribe(() => console.log('test'));
  }
}
