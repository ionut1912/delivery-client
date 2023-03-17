import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../../../../libs/shared/models/User/Users';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface FieldsStatus{
  fieldName:string;
  disabled:boolean;
}
@Component({
  selector: 'delivery-client-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user!: Users;
  disabledFields:FieldsStatus[] = [
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

  resetForm() {
    this.userDetails.patchValue(
      {
        phone:this.user.phoneNumber,
        street:this.user.address.street,
        number:this.user.address.number,
        city:this.user.address.city,
        postalCode:this.user.address.postalCode,
        email:this.user.email,
        username:this.user.username
      }
    );
  }

  updateProfile() {
    const userToBeEdited:Users={
      username: this.userDetails.value.username,
      phoneNumber:this.userDetails.value.phone,
      email:this.userDetails.value.email,
      address:{
        street:this.userDetails.value.street,
        city:this.userDetails.value.city,
        number:this.userDetails.value.number,
        postalCode:this.userDetails.value.postalCode
      }
    };
   this.httpClient.put("Accounts/current",userToBeEdited).subscribe(()=>{
 console.log("success")
   });
  }
}
