import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonResponse } from '../models/JsonResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  modifyMainPhoto(photo: FormData) {
    this.httpClient.put<JsonResponse>('Photos', photo).subscribe((response) =>
      this.snackBar.open(response.message, 'Close', {
        duration: 5000,
      })
    );
  }
}
