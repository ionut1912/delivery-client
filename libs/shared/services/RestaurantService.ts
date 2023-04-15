import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../models/Restaurant/Restaurant';
import { JsonResponse } from '../models/JsonResponse';
import { RestaurantDto } from '../models/Restaurant/RestaurantDto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}
  getRestaurantByCity(city: string) {
    return this.httpClient.get<Restaurant[]>(`Restaurants/getByCity/${city}`);
  }

  getRestaurantById(id: string) {
    return this.httpClient.get<Restaurant>(`Restaurants/${id}`);
  }
  getRestaurants() {
    return this.httpClient.get<Restaurant[]>('Restaurants');
  }
  addRestaurant(restaurantForCreation: RestaurantDto) {
    this.httpClient
      .post<JsonResponse>('Restaurants', restaurantForCreation)
      .subscribe((response) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      });
  }
  editRestaurant(id: string, restaurantForCreation: RestaurantDto) {
    this.httpClient
      .put<JsonResponse>(`Restaurants/${id}`, restaurantForCreation)
      .subscribe((response) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      });
  }
  deleteRestaurant(id: string) {
    this.httpClient
      .delete<JsonResponse>(`Restaurants/${id}`)
      .subscribe((response) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      });
  }
}
