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
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { NgonnguComponent } from './ngonngu/ngonngu.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    EditorModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      { path: '', redirectTo: 'cauhinh', pathMatch: 'full' },
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: 'cauhinh', component: ConfigComponent },
          { path: 'transaction', component: TransactionComponent },
          { path: 'ngonngu', loadChildren: () => import('./ngonngu/ngonngu.module').then(m => m.NgonnguModule) },
          { path: 'noidung', loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
          { path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
          { path: 'femail', loadChildren: () => import('./femail/femail.module').then(m => m.FemailModule) }
          // { path: 'noidung', component: NoidungComponent }
        ],
      },
    ]),
  ],
  declarations: [AdminComponent, ConfigComponent, TransactionComponent,DangnhapComponent],
})
export class AdminModule {}
