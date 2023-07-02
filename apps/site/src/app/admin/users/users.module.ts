import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { UsersComponent } from './users.component';
import { UsersDetailResolver, UsersResolver } from './users.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        resolve:{
          tasks:UsersResolver
        },
        children: [
          {
            path: '',
            component: ListComponent,
            children:[
              {
                path: 'user/:id',
                component: DetailComponent,
                resolve:{
                  task:UsersDetailResolver
                },
              },
              // {
              //   path: 'cauhinh',
              //   loadChildren:()=>import('@tazagroup/shared').then(m=>m.CauhinhModule)
              // },
              // {
              //   path: 'phanquyen/:id',
              //   loadChildren:()=>import('@tazagroup/shared').then(m=>m.PhanquyenModule)
              // },
            ]
          },

        ],
      },
    ]),],
})
export class UsersModule {}
