import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface UserPhotoData {
  images: string[];
}
@Component({
  selector: 'delivery-client-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.scss'],
})
export class UserPhotosComponent {
  constructor(
    public dialogRef: MatDialogRef<UserPhotosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserPhotoData
  ) {}

  close() {
    this.dialogRef.close();
  }
}
