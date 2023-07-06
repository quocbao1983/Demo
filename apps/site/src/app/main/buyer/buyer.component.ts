import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExchangeService } from '../../shared/trans.service';
import { ConfigService } from '../../shared/config.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  BuyData:any={Type:1,Status:0}
  Config:any={}
  constructor(
    private _LocalStorageService:LocalStorageService,
    private _snackBar: MatSnackBar,
    private _ExchangeService: ExchangeService,
    private _ConfigService: ConfigService,
    private _NotifierService: NotifierService,
  ) {}
  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
  ngOnInit() {
    this._ConfigService.getAll().subscribe(data=>this.Config = data[0])
    this.BuyData.Fee = this.Config.BuyFee
    // {
    // QuantityIn: number,
    // QuantityOut: number,
    // CompanyAccount1: string,
    // CompanyAccount2: string,
    // CustomAccount1: string,
    // CustomAccount2: string,
    // Content: string,
    // Email
    // Fee: number,
    // Note: string,
    // Type: number,
    // }
  }
  CreateBuy(data:any)
  {
    data.Type = 1
    this._ExchangeService.createExchange(data).subscribe(data=>this._NotifierService.notify("success","Create Success"))
  }
  OnChange()
  {   
    this.BuyData.QuantityOut = (this.BuyData.QuantityIn * (1 - (this.BuyData.Fee / 100))).toFixed();
  }

}
