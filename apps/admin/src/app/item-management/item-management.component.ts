import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuItem } from 'libs/shared/models/MenuItem/MenuItem';
import { MenuItemService } from 'libs/shared/services/MenuItemService';

@Component({
  selector: 'delivery-client-item-management',
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
    'active',
    'numberOfCalories',
    'Actions',
    'create_item',
  ];
  dataSource: MatTableDataSource<MenuItem> =
    new MatTableDataSource<MenuItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private menuItemService:MenuItemService){
this.initializeMenuItemTable();
  }
  ngOnInit(): void {
this.initializeMenuItemTable();
      
  }
  initializeMenuItemTable(){
    this.menuItemService.getMenuItems().subscribe((menuItems)=>{
      this.dataSource=new MatTableDataSource<MenuItem>(menuItems);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }
}
