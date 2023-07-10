import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/config.service';
import { LangService } from '../../shared/lang.service';
import { AdminComponent } from '../admin.component';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  Config:any={}
  editableContent: string = '';
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  constructor(
    private _NotifierService:NotifierService,
    private router: Router,
    private _ConfigService: ConfigService,
    private _AdminComponent: AdminComponent,
    ) {}
  ngOnInit() {
    this._ConfigService.getAll().subscribe((data)=>
    {
      this.Config=data[0]
      console.log(data);  
    }
    );
  }
  onContentChange(event: any,field:any) {
    this.Config[field] = event.target.innerHTML;
  }
  Update(data:any)
  {
    this._ConfigService.updateConfig(data).subscribe(data=>this._NotifierService.notify("success","Update Success"))
  }
  ClearAll()
  {
    this._NotifierService.notify("success","Xoá Thành Công")
    window.location.reload();
  }
  GetTrans(trans:any[],value:any)
  {
    const result = trans.find((v:any)=>v.key_name==value)
    return result?result.translation_text:''
  }
  CloseDrawer()
  {
    this._AdminComponent.drawer.toggle();
  }

}
