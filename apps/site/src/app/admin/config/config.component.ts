import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/config.service';
import { LangService } from '../../shared/lang.service';
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
ConfigInit:any = {
    "Sellprice": "21000.00",
    "Buyprice": "8700.00",
    "SellFee": "10.00",
    "BuyFee": "20.00",
    "Mintrade": "5000000.00",
    "Maxtrade": "100000.00",
    "Totaltrade": "99999999.99",
    "Note": "",
    "Type": 1,
    "Ordering": 1,
    "Status": 0,
  }
// {
//   "id": "bec16d16-4f71-4399-b569-85a52e9a618c",
//   "Sellprice": "21000.00",
//   "Buyprice": "8700.00",
//   "SellFee": "10.00",
//   "BuyFee": "20.00",
//   "Mintrade": "5000000.00",
//   "Maxtrade": "100000.00",
//   "Totaltrade": "99999999.99",
//   "Note": "",
//   "Type": 1,
//   "Ordering": 1,
//   "Status": 0,
//   "CreateAt": "2023-07-05T15:05:54.228Z",
//   "idCreate": null
// }
  Config:any={}
  editableContent: string = '';
  trans:any[]=[]
  constructor(
    private _NotifierService:NotifierService,
    private router: Router,
    private _ConfigService: ConfigService,
    private _LangService: LangService,
    
    ) {}
  ngOnInit() {
    this._LangService.getAll().subscribe(data=>{
      const merged = data[0].keys.map((obj1:any) => ({ ...obj1, ...data[0].translate.find((obj2:any) => obj2.key_id === obj1.key_id) }));
       this.trans = merged.filter((v:any)=>v.language_id==data[0].Type)  
       }) 
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
    this._NotifierService.notify("success","Xoá Thành Công")
    window.location.reload();
  }
  GetTrans(trans:any[],value:any)
  {
    const result = trans.find((v:any)=>v.key_name==value)
    return result?result.translation_text:''
  }
}
