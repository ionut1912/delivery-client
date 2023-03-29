import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderForCreation } from '../models/Order/OrderForCreation';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}
  addOrder(order: OrderForCreation) {
    this.httpClient.post('Orders', order).subscribe(() => {});
  }
}
