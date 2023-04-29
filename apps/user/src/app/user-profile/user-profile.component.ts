import { UserConfigEditRequest } from './../../../../../libs/shared/models/UserConfig/UserConfigEditRequest';
import { ModifyUserAddressRequest } from './../../../../../libs/shared/models/Account/ModifyUserAddressRequest';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAddress } from '../../../../../libs/shared/models/User/UserAddress';
import { AccountService } from '../../../../../libs/shared/services/AccountService';
import { PhotoService } from '../../../../../libs/shared/services/PhotoService';
import { UserConfigDto } from '../../../../../libs/shared/models/UserConfig/UserConfigDto';
import { UserConfigService } from '../../../../../libs/shared/services/UserConfigService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../../libs/shared/models/User/User';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'delivery-app-client-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  sportActivity: number[] = [1, 2, 3, 4, 5, 6, 7];
  user!: User;
  data!: InternationalizationConfig;
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
    weight: new FormControl(null, Validators.required),
    height: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    sportActivity: new FormControl(null, Validators.required),
  });

  constructor(
    private matSnackBar: MatSnackBar,
    private accountService: AccountService,
    private photoService: PhotoService,
    private userConfigService: UserConfigService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.data = this.route.snapshot.data[0];

    this.accountService.getCurrentUser().subscribe((userData) => {
      this.user = userData;
      this.userDetails.patchValue({
        street: this.data.dynamicConfigs[this.user.address?.street],
        number: this.user.address?.number,
        city: this.data.dynamicConfigs[this.user.address?.city],
        postalCode: this.user.address?.postalCode,
        weight: this.user.userConfig.weight,
        height: this.user.userConfig.height,
        age: this.user.userConfig.age,
      });
    });
  }

  makeInputEditable(index: number) {
    this.disabledFields[index].disabled = !this.disabledFields[index].disabled;
  }

  updateProfile() {
    const addressForUser: ModifyUserAddressRequest = {
      language: sessionStorage.getItem('LANGUAGE') ?? 'EN',
      useraddressForCreation: {
        street: this.userDetails.value.street,
        city: this.userDetails.value.city,
        number: this.userDetails.value.number,
        postalCode: this.userDetails.value.postalCode,
      },
    };
    const userConfigToBeModified: UserConfigEditRequest = {
      language: sessionStorage.getItem('LANGUAGE') ?? 'EN',
      userConfigDto: {
        weight: this.userDetails.value.weight,
        height: this.userDetails.value.height,
        age: this.userDetails.value.age,
        sex: this.user.userConfig.sex,
        sportActivity: this.userDetails.value.sportActivity,
      },
    };

    this.accountService.modifyCurrentUserAddress(addressForUser);
    this.userConfigService.editUserConfig(
      this.user.userConfig.id,
      userConfigToBeModified
    );
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
      if (this.user.photos.length === 0) {
        this.photoService.addPhoto(formData);
      } else {
        this.photoService.modifyMainPhoto(formData);
      }
    }
  }
}
