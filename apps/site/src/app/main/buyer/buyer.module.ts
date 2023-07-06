import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerComponent } from './buyer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: BuyerComponent }
    ])
  ],
  declarations: [BuyerComponent]
})
export class BuyerModule { }
