import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../../../../libs/shared/services/RestaurantService';
import { MenuItemService } from '../../../../../libs/shared/services/MenuItemService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EditRestaurantData } from '../edit-restaurants-modal/edit-restaurants-modal.component';

@Component({
  selector: 'delivery-client-add-restaurants-modal',
  templateUrl: './add-restaurants-modal.component.html',
  styleUrls: ['./add-restaurants-modal.component.scss'],
})
export class AddRestaurantsModalComponent implements OnInit {
  photo!: FormData;
  restaurants: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    number: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
    menuItems: new FormControl(null, [Validators.required]),
  });
  menuItemNames!: string[];
  constructor(
    private restaurantService: RestaurantService,
    private menuItemService: MenuItemService,
    @Inject(MAT_DIALOG_DATA) public data: EditRestaurantData,
    public dialogRef: MatDialogRef<AddRestaurantsModalComponent>
  ) {}
  error = (field: string, rule: string) => {
    return `Field ${field}   ${rule}`;
  };
  public checkError = (controlName: string, errorName: string) => {
    return this.restaurants.controls[controlName].hasError(errorName);
  };
  addRestaurant() {

    if(this.restaurants.invalid){
      return;
    }
     const addRestaurantBody:RestaurantDto={
       name:this.restaurants.value.name,
       address:{
         street:this.restaurants.value.street,
         number:this.restaurants.value.number,
         city:this.restaurants.value.city,
         postalCode:this.restaurants.value.postalCode
       },
       menuItemsName:this.restaurants.value.menuItems
     }
     this.restaurantService.addRestaurant(addRestaurantBody);
     this.dialogRef.close();
  }
  ngOnInit() {
    this.menuItemService.getMenuItems().subscribe((menuItems) => {
      this.menuItemNames = menuItems.map((x) => x.itemName);
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
