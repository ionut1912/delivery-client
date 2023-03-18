import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/MenuItem/MenuItem';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  constructor(private httpClient: HttpClient) {}
  getMenuItemById(id: string) {
    return this.httpClient.get<MenuItem>(`MenuItems/${id}`);
  }
}