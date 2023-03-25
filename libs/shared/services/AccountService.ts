import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/User/Users';
import { Buffer } from 'buffer';
import { Register } from '../models/Account/Register';
import { Router } from '@angular/router';
import { UserForEdit } from '../../../apps/user/src/app/user-profile/user-profile.component';
import { UserAddress } from '../models/User/UserAddress';
import { EditCurrentUserResponse } from '../models/Account/EditCurrentUserResponse';

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
      .post<Users>('/Accounts/login', { email, password, username })
      .subscribe((response) => {
        if (response.token) {
          console.log(response);
          const loginResponseToEncode = {
            email: response?.email,
            jwt: response?.token,
          };

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
              : `http://localhost:4201?state=${window.btoa(
                  JSON.stringify(loginResponseToEncode)
                )}`;
        }
      });
  }
  register(userDetails: Register) {
    this.httpClient
      .post<Users>('/Accounts/register', userDetails)
      .subscribe(() => {
        console.log('register successfully!');
      });
  }
  getCurrentUser() {
    return this.httpClient.get<Users>('Accounts/current');
  }
  modifyCurrentUser(userToBeEdited: UserForEdit) {
    this.httpClient
      .put<EditCurrentUserResponse>('Accounts/current', userToBeEdited)
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
}
