/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../../../../../libs/shared/services/RestaurantService';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditRestaurantsModalComponent } from '../edit-restaurants-modal/edit-restaurants-modal.component';
import { AddRestaurantsModalComponent } from '../add-restaurants-modal/add-restaurants-modal.component';
import { GenericDeleteModalComponent } from '../../../../../libs/generic-delete-modal/src/lib/components/generic-delete-modal.component';
import { PhotoForRestaurant } from '../../../../../libs/shared/models/Photos/PhotoForRestaurant';
import { Router } from '@angular/router';
export interface RestaurantTableDataSource {
  id: string;
  name: string;
  city: string;
  street: string;
  number: string;
  postalCode: string;
  menuItemNames: string[];
}
@Component({
  selector: 'delivery-app-client-restaurant-management',
  templateUrl: './restaurant-management.component.html',
  styleUrls: ['./restaurant-management.component.scss'],
})
export class RestaurantManagementComponent implements OnInit {
  constructor(
    private restaurantService: RestaurantService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.initializeRestaurantData();
  }
  dataSource: MatTableDataSource<RestaurantTableDataSource> =
    new MatTableDataSource<RestaurantTableDataSource>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = [
    'id',
    'name',
    'city',
    'street',
    'number',
    'postalCode',
    'menuItems',
    'Actions',
    'create_restaurant',
  ];
  restaurantPhotos!: PhotoForRestaurant[];

  ngOnInit() {
    this.initializeRestaurantData();
  }

  initializeRestaurantData() {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.restaurantPhotos = restaurants.map((x) => x.restaurantPhotos).flat();

      const restaurantTableDataSource: RestaurantTableDataSource[] = [];
      for (const element of restaurants) {
        const restaurantTableSource: RestaurantTableDataSource = {
          id: element.id,
          name: element.name,
          city: element.address.city,
          street: element.address.street,
          number: element.address.number,
          postalCode: element.address.postalCode,
          menuItemNames: element.menuItemsRestaurants.map(
            (x) => x.menuItems.itemName
          ),
        };
        restaurantTableDataSource.push(restaurantTableSource);
      }
      this.dataSource = new MatTableDataSource<RestaurantTableDataSource>(
        restaurantTableDataSource
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editRestaurant(element: RestaurantTableDataSource) {
    const dialogRef = this.dialog.open(EditRestaurantsModalComponent, {
      data: {
        element,
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initializeRestaurantData();
    });
  }

  addRestaurant() {
    const dialogRef = this.dialog.open(AddRestaurantsModalComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.initializeRestaurantData();
    });
  }

  deleteRestaurant(id: string) {
    const dialogRef = this.dialog.open(GenericDeleteModalComponent, {
      data: {
        id,
        item: 'restaurant',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.initializeRestaurantData();
    });
  }

  addPhotos(id: string) {
    this.router.navigate(['/restaurant-photo', id]);
  }
}
