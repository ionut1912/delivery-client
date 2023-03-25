import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantWithImage } from '../models/Restaurant/RestaurantWithImage';
import { RestaurantWithImages } from '../models/Restaurant/RestaurantWithImages';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private httpClient: HttpClient) {}
  getRestaurantByCity(city: string) {
    return this.httpClient.get<RestaurantWithImage[]>(
      `Restaurants/getByCity/${city}`
    );
  }

  getRestaurantById(id: string) {
    return this.httpClient.get<RestaurantWithImages>(`Restaurants/${id}`);
  }
}
