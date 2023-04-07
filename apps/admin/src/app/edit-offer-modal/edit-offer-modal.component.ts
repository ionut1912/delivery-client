import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface EditOfferData {
  id: string;
}
@Component({
  selector: 'delivery-client-edit-offer-modal',
  templateUrl: './edit-offer-modal.component.html',
  styleUrls: ['./edit-offer-modal.component.scss'],
})
export class EditOfferModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: EditOfferData,
    public dialogRef: MatDialogRef<EditOfferModalComponent>
  ) {}
}
