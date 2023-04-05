import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../models/Offer/Offer';

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
}
