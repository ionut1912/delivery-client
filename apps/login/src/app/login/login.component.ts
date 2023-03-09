import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../../../../libs/shared/models/User/Users';
import { Buffer } from 'buffer';
@Component({
  selector: 'delivery-app-client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted = false;
  users: FormGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };

  public constructor(private router: Router, private httpClient: HttpClient) {}

  public checkError = (controlName: string, errorName: string) => {
    return this.users.controls[controlName].hasError(errorName);
  };
  onSubmit(): void {
    this.submitted = true;
    this.login(
      this.users.value.email,
      this.users.value.password,
      this.users.value.username
    );
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
          console.log(role);
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
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
