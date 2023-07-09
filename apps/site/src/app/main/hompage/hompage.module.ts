import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HompageComponent } from './hompage.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      { path: '', component: HompageComponent }
    ])
  ],
  declarations: [HompageComponent]
})
export class HompageModule { }
