import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  TransInit:any[]=[
    {
        "type": 1,
        "Trangthai": 0,
        "Phiban": "10",
        "Soluong": 50000000,
        "DVNhan": "45000000",
        "TK2KH": "123456",
        "TK1KH": "654321",
        "TK1Cty": "789456",
        "Noidungban": "Bán"
    },
    {
        "type": 2,
        "Trangthai": 0,
        "Phimua": "5",
        "Soluong": 10000000,
        "DVTra": "9500000",
        "TK1KH": "147258",
        "Email": "abc@gmail.com",
        "TK2Cty": "654321",
        "Noidungmua": "Mua"
    }
]
ConfigInit:any ={
  "Giaban": "21000",
  "Giamua": "19000",
  "Phiban": "10",
  "Phimua": "5",
  "MinGD": "5000000",
  "MaxGD": "20000000",
  "TongGD": "5000000000"
}
  Config:any={}
  editableContent: string = '';
  constructor(
    private _LocalStorageService:LocalStorageService,
    private _NotifierService:NotifierService,
    private router: Router
    ) { 
     
    }
  ngOnInit() {
    this.Config = this._LocalStorageService.getItem('config')?this._LocalStorageService.getItem('config'):{};
  }
  LoadInit() {
    this._LocalStorageService.setItem('config', this.ConfigInit)
    this._LocalStorageService.setItem('trans', this.TransInit)
    this._NotifierService.notify("success","Nhập Thành Công")
    window.location.reload();
  }
  onContentChange(event: any,field:any) {
    this.Config[field] = event.target.innerHTML;
  }
  Update(data:any)
  {
    this._LocalStorageService.setItem('config', data)
    this._NotifierService.notify("success","Cập Nhật Thành Công")
    window.location.reload();
  }
  ClearAll()
  {
    this._LocalStorageService.clear();
    this._NotifierService.notify("success","Xoá Thành Công")
    window.location.reload();
  }
}
