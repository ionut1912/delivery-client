import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCodeContract } from 'libs/shared/models/Account/UserCodeContract';

import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { AccountService } from 'libs/shared/services/AccountService';

@Component({
  selector: 'delivery-app-client-insert-code',
  templateUrl: './insert-code.component.html',
  styleUrls: ['./insert-code.component.scss'],
})
export class InsertCodeComponent implements OnInit {
  email!: string;
  data!: InternationalizationConfig;
  userCode!: UserCodeContract;
  isCodeValid = false;
  language!: string;
  users: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  error = (field: string, rule: string) => {
    return `${field}   ${rule}`;
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
    this.accountService
      .getResetPasswordCode(this.email)
      .subscribe((userCode) => {
        this.userCode = userCode;
      });
    this.data = this.route.snapshot.data[0];
    this.language = sessionStorage.getItem('LANGUAGE') ?? 'EN';
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.users.controls[controlName].hasError(errorName);
  };

  onSubmit(): void {
    this.isCodeValid = this.userCode.code === this.users.value.code;

    if (this.isCodeValid) {
      this.goToResetPassword(this.email);
    } else {
      const closeMessage = this.language == 'EN' ? 'Close' : 'Inchide';
      const errorMessage =
        this.language == 'EN' ? 'Code is invalid' : 'Codul este invalid';
      this.snackBar.open(errorMessage, closeMessage, {
        duration: 5000,
      });
    }
  }

  goToResetPassword(email: string) {
    this.router.navigate(['/reset-password'], {
      queryParams: { email: email },
    });
  }
}
