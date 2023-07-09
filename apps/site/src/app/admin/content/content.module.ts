import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { DetailcontentComponent } from './detailcontent/detailcontent.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EditorModule,
    RouterModule.forChild([
      { path: '', component: ContentComponent },
      { path: ':id', component: DetailcontentComponent }
    ])
  ],
  declarations: [ContentComponent,DetailcontentComponent]
})
export class ContentModule { }
