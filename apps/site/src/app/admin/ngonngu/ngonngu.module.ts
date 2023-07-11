import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgonnguComponent } from './ngonngu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EditorModule,
    RouterModule.forChild([
      { path: '', component: NgonnguComponent },
    ])
  ],
  declarations: [NgonnguComponent]
})
export class NgonnguModule { }
