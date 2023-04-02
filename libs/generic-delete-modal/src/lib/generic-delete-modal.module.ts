import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { GenericDeleteModalComponent } from './components/generic-delete-modal.component';

@NgModule({
  declarations: [GenericDeleteModalComponent],
  imports: [CommonModule, MaterialModule],
  exports: [GenericDeleteModalComponent],
})
export class GenericDeleteModalModule {}
