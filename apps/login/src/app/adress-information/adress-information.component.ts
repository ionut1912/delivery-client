import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../../../../libs/shared/models/Account/Register';

@Component({
  selector: 'delivery-client-adress-information',
  templateUrl: './adress-information.component.html',
  styleUrls: ['./adress-information.component.scss'],
})
export class AdressInformationComponent {
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

  userDetails!: Register
  public constructor(private router: Router) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (
      currentNavigation &&
      currentNavigation.extras &&
      currentNavigation.extras.state
    ) {
      this.userDetails = <Register>currentNavigation.extras.state;
    }
    // Initialize the address property if it is undefined
    if (!this.userDetails.address) {
      this.userDetails.address = {
        city: '',
        number: '',
        postalCode: '',
        street: '',
      };
    }
  }

  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.address.controls[controlName].hasError(errorName);
  };
  onSubmit(): void {
    this.submitted = true;
    this.userDetails.address.street = this.address.value.street;
    this.userDetails.address.city = this.address.value.city;
    this.userDetails.address.number = this.address.value.number;
    this.userDetails.address.postalCode = this.address.value.postalCode;

  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
