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

export interface OfferDataSource extends Offer {
  menuItemName: string;
}
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
    'itemName',
    'Actions',
    'create_offer',
  ];
  dataSource: MatTableDataSource<OfferDataSource> =
    new MatTableDataSource<OfferDataSource>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  menuItem!: MenuItem[];
  constructor(
    private offerService: OfferForMenuItemsService,
    private menuItemService: MenuItemService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.menuItemService.getMenuItems().subscribe((items) => {
      this.menuItem = items;
    });
    this.offerService.getOffers().subscribe((offer) => {
      const offerDataSource: OfferDataSource[] = [];
      const menuItemIds = offer
        .map((x) => x.offerMenuItems)
        .map((x) => x.map((item) => item.menuItemId))
        .flat();

      for (const offerItem of offer) {
        let filteredMenuItems = '';
        for (const element of menuItemIds) {
          const menuItemFiltered = this.menuItem?.find((x) => x.id == element);
          if (menuItemFiltered) {
            filteredMenuItems = menuItemFiltered.itemName;
          }
        }

        const offerData: OfferDataSource = {
          ...offerItem,
          menuItemName: filteredMenuItems,
        };
        offerDataSource.push(offerData);
      }
      console.log(offerDataSource);
      this.dataSource = new MatTableDataSource(offerDataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editOffer(id: number) {
    const dialogRef = this.dialog.open(EditOfferModalComponent, {
      data: {
        id: id,
      },
    });
  }
}
