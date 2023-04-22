import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/Offer/Offer';
import { OfferDtoForEdit } from '../models/Offer/OfferDtoForEdit';
import { OfferDtoForCreation } from '../models/Offer/OfferDtoForCreation';
import { JsonResponse } from '../models/JsonResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class OfferForMenuItemsService {
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  getOfferById(id: string) {
    return this.httpClient.get<Offer>(`Offers/${id}`);
  }
  getOffers() {
    return this.httpClient.get<Offer[]>('Offers');
  }
  addOffer(offerForCreation: OfferDtoForCreation) {
    this.httpClient
      .post<JsonResponse>(`Offers`, offerForCreation)
      .subscribe((response) =>
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        })
      );
  }
  editOffer(id: string, offerDtoForEdit: OfferDtoForEdit) {
    this.httpClient
      .put<JsonResponse>(`Offers/${id}`, offerDtoForEdit)
      .subscribe((response) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      });
  }
}
