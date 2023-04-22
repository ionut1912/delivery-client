import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OfferForMenuItemsService } from '../../../../../libs/shared/services/OfferForMenuItemsService';
import { OfferDtoForCreation } from '../../../../../libs/shared/models/Offer/OfferDtoForCreation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'delivery-app-client-add-offers-modal',
  templateUrl: './add-offers-modal.component.html',
  styleUrls: ['./add-offers-modal.component.scss'],
})
export class AddOffersModalComponent {
  offers: FormGroup = new FormGroup({
    dateActiveFrom: new FormControl(null, [Validators.required]),
    dateActiveFromTime: new FormControl(null, [Validators.required]),
    dateActiveTo: new FormControl(null, [Validators.required]),
    dateActiveToTime: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required]),
    menuItemName: new FormControl(null, [Validators.required]),
  });
  constructor(
    public dialogRef: MatDialogRef<AddOffersModalComponent>,
    private offerService: OfferForMenuItemsService,
    private datePipe: DatePipe
  ) {}
  addOffer() {
    const formatedDateActiveFrom = this.datePipe.transform(
      this.offers.value.dateActiveFrom,
      'dd.MM.yyyy'
    );
    const formatedDateActiveTo = this.datePipe.transform(
      this.offers.value.dateActiveTo,
      'dd.MM.yyyy'
    );
    const dateActiveFrom =
      formatedDateActiveFrom + ' ' + this.offers.value.dateActiveFromTime;
    const dateActiveTo =
      formatedDateActiveTo + ' ' + this.offers.value.dateActiveToTime;
    const offerForCreation: OfferDtoForCreation = {
      dateActiveFrom: dateActiveFrom,
      dateActiveTo: dateActiveTo,
      discount: this.offers.value.discount,
      menuItemName: this.offers.value.menuItemName,
    };
    this.offerService.addOffer(offerForCreation);
    this.dialogRef.close();
  }
  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.offers.controls[controlName].hasError(errorName);
  };
  cancel() {
    this.dialogRef.close();
  }
}
