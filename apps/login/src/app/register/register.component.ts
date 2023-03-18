import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../../../../libs/shared/models/Account/Register';
import { AccountService } from '../../../../../libs/shared/services/AccountService';
import { Router } from '@angular/router';

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

  public constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

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
    this.accountService.register(this.userDetails);
    this.goToLogin();
  }
  goToLogin() {
    this.router.navigate(['']);
  }
}
