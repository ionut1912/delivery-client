import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../models/Restaurant/Restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private httpClient: HttpClient) {}
  getRestaurantByCity(city: string) {
    return this.httpClient.get<Restaurant[]>(`Restaurants/getByCity/${city}`);
  }

  getRestaurantById(id: string) {
    return this.httpClient.get<Restaurant>(`Restaurants/${id}`);
  }
  getRestaurants() {
    return this.httpClient.get<Restaurant[]>('Restaurants');
  }
}
