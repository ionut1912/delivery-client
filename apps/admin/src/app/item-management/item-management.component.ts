/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { PhotoForMenuItemService } from './../../../../../libs/shared/services/PhotoForMenuItemService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuItem } from 'libs/shared/models/MenuItem/MenuItem';
import { MenuItemService } from 'libs/shared/services/MenuItemService';
import { EditMenuitemComponent } from '../edit-menuitem/edit-menuitem.component';
import { ViewItemPhotosComponent } from '../view-item-photos/view-item-photos.component';
import { AddItemsModalComponent } from '../add-items-modal/add-items-modal.component';

@Component({
  selector: 'delivery-app-client-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss'],
})
export class ItemManagementComponent implements OnInit {
  displayedColumns = [
    'id',
    'itemName',
    'category',
    'ingredients',
    'price',
    'quantity',
    'numberOfCalories',
    'Actions',
    'create_item',
  ];
  dataSource: MatTableDataSource<MenuItem> = new MatTableDataSource<MenuItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private menuItemService: MenuItemService,
    private dialog: MatDialog,
    private photoForMenuItemService: PhotoForMenuItemService
  ) {
    this.initializeMenuItemTable();
  }
  ngOnInit(): void {
    this.initializeMenuItemTable();
  }
  initializeMenuItemTable() {
    this.menuItemService.getMenuItems().subscribe((menuItems) => {
      this.dataSource = new MatTableDataSource<MenuItem>(menuItems);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  editMenuItem(elenent: MenuItem) {
    const dialogRef = this.dialog.open(EditMenuitemComponent, {
      data: {
        menuItem: elenent,
      },
    });
    dialogRef.afterClosed().subscribe(() => {

      this.initializeMenuItemTable();
    });
  }
  addMenuItem(){
    const dialogRef=this.dialog.open(AddItemsModalComponent);
    dialogRef.afterClosed().subscribe(() => {
    
      this.initializeMenuItemTable();
    });
  }
  openFile() {
    const inputElement = document.querySelector('input');
    if (inputElement) {
      inputElement.click();
    }
  }

  handle($event: any, id: string) {
    const eventTarget = $event.target;
    if (eventTarget != null) {
      const file: File = eventTarget.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.photoForMenuItemService.addPhotoForMenuItem(id, formData);
    }
  }
  viewItemPhotos(element: MenuItem) {
    this.dialog.open(ViewItemPhotosComponent, {
      data: {
        photos: element.photos.map((item) => item.url),
      },
    });
  }
}
