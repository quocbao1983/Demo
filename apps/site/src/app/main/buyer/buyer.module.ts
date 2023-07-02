import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerComponent } from './buyer.component';
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
      { path: '', component: BuyerComponent }
    ])
  ],
  declarations: [BuyerComponent]
})
export class BuyerModule { }
