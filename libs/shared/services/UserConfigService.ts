import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserConfigDto } from '../models/UserConfig/UserConfigDto';

@Injectable({
  providedIn: 'root',
})
export class UserConfigService {
  constructor(private httpClient: HttpClient) {}
  addUserConfig(userConfigDto: UserConfigDto) {
    this.httpClient
      .post<string>('UserConfigs', userConfigDto)
      .subscribe((result) => console.log(result));
  }
  editUserConfig(id: string, userConfigDto: UserConfigDto) {
    this.httpClient
      .put<string>(`UserConfigs/${id}`, userConfigDto)
      .subscribe((result) => console.log(result));
  }
}
