/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserTableDataSource } from '../user-management/user-management.component';
export interface UserDetails {
  userDetails: UserTableDataSource;
}
@Component({
  selector: 'delivery-app-client-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDetails,
    public dialogRef: MatDialogRef<UserDetailsComponent>
  ) {
    console.log(data.userDetails);
  }
  close() {
    this.dialogRef.close();
  }
}
