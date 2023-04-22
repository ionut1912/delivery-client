import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { OfferForMenuItemsService } from '../../../../../libs/shared/services/OfferForMenuItemsService';
import { OfferDtoForEdit } from '../../../../../libs/shared/models/Offer/OfferDtoForEdit';
import { Offer } from '../../../../../libs/shared/models/Offer/Offer';

export interface EditOfferModalData {
  element: Offer;
}
@Component({
  selector: 'delivery-app-client-edit-offer-modal',
  templateUrl: './edit-offer-modal.component.html',
  styleUrls: ['./edit-offer-modal.component.scss'],
})
export class EditOfferModalComponent {
  offers: FormGroup = new FormGroup({
    discount: new FormControl(this.data.element.discount),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditOfferModalData,
    public dialogRef: MatDialogRef<EditOfferModalComponent>,
    private offerService: OfferForMenuItemsService
  ) {}
  active = this.data.element.active;

  editOffer() {
    const offerForEdit: OfferDtoForEdit = {
      discount: this.offers.value.discount,
      active: this.active,
    };
    this.offerService.editOffer(this.data.element.id, offerForEdit);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.offers.controls[controlName].hasError(errorName);
  };
  changeActive() {
    this.active = !this.active;
  }
}
