
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ContentService } from '../../../shared/content.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from 'apps/site/src/environments/environment';
import { ConfigService } from '../../../shared/config.service';
@Component({
  selector: 'app-detailcontent',
  templateUrl: './detailcontent.component.html',
  styleUrls: ['./detailcontent.component.css']
})
export class DetailcontentComponent implements OnInit {
  Detail: any={Title:''}
  APITINYMCE=environment.APITINYMCE
  ImgUrl = environment.ImgUrl
  configTiny: EditorComponent['init'] = {
    menubar: false,
    toolbar_mode: 'sliding',
    branding: false,
    image_advtab: true,
    autoresize_bottom_margin: 20,
    autoresize_min_height: 50,
    height: "500",
    deprecation_warnings: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
      'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help'
    ],
    toolbar: 'undo redo |fontfamily fontsize blocks | bold italic underline | alignleft aligncenter alignright alignjustify | fullscreen preview code | link image media',
    default_link_target: '_blank',
    block_unsupported_drop: true,
    entity_encoding: 'raw',
    images_upload_handler: (blobInfo: any) => {
      const file = blobInfo.blob();
      const promise = new Promise<string>((resolve, reject) => {
        this._ConfigService.uploadDriver(file).subscribe((res) => {
          if (res) {
            resolve(this.ImgUrl+res.spath);
          }
        });
      });
      return promise;
    },
  };
  constructor(
    private route: ActivatedRoute,
    private _ContentService: ContentService,
    private _NotifierService: NotifierService,
    private _ConfigService: ConfigService,
    // private _ContentComponent: ContentComponent
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((paramsId) => {
      const id = paramsId['id'];
      console.log(id);
      if (id) {
        // this._ContentComponent.drawer.open();
        this._ContentService.getByid(id).subscribe((data)=>console.log(data));
        this._ContentService.content$.subscribe((res) => {
          if (res) {
            this.Detail = res;
          }
        });
      }
    });
  }
  CloseDrawer()
  {
    // this._ContentComponent.drawer.close();
  }
  UpdateContent(data:any)
  {
    this._ContentService.updateContent(data).subscribe(()=>this._NotifierService.notify("success","Cập Nhật Thành Công"))    
  }
}










