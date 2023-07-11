import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartComponent } from './chart.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ChartComponent }
    ])
  ],
  declarations: [ChartComponent],
  providers:[DatePipe]
})
export class ChartModule { }
