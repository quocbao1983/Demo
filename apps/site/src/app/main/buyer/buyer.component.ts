import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExchangeService } from '../../shared/trans.service';
import { ConfigService } from '../../shared/config.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { generateOrderId } from '../../shared/shared.utils';
import { TelegramService } from '../../shared/telegram.service';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  BuyData: any = {
     QuantityIn: '',
     QuantityOut: '',
    // CompanyAccount1: string,
    // CompanyAccount2: string,
     CustomAccount1: '',
    // CustomAccount2: string,
    // Content: string,
     Email:'',
     Fee: '',
     TransHash:'',
    // Note: string,
    Type: 1,
    Status: 0
  }
  trans:any[]=JSON.parse(localStorage.getItem('Translate') || '[]');
  ListNetwork:any[]=[
  {id:1,Title:"ETH",img:'assets/ETH.png'},
  {id:2,Title:"BSC",img:'assets/BSC.png'}
  ]
  Network:any={id:1,Title:"ETH",img:'assets/ETH.png'}
  CUrl:any
  Config: any = {}
  constructor(

    private _snackBar: MatSnackBar,
    private _ExchangeService: ExchangeService,
    private _ConfigService: ConfigService,
    private _NotifierService: NotifierService,
    private _TelegramService: TelegramService,
    private _LangService: LangService,
    private router: Router
  ) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
  ngOnInit() {
    // this._LangService.getAll().subscribe(data=>{
    //   const merged = data[0].keys.map((obj1:any) => ({ ...obj1, ...data[0].translate.find((obj2:any) => obj2.key_id === obj1.key_id) }));
    //    this.trans = merged.filter((v:any)=>v.language_id==data[0].Type)  
    //    }) 
    this._ConfigService.getAll().subscribe(data => {
      this.Config = data[0]
      console.log(this.Config);
      this.BuyData.Fee = this.Config.BuyFee
      }
    )
  }
  CreateBuy(dulieu: any) {   
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (dulieu.QuantityIn=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Số Lượng")
    }
    else if (dulieu.CustomAccount1=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Tài Khoản")
    }
    else if (dulieu.Email=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Email")
    }
    else if (!emailPattern.test(dulieu.Email)) {
      this._NotifierService.notify("error", "Sai Định Dạng Email")
    }
    else if (dulieu.TransHash=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Mã HASH")
    }
    else
    {
    dulieu.Code = generateOrderId(11);
    dulieu.Network = this.Network;
    this._ExchangeService.createExchange(dulieu).subscribe(data => 
      {
        const result = `Có 1 giao dịch MUA mới Mã đơn  ${data.Code}`
        this._TelegramService.createTelegram(result).subscribe();
        this._NotifierService.notify("success", "Create Success")
          this.router.navigate(['transfer',data.id]);
        }
      )
    }
  }
  OnChange() {
    this.BuyData.QuantityOut = (this.BuyData.QuantityIn * this.Config.Buyprice*(1 + (this.BuyData.Fee / 100))).toFixed();
  }
  GetTrans(trans:any[],value:any)
  {
    const result = trans.find((v:any)=>v.key_name==value)
    return result?result.translation_text:''
  }

}
