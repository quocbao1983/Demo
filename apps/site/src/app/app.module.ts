import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database/';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './admin/auth/guards/admin.guard';
import { GuestGuard } from './admin/auth/guards/guest.guard';
import { DangnhapComponent } from './admin/dangnhap/dangnhap.component';
import { AuthService } from './admin/auth/auth.service';
import { UsersInterceptor } from './shared/users.interceptor';
import { AuthModule } from './admin/auth/auth.module';
import { AuthGuard } from './admin/auth/guards/auth.guard';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NotifierModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.FirebaseInit),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path: '', component: AppComponent,
        children: [
          { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
          { 
            path: 'admin', 
            canActivate:[AuthGuard],
           loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
           {
            path: 'dangnhap',
            canActivate: [GuestGuard],
            canActivateChild: [GuestGuard],
            component: DangnhapComponent,
          },
        ]
      },
    ], {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
    NotifierModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10,
        },
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50,
        },
        shift: {
          speed: 300,
          easing: 'ease',
        },
        overlap: 150,
      },
    },),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
