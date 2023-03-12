import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'delivery-client-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements  OnInit{
  constructor(private  router:ActivatedRoute) {
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      const id = params['id'];
      console.log(id); // or do something else with the ID
    });
  }

}
