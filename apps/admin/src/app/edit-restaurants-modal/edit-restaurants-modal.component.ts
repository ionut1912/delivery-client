import { Component, Inject, OnInit } from '@angular/core';
import { RestaurantTableDataSource } from '../restaurant-management/restaurant-management.component';
import { RestaurantService } from '../../../../../libs/shared/services/RestaurantService';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItemService } from '../../../../../libs/shared/services/MenuItemService';
import { RestaurantDto } from '../../../../../libs/shared/models/Restaurant/RestaurantDto';
export interface EditRestaurantData {
  element: RestaurantTableDataSource;
}
@Component({
  selector: 'delivery-client-edit-restaurants-modal',
  templateUrl: './edit-restaurants-modal.component.html',
  styleUrls: ['./edit-restaurants-modal.component.scss'],
})
export class EditRestaurantsModalComponent implements OnInit {
  restaurants: FormGroup = new FormGroup({
    name: new FormControl(this.data.element.name),
    street: new FormControl(this.data.element.street),
    number: new FormControl(this.data.element.number),
    city: new FormControl(this.data.element.city),
    postalCode: new FormControl(this.data.element.postalCode),
    menuItems: new FormControl(this.data.element.menuItemNames),
  });
  menuItemNames!: string[];
  constructor(
    private restaurantService: RestaurantService,
    private menuItemService: MenuItemService,
    @Inject(MAT_DIALOG_DATA) public data: EditRestaurantData,
    public dialogRef: MatDialogRef<EditRestaurantsModalComponent>
  ) {}

  editRestaurant() {
    const editRestaurantBody: RestaurantDto = {
      name: this.restaurants.value.name,
      address: {
        street: this.restaurants.value.street,
        number: this.restaurants.value.number,
        city: this.restaurants.value.city,
        postalCode: this.restaurants.value.postalCode,
      },
      menuItemsName: this.restaurants.value.menuItems,
    };
    this.restaurantService.editRestaurant(
      this.data.element.id,
      editRestaurantBody
    );
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
