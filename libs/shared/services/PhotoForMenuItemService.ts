import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonResponse } from '../models/JsonResponse';

@Injectable({
  providedIn: 'root',
})
export class PhotoForMenuItemService {
  constructor(
    private httpClient: HttpClient,
    private matSnackBar: MatSnackBar
  ) {}
  addPhotoForMenuItem(id: string, formData: FormData) {
    this.httpClient
      .post<JsonResponse>(`PhotoForMenuItems/${id}`, formData)
      .subscribe((response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      });
  }
}
