import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserConfigDto } from '../../../../../libs/shared/models/UserConfig/UserConfigDto';
import { UserConfigService } from '../../../../../libs/shared/services/UserConfigService';
import { AccountService } from '../../../../../libs/shared/services/AccountService';
import { User } from '../../../../../libs/shared/models/User/User';

@Component({
  selector: 'delivery-app-client-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss'],
})
export class UserConfigComponent implements OnInit {
  user!: User;
  sex: string[] = ['Male', 'Female'];
  sportActivity: number[] = [1, 2, 3, 4, 5, 6, 7];
  userConfigs: FormGroup = new FormGroup({
    weight: new FormControl(null, [Validators.required]),
    height: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    sex: new FormControl(null, [Validators.required]),
    sportActivity: new FormControl(null, [Validators.required]),
  });
  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.userConfigs.controls[controlName].hasError(errorName);
  };

  constructor(
    private userConfigService: UserConfigService,
    private accountService: AccountService
  ) {}
  ngOnInit() {
    this.accountService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  addConfig() {
    const userConfig: UserConfigDto = {
      weight: this.userConfigs.value.weight,
      height: this.userConfigs.value.height,
      age: this.userConfigs.value.age,
      sex: this.userConfigs.value.sex,
      sportActivity: this.userConfigs.value.sportActivity,
    };
    this.userConfigService.addUserConfig(userConfig);
    this.userConfigs.reset();
  }
}
