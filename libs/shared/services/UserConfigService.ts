import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserConfigDto } from '../models/UserConfig/UserConfigDto';
import { JsonResponse } from '../models/JsonResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserConfigService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  addUserConfig(userConfigDto: UserConfigDto) {
    this.httpClient
      .post<JsonResponse>('UserConfigs', userConfigDto)
      .subscribe((response) =>
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        })
      );
  }
  editUserConfig(id: string, userConfigDto: UserConfigDto) {
    this.httpClient
      .put<string>(`UserConfigs/${id}`, userConfigDto)
      .subscribe((result) => console.log(result));
  }
}
