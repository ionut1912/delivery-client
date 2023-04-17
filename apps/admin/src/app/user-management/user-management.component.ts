import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../../../../libs/shared/services/AccountService';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../../libs/shared/models/User/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface UserTableDataSource {
  id: number;
  username: string;
  email: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;

  phoneNumber: string;
  role: string;
}
@Component({
  selector: 'delivery-client-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}
  dataSource: MatTableDataSource<UserTableDataSource> =
    new MatTableDataSource<UserTableDataSource>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = [
    'id',
    'username',
    'email',
    'street',
    'number',
    'city',
    'postalCode',
    'phoneNumber',
    'role',
    'Actions',
  ];
  curentUser!: User;
  ngOnInit() {
    this.initializeUserDatasource();
    this.accountService.getCurrentUser().subscribe((user) => {
      this.curentUser = user;
      console.log(this.curentUser);
    });
  }
  initializeUserDatasource() {
    this.accountService.getAllUsers().subscribe((users) => {
      const usersDatasource: UserTableDataSource[] = [];
      for (const user of users) {
        const userDatasource: UserTableDataSource = {
          id: user.id,
          username: user.username,
          email: user.email,
          street: user.address.street,
          number: user.address.number,
          city: user.address.city,
          postalCode: user.address.postalCode,
          phoneNumber: user.phoneNumber,
          role: user.role,
        };
        usersDatasource.push(userDatasource);
      }
      this.dataSource = new MatTableDataSource<UserTableDataSource>(
        usersDatasource
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }
}
