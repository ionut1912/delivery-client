import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../../libs/shared/services/LoginService";

@Component({
  selector: 'delivery-app-client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'user';
  constructor(private loginService:LoginService ) {
  }
  ngOnInit() {
    this.loginService.handleResponseFromState();
  }
}
