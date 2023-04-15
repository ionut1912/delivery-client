import { Component, OnInit } from '@angular/core';
import { Users } from '../../../../../libs/shared/models/User/Users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAddress } from '../../../../../libs/shared/models/User/UserAddress';
import { AccountService } from '../../../../../libs/shared/services/AccountService';
import { PhotoService } from '../../../../../libs/shared/services/PhotoService';
import { UserConfigDto } from '../../../../../libs/shared/models/UserConfig/UserConfigDto';
import { UserConfigService } from '../../../../../libs/shared/services/UserConfigService';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface FieldsStatus {
  fieldName: string;
  disabled: boolean;
}
export interface UserForEdit {
  username: string;
  phoneNumber: string;
  email: string;
}
export interface UserToBeEdited {
  photo: File;
  userToBeEdited: UserForEdit;
}
@Component({
  selector: 'delivery-client-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  sportActivity: number[] = [1, 2, 3, 4, 5, 6, 7];
  user!: Users;
  disabledFields: FieldsStatus[] = [
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
    {
      fieldName: 'weight',
      disabled: true,
    },
    {
      fieldName: 'height',
      disabled: true,
    },
    {
      fieldName: 'age',
      disabled: true,
    },
    {
      fieldName: 'sportActivity',
      disabled: true,
    },
  ];

  userImage!: File;
  userDetails: FormGroup = new FormGroup({
    street: new FormControl(this.user.address.street),
    number: new FormControl(this.user.address.number),
    city: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    postalCode: new FormControl(this.user.address.postalCode, [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    phone: new FormControl(this.user.phoneNumber, [
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(this.user.email, [Validators.email]),
    username: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    weight: new FormControl(this.user.userConfig.weight, Validators.required),
    height: new FormControl(this.user.userConfig.height, Validators.required),
    age: new FormControl(this.user.userConfig.age, Validators.required),
    sportActivity: new FormControl(null, Validators.required),
  });
  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };

  constructor(
    private matSnackBar: MatSnackBar,
    private accountService: AccountService,
    private photoService: PhotoService,
    private userConfigService: UserConfigService
  ) {}
  ngOnInit() {
    this.accountService.getCurrentUser().subscribe((userData) => {
      this.user = userData;
    });
  }

  makeInputEditable(index: number) {
    this.disabledFields[index].disabled = !this.disabledFields[index].disabled;
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.userDetails.controls[controlName].hasError(errorName);
  };

  updateProfile() {
    const userToBeEdited: UserForEdit = {
      username: this.userDetails.value.username,
      phoneNumber: this.userDetails.value.phone,
      email: this.userDetails.value.email,
    };

    const addressForUser: UserAddress = {
      street: this.userDetails.value.street,
      city: this.userDetails.value.city,
      number: this.userDetails.value.number,
      postalCode: this.userDetails.value.postalCode,
    };
    const userConfigToBeModified: UserConfigDto = {
      weight: this.userDetails.value.weight,
      height: this.userDetails.value.height,
      age: this.userDetails.value.age,
      sex: this.user.userConfig.sex,
      sportActivity: this.userDetails.value.sportActivity,
    };

    this.accountService.modifyCurrentUser(userToBeEdited);
    this.accountService.modifyCurrentUserAddress(addressForUser);
    this.userConfigService.editUserConfig(
      this.user.userConfig.id,
      userConfigToBeModified
    );
    this.matSnackBar.open('Profile modified successfully', 'Close', {
      duration: 5000,
    });
  }

  openFile() {
    const inputElement = document.querySelector('input');
    if (inputElement) {
      inputElement.click();
    }
  }

  handle($event: any) {
    const eventTarget = $event.target;
    if (eventTarget != null) {
      const file: File = eventTarget.files[0];
      const formData = new FormData();
      formData.append('file', file);

      this.photoService.modifyMainPhoto(formData);
    }
  }
}
