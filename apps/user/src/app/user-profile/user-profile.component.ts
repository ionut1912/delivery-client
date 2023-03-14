import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Users} from "../../../../../libs/shared/models/User/Users";

@Component({
  selector: 'delivery-client-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit{
  user!:Users;
  constructor(private httpClient:HttpClient) {
  }
  ngOnInit() {
    this.httpClient.get<Users>('Accounts/current').subscribe((userData)=>{
      this.user=userData;
    })
  }
}
