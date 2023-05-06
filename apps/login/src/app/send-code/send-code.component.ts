/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'libs/shared/services/AccountService';
import { ForgotPasswordResetCodeRequset } from 'libs/shared/models/Account/ForgotPasswordResetCodeRequest';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';

@Component({
  selector: 'delivery-app-client-send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss'],
})
export class SendCodeComponent implements OnInit {
  data!: InternationalizationConfig;
  language!: string;
  users: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  error = (field: string, rule: string) => {
    return `${field}   ${rule}`;
  };

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}
  public checkError = (controlName: string, errorName: string) => {
    return this.users.controls[controlName].hasError(errorName);
  };
  ngOnInit(): void {
    this.data = this.route.snapshot.data[0];
    this.language = sessionStorage.getItem('LANGUAGE') ?? 'EN';
  }
  onSubmit(): void {
    if (!this.users.valid) {
      return;
    }
    const body: ForgotPasswordResetCodeRequset = {
      email: this.users.value.email,
      language: this.language,
    };
    this.accountService.sendCodeToEmail(body);
  }
}
