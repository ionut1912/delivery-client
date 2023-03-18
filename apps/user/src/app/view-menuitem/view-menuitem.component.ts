import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuItemService } from '../../../../../libs/shared/services/MenuItemService';
import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
export interface ViewMenuItemData {
  id: string;
}
@Component({
  selector: 'delivery-client-view-menuitem',
  templateUrl: './view-menuitem.component.html',
  styleUrls: ['./view-menuitem.component.scss'],
})
export class ViewMenuitemComponent implements OnInit {
  menuItem!: MenuItem;
  constructor(
    public dialogRef2: MatDialogRef<ViewMenuitemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewMenuItemData,
    private menuItemService: MenuItemService
  ) {}
  ngOnInit() {
    this.menuItemService.getMenuItemById(this.data.id).subscribe((response) => {
      this.menuItem = response;
      console.log(this.menuItem);
    });
  }
}
