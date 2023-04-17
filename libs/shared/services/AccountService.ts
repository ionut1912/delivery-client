import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/User/UserDto';
import { Register } from '../models/Account/Register';
import { UserForEdit } from '../../../apps/user/src/app/user-profile/user-profile.component';
import { UserAddress } from '../models/User/UserAddress';
import { EditCurrentUserResponse } from '../models/Account/EditCurrentUserResponse';
import { Buffer } from 'buffer';
import { User } from '../models/User/User';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}
  handleResponseFromState() {
    if (window.location.search.includes('state')) {
      const response = window.location.search.split('?state=')[1];

      const decodedResponse = window.atob(response);

      const userDetailsObject = JSON.parse(decodedResponse);

      sessionStorage.setItem('jwt', userDetailsObject['jwt']);
      sessionStorage.setItem('email', userDetailsObject['email']);

      const refresh = window.location.origin + window.location.pathname + '';

      window.history.replaceState(null, '', refresh);
    }
  }
  login(email: string, password: string, username: string) {
    this.httpClient
      .post<UserDto>('/Accounts/login', { email, password, username })
      .subscribe((response) => {
        if (response.token) {
          const loginResponseToEncode = {
            email: response?.email,
            jwt: response?.token,
          };

          console.log(loginResponseToEncode);
          const claims = JSON.parse(
            Buffer.from(response.token.split('.')[1], 'base64').toString()
          );

          const role =
            claims[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];

          window.location.href =
            role == 'Member'
              ? `http://localhost:4200/dashboard?state=${window.btoa(
                  JSON.stringify(loginResponseToEncode)
                )}`
              : `http://localhost:4201/dashboard?state=${window.btoa(
                  JSON.stringify(loginResponseToEncode)
                )}`;
        }
      });
  }
  register(userDetails: Register) {
    this.httpClient
      .post<UserDto>('/Accounts/register', userDetails)
      .subscribe(() => {
        console.log('register successfully!');
      });
  }
  getCurrentUser() {
    return this.httpClient.get<User>('Accounts/current');
  }
  modifyCurrentUser(userForEdit: UserForEdit) {
    this.httpClient
      .put<EditCurrentUserResponse>('Accounts/current', userForEdit)
      .subscribe((response) => {
        sessionStorage.setItem('jwt', response.token);
        sessionStorage.setItem('email', response.email);
      });
  }
  modifyCurrentUserAddress(userAddress: UserAddress) {
    this.httpClient
      .put('Accounts/current/address', userAddress)
      .subscribe(() => {
        console.log('test');
      });
  }
  getAllUsers() {
    return this.httpClient.get<User[]>('Accounts');
  }
}
