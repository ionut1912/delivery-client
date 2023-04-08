import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/Offer/Offer';
import { OfferDtoForEdit } from '../models/Offer/OfferDtoForEdit';
import { OfferDtoForCreation } from '../models/Offer/OfferDtoForCreation';

@Injectable({
  providedIn: 'root',
})
export class OfferForMenuItemsService {
  constructor(private httpClient: HttpClient) {}
  getOfferById(id: string) {
    return this.httpClient.get<Offer>(`Offers/${id}`);
  }
  getOffers() {
    return this.httpClient.get<Offer[]>('Offers');
  }
  addOffer(offerForCreation: OfferDtoForCreation) {
    this.httpClient
      .post(`Offers`, offerForCreation)
      .subscribe(() => console.log('success'));
  }
  editOffer(id: string, offerDtoForEdit: OfferDtoForEdit) {
    this.httpClient
      .put(`Offers/${id}`, offerDtoForEdit)
      .subscribe(() => console.log('success'));
  }
}
