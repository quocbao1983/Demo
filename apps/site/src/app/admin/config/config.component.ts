import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/config.service';
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
  "Sellprice": "21000",
  "Buyprice": "19000",
  "SellFee": "10",
  "BuyFee": "5",
  "Mintrade": "5000000",
  "Maxtrade": "20000000",
  "Totaltrade": "5000000000"
}
  Config:any={}
  editableContent: string = '';
  constructor(
    private _LocalStorageService:LocalStorageService,
    private _NotifierService:NotifierService,
    private router: Router,
    private _ConfigService: ConfigService,
    
    ) { 
     
    }
  ngOnInit() {
    this._ConfigService.getAll().subscribe((data)=>
    {
      this.Config=data[0]
      console.log(data);  
    }
    );
  }
  LoadInit() {
    if(this.Config.length==0)
    {
      this._ConfigService.createConfig(this.ConfigInit).subscribe(data=>this._NotifierService.notify("success","Create Success"))
    }
    else
    {
     this._NotifierService.notify("success","Demo data has been loaded")
    }
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
    this._LocalStorageService.clear();
    this._NotifierService.notify("success","Xoá Thành Công")
    window.location.reload();
  }
}
