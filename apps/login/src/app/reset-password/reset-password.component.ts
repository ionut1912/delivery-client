/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordRequest } from 'libs/shared/models/Account/ResetPasswordRequest';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { AccountService } from 'libs/shared/services/AccountService';

@Component({
  selector: 'delivery-app-client-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  email!: string;
  hide = true;
  data!: InternationalizationConfig;
  language!: string;
  users: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
  });
  error = (field: string, rule: string) => {
    return `${field}   ${rule}`;
  };

  public constructor(
    private loginService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
    this.data = this.route.snapshot.data[0];
    this.language = sessionStorage.getItem('LANGUAGE') ?? 'EN';
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.users.controls[controlName].hasError(errorName);
  };
  onSubmit(): void {
    if (!this.users.valid) {
      return;
    }
    const body: ResetPasswordRequest = {
      email: this.email,
      password: this.users.value.password,
      language: this.language,
    };
    this.loginService.resetPassword(body);
  }
}
