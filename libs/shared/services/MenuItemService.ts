import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItemWithImage } from '../models/MenuItem/MenuItemWithImage';
import { MenuItemWithImages } from '../models/MenuItem/MenuItemWithImages';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  constructor(private httpClient: HttpClient) {}
  getMenuItemById(id: string) {
    return this.httpClient.get<MenuItemWithImages>(`MenuItems/${id}`);
  }
}
