/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItemService } from 'libs/shared/services/MenuItemService';

import { MenuItemDto } from 'libs/shared/models/MenuItem/MenuItemDto';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'delivery-app-client-add-items-modal',
  templateUrl: './add-items-modal.component.html',
  styleUrls: ['./add-items-modal.component.scss'],
})
export class AddItemsModalComponent {

 menuItems: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    ingredients: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    numberOfCalories: new FormControl(0, [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });
  constructor(
    private menuItemService: MenuItemService,
    public dialogRef: MatDialogRef<AddItemsModalComponent>
  ) {}
  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.menuItems.controls[controlName].hasError(errorName);
  };
  addMenuItem() {
    if (this.menuItems.invalid) {
      return;
    }
    const addMenuItemBody: MenuItemDto= {
      itemName: this.menuItems.value.name,
     category:this.menuItems.value.category,
     ingredients: this.menuItems.value.ingredients,
     price: this.menuItems.value.price,
     numberOfCalories: this.menuItems.value.numberOfCalories,
     quantity: this.menuItems.value.quantity,
    };

 this.menuItemService.addMenuItem(addMenuItemBody);
 this.dialogRef.close();
  }


  cancel() {
    this.dialogRef.close();
  }

}
