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

export interface OfferTableDataSource {
  id: string;
  dateActiveFrom: string;
  dateActiveTo: string;
  discount: number;
  active: boolean;
  menuItemName: string;
}

@Component({
  selector: 'delivery-client-offer-management',
  templateUrl: './offer-management.component.html',
  styleUrls: ['./offer-management.component.scss'],
})
export class OfferManagementComponent implements OnInit {
  displayedColumns = [
    'id',
    'dateActiveFrom',
    'dateActiveTo',
    'menuItemName',
    'discount',
    'active',
    'Actions',
    'create_offer',
  ];
  dataSource: MatTableDataSource<OfferTableDataSource> =
    new MatTableDataSource<OfferTableDataSource>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  menuItem!: MenuItem[];

  constructor(
    private offerService: OfferForMenuItemsService,
    private dialog: MatDialog
  ) {
    this.extractOfferDataSource();
  }

  ngOnInit() {
    this.extractOfferDataSource();
  }

  editOffer(element: Offer) {
    const dialogRef = this.dialog.open(EditOfferModalComponent, {
      data: {
        element,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.extractOfferDataSource();
    });
  }

  extractOfferDataSource() {
    this.offerService.getOffers().subscribe((offer) => {
      const menuItems = offer
        .flatMap((offer) => {
          return offer.offerMenuItems.map(
            (offerMenuItem) => offerMenuItem.menuItem
          );
        })
        .filter((menuItem) => menuItem !== undefined)
        .map((x) => x?.itemName);

      const offerDataSource: OfferTableDataSource[] = [];
      for (let i = 0; i < offer.length; i++) {
        const offerDataSourceItem: OfferTableDataSource = {
          id: offer[i].id,
          dateActiveFrom: offer[i].dateActiveFrom,
          dateActiveTo: offer[i].dateActiveTo,
          discount: offer[i].discount,
          active: offer[i].active,
          menuItemName: menuItems[i] || '',
        };
        offerDataSource.push(offerDataSourceItem);
      }

      this.dataSource.data = offerDataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addOffer() {
    const dialogRef = this.dialog.open(AddOffersModalComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.extractOfferDataSource();
    });
  }
}
