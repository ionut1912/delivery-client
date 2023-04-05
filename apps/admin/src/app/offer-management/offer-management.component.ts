import {Component,  ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { Offer } from '../../../../../libs/shared/models/Offer/Offer';
import { OfferForMenuItemsService } from '../../../../../libs/shared/services/OfferForMenuItemsService';

@Component({
  selector: 'delivery-client-offer-management',
  templateUrl: './offer-management.component.html',
  styleUrls: ['./offer-management.component.scss'],
})
export class OfferManagementComponent {
  displayedColumns = [
    'dateActiveFrom',
    'dateActiveTo',
    'discount',
    'Actions',
    'create_offer',
  ];
  dataSource: MatTableDataSource<Offer> = new MatTableDataSource<Offer>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private offerService: OfferForMenuItemsService) {
    this.offerService.getOffers().subscribe((offer) => {
      this.dataSource = new MatTableDataSource(offer);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
