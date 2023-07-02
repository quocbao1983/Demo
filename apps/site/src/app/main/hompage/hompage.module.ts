import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HompageComponent } from './hompage.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: HompageComponent }
    ])
  ],
  declarations: [HompageComponent]
})
export class HompageModule { }
