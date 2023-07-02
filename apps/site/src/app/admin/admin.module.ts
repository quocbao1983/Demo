import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ConfigComponent } from './config/config.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'config', pathMatch: 'full' },
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: 'transaction', component: TransactionComponent },
          { path: 'config', component: ConfigComponent }
        ],
      },
    ]),
  ],
  declarations: [AdminComponent, ConfigComponent, TransactionComponent],
})
export class AdminModule {}
