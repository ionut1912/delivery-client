import { MenuItemCount } from './../models/MenuItem/MenuItemCount';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private httpClient: HttpClient) {}
  getMenuItemCount() {
    return this.httpClient.get<MenuItemCount[]>('Statistics/items-count');
  }
}
