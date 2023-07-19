import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaidatComponent } from './caidat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: CaidatComponent }
    ])
  ],
  declarations: [CaidatComponent]
})
export class CaidatModule { }
