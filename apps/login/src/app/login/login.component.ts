import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  public constructor(private router: Router) {}

  public checkError = (controlName: string, errorName: string) => {
    return this.users.controls[controlName].hasError(errorName);
  };
  onSubmit(): void {
    this.submitted = true;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
