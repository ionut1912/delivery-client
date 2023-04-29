import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserConfigDto } from '../models/UserConfig/UserConfigDto';
import { JsonResponse } from '../models/JsonResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserConfigAddRequest } from '../models/UserConfig/UserConfigAddRequest';
import { UserConfigEditRequest } from '../models/UserConfig/UserConfigEditRequest';

@Injectable({
  providedIn: 'root',
})
export class UserConfigService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  addUserConfig(userConfigDto: UserConfigAddRequest) {
    this.httpClient.post<JsonResponse>('UserConfigs', userConfigDto).subscribe(
      (response) => {
        const closeMessage =
          userConfigDto.language === 'EN' ? 'Close' : 'Inchide';
        this.snackBar.open(response.message, closeMessage, {
          duration: 5000,
        });
      },
      (err) => {
        const closeMessage =
          userConfigDto.language === 'EN' ? 'Close' : 'Inchide';
        this.snackBar.open(err.error, closeMessage, {
          duration: 5000,
        });
      }
    );
  }
  editUserConfig(id: string, userConfigDto: UserConfigEditRequest) {
    this.httpClient
      .put<JsonResponse>(`UserConfigs/${id}`, userConfigDto)
      .subscribe(
        (response) => {
          const closeMessage =
            userConfigDto.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(response.message, closeMessage, {
            duration: 5000,
          });
        },
        (err) => {
          const closeMessage =
            userConfigDto.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(err.error, closeMessage, {
            duration: 5000,
          });
        }
      );
  }
}
