import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ConfigComponent } from './config/config.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
