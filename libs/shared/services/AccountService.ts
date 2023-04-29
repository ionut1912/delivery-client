import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/User/UserDto';
import { Register } from '../models/Account/Register';
import { UserAddress } from '../models/User/UserAddress';
import { Buffer } from 'buffer';
import { User } from '../models/User/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JsonResponse } from '../models/JsonResponse';
import { Router } from '@angular/router';
import { ModifyUserAddressRequest } from '../models/Account/ModifyUserAddressRequest';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
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
      .post<JsonResponse>('/Accounts/register', userDetails)
      .subscribe(
        (response) => {
          const closeMessage =
            userDetails.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(response.message, closeMessage, {
            duration: 5000,
          });
          this.goToLogin();
        },
        (err) => {
          const closeMessage =
            userDetails.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(err.error, closeMessage, {
            duration: 5000,
          });
        }
      );
  }
  getCurrentUser() {
    return this.httpClient.get<User>('Accounts/current');
  }

  modifyCurrentUserAddress(userAddress: ModifyUserAddressRequest) {
    this.httpClient
      .put<JsonResponse>('Accounts/current/address', userAddress)
      .subscribe(
        (response) => {
          const closeMessage =
            userAddress.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(response.message, closeMessage, {
            duration: 5000,
          });
        },
        (err) => {
          const closeMessage =
            userAddress.language === 'EN' ? 'Close' : 'Inchide';
          this.snackBar.open(err.error, closeMessage, {
            duration: 5000,
          });
        }
      );
  }
  getAllUsers() {
    return this.httpClient.get<User[]>('Accounts');
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
