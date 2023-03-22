import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './components/review.component';

@NgModule({
  declarations: [ReviewComponent],
  imports: [CommonModule],
  exports: [ReviewComponent],
})
export class GenericReviewsModule {}
