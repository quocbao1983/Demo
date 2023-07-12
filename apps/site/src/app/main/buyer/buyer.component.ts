import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExchangeService } from '../../shared/trans.service';
import { ConfigService } from '../../shared/config.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { generateOrderId } from '../../shared/shared.utils';
import { TelegramService } from '../../shared/telegram.service';
import { LangService } from '../../shared/lang.service';
import { LivechatService } from '../../shared/livechat.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  BuyData: any = {
    QuantityIn: '',
    QuantityOut: '',
    CompanyAccount2: '',
    CustomAccount1: '',
    Email:'',
    Fee: '',
    TransHash:'',
    Type: 1,
    Status: 0
  }
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
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
    private _LivechatService: LivechatService,
    private router: Router
  ) { }
  openSnackBar(message: string, action: string) {
    if(message)
    {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
    }
    else    {
      this._snackBar.open('empty!!!', '', {
        duration: 1000,
      });
      }
  }
  ngOnInit() {
    this._ConfigService.getAll().subscribe(data => {
      this.Config = data[0]
      this.BuyData.CompanyAccount2 = this.Config.CompanyAccount2
      this.BuyData.CompanyAccount1 = this.Config.CompanyAccount1
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
    dulieu.CreateAt = new Date().getTime();
    this._LivechatService.addExchange(dulieu)
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
    if(this.BuyData.QuantityIn<this.Config.Mintrade||this.BuyData.QuantityIn>this.Config.Maxtrade)
    {
      this.BuyData.QuantityIn = 0
      this._NotifierService.notify("error",(this.trans['buy_min_max_error']||'buy_min_max_error '+this.Config.Mintrade+' - '+this.Config.Maxtrade))
    }
    else
    {
    this.BuyData.Fee = (this.BuyData.QuantityIn*this.Config.Buyprice* this.Config.BuyFee/100).toFixed(2)
    console.log(this.BuyData.QuantityIn);
    console.log(this.Config.Buyprice);
    console.log(this.Config.BuyFee);
    
    this.BuyData.QuantityOut = this.BuyData.QuantityIn * this.Config.Buyprice + Number(this.BuyData.Fee);
    }
  }
}
