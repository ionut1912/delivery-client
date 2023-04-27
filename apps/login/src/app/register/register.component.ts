/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../../../../libs/shared/models/Account/Register';
import { AccountService } from '../../../../../libs/shared/services/AccountService';
import { ActivatedRoute, Router } from '@angular/router';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';

@Component({
  selector: 'delivery-app-client-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLinear = true;
  data!: InternationalizationConfig;
  language!: string;
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  error = (field: string, rule: string) => {
    return `${field}   ${rule}`;
  };
  public checkUsersError = (controlName: string, errorName: string) => {
    return this.users.controls[controlName].hasError(errorName);
  };
  public checkAddressError = (controlName: string, errorName: string) => {
    return this.address.controls[controlName].hasError(errorName);
  };
  ngOnInit() {
    this.data = this.route.snapshot.data[0];
    this.language = sessionStorage.getItem('LANGUAGE') ?? 'en';
  }
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
    this.router.navigate(['/login']);
  }
}
