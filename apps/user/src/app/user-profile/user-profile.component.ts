import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../../../../libs/shared/models/User/Users';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'delivery-client-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user!: Users;
  disabledFields: any = [
    {
      fieldName: 'phone',
      disabled: true,
    },
    {
      fieldName: 'street',
      disabled: true,
    },
    {
      fieldName: 'number',
      disabled: true,
    },
    {
      fieldName: 'city',
      disabled: true,
    },
    {
      fieldName: 'postalCode',
      disabled: true,
    },
    {
      fieldName: 'email',
      disabled: true,
    },
    {
      fieldName: 'username',
      disabled: true,
    },
  ];

  userDetails: FormGroup = new FormGroup({
    street: new FormControl(null),
    number: new FormControl(null),
    city: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    postalCode: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    phone: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.email]),
    username: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });
  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };

  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.httpClient.get<Users>('Accounts/current').subscribe((userData) => {
      this.user = userData;
    });
  }

  onSubmit() {
    return false;
  }

  makeInputEditable(index: number) {
    this.disabledFields[index].disabled = !this.disabledFields[index].disabled;
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.userDetails.controls[controlName].hasError(errorName);
  };
}
