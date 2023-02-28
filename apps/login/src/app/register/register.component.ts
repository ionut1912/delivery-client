import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'delivery-app-client-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  submitted = false;

  hide = true;
  pattern = '[a-zA-Z ]*';
  users: FormGroup = new FormGroup({
    name:  new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(this.pattern)
    ]),
    email:new FormControl(null, [Validators.email,Validators.required]),
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
      ])
  });



  public constructor(private router:Router) {

  }


  public checkError = (controlName: string, errorName: string) => {

    return this.users.controls[controlName].hasError(errorName);
  }
  onSubmit(): void {
    this.submitted = true

  }




  goToLogin() {
    this.router.navigate(['']);
  }
}
