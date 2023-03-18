import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../../../libs/shared/services/AccountService';

@Component({
  selector: 'delivery-app-client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted = false;
  hide = true;
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

  public constructor(
    private router: Router,
    private loginService: AccountService
  ) {}

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
    this.loginService.login(email, password, username);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
