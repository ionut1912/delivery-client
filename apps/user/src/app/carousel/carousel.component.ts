import { Component, Input } from '@angular/core';

@Component({
  selector: 'delivery-app-client-carousel',
  templateUrl: './carousel.component.html',

})
export class CarouselComponent {
  @Input() images!: string[];
}
