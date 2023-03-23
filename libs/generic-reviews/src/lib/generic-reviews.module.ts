import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './components/review.component';
import { MaterialModule } from '../../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReviewComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [ReviewComponent],
})
export class GenericReviewsModule {}
