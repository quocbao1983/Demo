import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ConfigComponent } from './config/config.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { NgonnguComponent } from './ngonngu/ngonngu.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UsersInterceptor } from '../shared/users.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';
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
      { 
      path: '', redirectTo: 'transaction', pathMatch: 'full' },
      {
        path: '',
        component: AdminComponent,
        children: [       
          { path: 'cauhinh',
          canActivate:[AdminGuard],
          canActivateChild: [AdminGuard], 
          component: ConfigComponent },
          { path: 'transaction', component: TransactionComponent },
          { path: 'ngonngu', 
          canActivate:[AdminGuard],
          canActivateChild: [AdminGuard],
          loadChildren: () => import('./ngonngu/ngonngu.module').then(m => m.NgonnguModule) },
          { path: 'noidung',
          canActivate:[AdminGuard],
          canActivateChild: [AdminGuard], 
          loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
          { path: 'chart', 
          canActivate:[AdminGuard],
          canActivateChild: [AdminGuard],
          loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
          { path: 'femail', loadChildren: () => import('./femail/femail.module').then(m => m.FemailModule) },
          { path: 'caidat', 
          canActivate:[AdminGuard],
          canActivateChild: [AdminGuard],
          loadChildren: () => import('./caidat/caidat.module').then(m => m.CaidatModule) },
          { path: 'changepass', loadChildren: () => import('./changepass/changepass.module').then(m => m.ChangepassModule) }
          // { path: 'noidung', component: NoidungComponent }
        ],
      },
    ]),
  ],
  declarations: [AdminComponent, ConfigComponent, TransactionComponent,DangnhapComponent],
})
export class AdminModule {}
