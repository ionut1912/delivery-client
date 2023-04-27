import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'delivery-app-client-flags',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
})
export class FlagComponent implements OnInit {
  roTraslation = false;
  ngOnInit(): void {
    console.log(this.roTraslation);
    if (sessionStorage.getItem('LANGUAGE') === null) {
      sessionStorage.setItem('LANGUAGE', 'EN');
    } else {
      this.roTraslation = sessionStorage.getItem('LANGUAGE') === 'RO';
    }
  }
  changeLanguage() {
    this.roTraslation = !this.roTraslation;
    if (this.roTraslation) {
      sessionStorage.setItem('LANGUAGE', 'RO');
    } else {
      sessionStorage.setItem('LANGUAGE', 'EN');
    }
    window.location.reload();
  }
}
