import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConfigService } from '../../shared/config.service';
import { ExchangeService } from '../../shared/trans.service';
import { generateOrderId } from '../../shared/shared.utils';
import { TelegramService } from '../../shared/telegram.service';
import { LangService } from '../../shared/lang.service';
import { LivechatService } from '../../shared/livechat.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  SellData: any = {
    QuantityIn: '',
    QuantityOut: '',
    CustomAccount1: '',
    CustomAccount2: '',
    CompanyAccount1:'',
    CompanyAccount2:'',
    Email:'',
    Fee: '',
    TransIdBank:'',
    Type: 2,
    Status: 0
  }
  Config:any={}
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  ListNetwork:any[]=[
    {id:1,Title:"ETH",img:'assets/ETH.png'},
    {id:2,Title:"BSC",img:'assets/BSC.png'}
    ]
  Network:any={id:1,Title:"ETH",img:'assets/ETH.png'}
  constructor(
    private _snackBar: MatSnackBar,
    private _ExchangeService: ExchangeService,
    private _ConfigService: ConfigService,
    private _NotifierService: NotifierService,
    private _TelegramService: TelegramService,
    private _LivechatService: LivechatService,
    private router: Router
  ) { 
 
  }
  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
  ngOnInit() {
    this._ConfigService.getAll().subscribe(data => {
      this.Config = data[0]
      this.SellData.CompanyAccount2 = this.Config.CompanyAccount2
      this.SellData.CompanyAccount1 = this.Config.CompanyAccount1
    })
  }
  CreateSell(dulieu:any)
  {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (dulieu.QuantityIn=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Số Lượng")
    }
    else if (dulieu.CustomAccount2=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Địa Chỉ Ví")
    }
    else if (dulieu.Email=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Email")
    }
    else if (!emailPattern.test(dulieu.Email)) {
      this._NotifierService.notify("error", "Sai Định Dạng Email")
    }
    else if (dulieu.CustomAccount1=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Địa Chỉ Ví")
    }
    else if (dulieu.TransIdBank=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Mã Trans ID")
    }
    else
    {
    dulieu.Code = generateOrderId(11);
    dulieu.Network = this.Network;
    dulieu.CreateAt = new Date().getTime();
    this._LivechatService.addExchange(dulieu)
    this._ExchangeService.createExchange(dulieu).subscribe(data => 
      {
        const result = `Có 1 giao dịch BÁN mới Mã đơn hàng ${data.Code}`
        this._TelegramService.createTelegram(result).subscribe();
        this._NotifierService.notify("success", "Create Success")
          this.router.navigate(['transfer',data.id]);
        }
      )
    } 
  }
  OnChange()
  {   
    if(this.SellData.QuantityIn>this.Config.Maxtradesell||this.SellData.QuantityIn<this.Config.Mintradesell)
    {
      this._NotifierService.notify("error",(this.trans['sell_min_max_error']||'sell_min_max_error '+this.Config.Mintradesell+' - '+this.Config.Maxtradesell))
      this.SellData.QuantityIn = 0
    }
    else
    {
      this.SellData.Fee = (this.SellData.QuantityIn*this.Config.Sellprice*this.Config.SellFee/100).toFixed(2)
      this.SellData.QuantityOut = this.SellData.QuantityIn*this.Config.Sellprice - Number(this.SellData.Fee);
    }
    
  }


}
