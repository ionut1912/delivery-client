import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'delivery-app-client-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  submitted = false;

  hide = true;

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

  public constructor(private router: Router) {}

  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.users.controls[controlName].hasError(errorName);
  };
  onSubmit(): void {
    this.submitted = true;
    this.router.navigate(['/address-info'], {
      state: {
        phoneNumber: this.users.value.phone,
        email: this.users.value.email,
        username: this.users.value.username,
        password: this.users.value.password,
      },
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
