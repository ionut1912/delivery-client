import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface MenuItemPhotosData {
  photos: string[];
}
@Component({
  selector: 'delivery-client-view-item-photos',
  templateUrl: './view-item-photos.component.html',
  styleUrls: ['./view-item-photos.component.scss'],
})
export class ViewItemPhotosComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewItemPhotosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuItemPhotosData
  ) {}
  close() {
    this.dialogRef.close();
  }
}
