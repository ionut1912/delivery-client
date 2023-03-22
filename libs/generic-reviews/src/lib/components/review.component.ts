import { Component, Input } from '@angular/core';

@Component({
  selector: 'delivery-reviews',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @Input() rowData!: any[];
}
