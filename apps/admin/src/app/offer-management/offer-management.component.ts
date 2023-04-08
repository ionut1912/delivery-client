import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { Offer } from '../../../../../libs/shared/models/Offer/Offer';
import { OfferForMenuItemsService } from '../../../../../libs/shared/services/OfferForMenuItemsService';
import { MatDialog } from '@angular/material/dialog';
import { MenuItemService } from '../../../../../libs/shared/services/MenuItemService';
import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
import { EditOfferModalComponent } from '../edit-offer-modal/edit-offer-modal.component';
import { AddOffersModalComponent } from '../add-offers-modal/add-offers-modal.component';

@Component({
  selector: 'delivery-client-offer-management',
  templateUrl: './offer-management.component.html',
  styleUrls: ['./offer-management.component.scss'],
})
export class OfferManagementComponent implements OnInit {
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
  menuItem!: MenuItem[];
  constructor(
    private offerService: OfferForMenuItemsService,
    private menuItemService: MenuItemService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.offerService.getOffers().subscribe((offer) => {
      this.dataSource = new MatTableDataSource(offer);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  refreshTable() {
    this.offerService.getOffers().subscribe((offer) => {
      this.dataSource = new MatTableDataSource(offer);
    });
  }
  editOffer(element: Offer) {
    console.log(element);
    this.dialog.open(EditOfferModalComponent, {
      data: {
        element,
      },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.refreshTable();
    });
  }

  addOffer() {
    this.dialog.open(AddOffersModalComponent);
    this.dialog.afterAllClosed.subscribe(() => {
      this.refreshTable();
    });
  }
}
