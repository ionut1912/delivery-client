import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../../../../libs/shared/models/Account/Register';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../../../../libs/shared/models/User/Users';

@Component({
  selector: 'delivery-app-client-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLinear = true;

  submitted = false;

  hide = true;
  address: FormGroup = new FormGroup({
    street: new FormControl(null, [Validators.required]),
    number: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    postalCode: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  userDetails!: Register;
  users: FormGroup = new FormGroup({
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  public constructor(private router: Router, private httpClient: HttpClient) {}

  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };
  public checkUsersError = (controlName: string, errorName: string) => {
    return this.users.controls[controlName].hasError(errorName);
  };
  public checkAddressError = (controlName: string, errorName: string) => {
    return this.address.controls[controlName].hasError(errorName);
  };
  onSubmit(): void {
    this.submitted = true;
    this.userDetails = {
      email: this.users.value.email,
      password: this.users.value.password,
      username: this.users.value.username,
      phoneNumber: this.users.value.phone,
      addressForCreation: {
        street: this.address.value.street,
        number: this.address.value.number,
        city: this.address.value.city,
        postalCode: this.address.value.postalCode,
      },
    };
    this.httpClient
      .post<Users>('/Accounts/register', this.userDetails)
      .subscribe(() => {
        this.goToLogin();
      });
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
