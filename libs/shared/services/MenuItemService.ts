import { MenuItemDto } from './../models/MenuItem/MenuItemDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/MenuItem/MenuItem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonResponse } from '../models/JsonResponse';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}
  getMenuItems() {
    return this.httpClient.get<MenuItem[]>(`MenuItems`);
  }
  getMenuItemById(id: string) {
    return this.httpClient.get<MenuItem>(`MenuItems/${id}`);
  }
  editMenuItem(id: string, item: MenuItemDto) {
    this.httpClient
      .put<JsonResponse>(`MenuItems/${id}`, item)
      .subscribe((response) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      });
  }
}
