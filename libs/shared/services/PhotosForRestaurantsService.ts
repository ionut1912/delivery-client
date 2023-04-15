import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../models/JsonResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PhotosForRestaurantsService {
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}
  addPhotoForRestaurant(id: string, fornData: FormData) {
    this.httpClient
      .post<JsonResponse>(`PhotoForRestaurants/${id}`, fornData)
      .subscribe((response) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      });
  }
}
