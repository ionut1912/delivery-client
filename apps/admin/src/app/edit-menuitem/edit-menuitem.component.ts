import { MenuItemDto } from './../../../../../libs/shared/models/MenuItem/MenuItemDto';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuItem } from 'libs/shared/models/MenuItem/MenuItem';
import { MenuItemService } from 'libs/shared/services/MenuItemService';
export interface EditMenuItemData {
  menuItem: MenuItem;
}
@Component({
  selector: 'delivery-client-edit-menuitem',
  templateUrl: './edit-menuitem.component.html',
  styleUrls: ['./edit-menuitem.component.scss'],
})
export class EditMenuitemComponent {
  menuItems: FormGroup = new FormGroup({
    itemName: new FormControl(this.data.menuItem.itemName),
    category: new FormControl(this.data.menuItem.category),
    ingredients: new FormControl(this.data.menuItem.ingredients),
    price: new FormControl(this.data.menuItem.price),
    numberOfCalories: new FormControl(this.data.menuItem.numberOfCalories),
    quantity: new FormControl(this.data.menuItem.quantity),
  });

  constructor(
    private dialogRef: MatDialogRef<EditMenuitemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditMenuItemData,
    public menuItemService: MenuItemService
  ) {}
  editMenuItem() {
    const menuItemDto: MenuItemDto = {
      itemName: this.menuItems.value.itemName,
      category: this.menuItems.value.category,
      ingredients: this.menuItems.value.ingredients,
      price: this.menuItems.value.price,
      numberOfCalories: this.menuItems.value.numberOfCalories,
      quantity: this.menuItems.value.quantity,
    };
    this.menuItemService.editMenuItem(this.data.menuItem.id, menuItemDto);
    this.dialogRef.close();
  }
  cancel() {
    this.dialogRef.close();
  }
}
