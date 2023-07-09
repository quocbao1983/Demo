import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { UsersComponent } from './users.component';
import { UsersDetailResolver, UsersResolver } from './users.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        resolve:{
          tasks:UsersResolver
        },
      },
    ]),],
})
export class UsersModule {}
