import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { AccountService } from 'libs/shared/services/AccountService';

@Component({
  selector: 'delivery-client-insert-code',
  templateUrl: './insert-code.component.html',
  styleUrls: ['./insert-code.component.scss'],
})
export class InsertCodeComponent implements OnInit {
  email!: string;
  data!: InternationalizationConfig;
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
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
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
    this.goToResetPassword(this.email);
  }

  goToResetPassword(email: string) {
    this.router.navigate(['/reset-password'], {
      queryParams: { email: email },
    });
  }
}
