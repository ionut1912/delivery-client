import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { GenericTableComponent } from './components/generic-table.component';

@NgModule({
  declarations: [GenericTableComponent],
  imports: [CommonModule, MaterialModule],
  exports: [GenericTableComponent],
})
export class GenericTableModule {}
