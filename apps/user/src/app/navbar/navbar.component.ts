import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'delivery-client-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  itemInCart = 12;
  logout() {
    sessionStorage.clear();
    window.location.href = ' http://localhost:4202/ ';
  }

  goToPage(url: string) {
    this.router.navigateByUrl(url);
  }
}
