import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConfigService } from '../../shared/config.service';
import { ExchangeService } from '../../shared/trans.service';
import { generateOrderId } from '../../shared/shared.utils';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  SellData: any = {
    QuantityIn: 0,
    QuantityOut: 0,
    // CompanyAccount1: string,
    // CompanyAccount2: string,
    // CustomAccount1: string,
    // CustomAccount2: string,
    // Content: string,
    // Email
    Fee: 0,
    // Note: string,
    Type: 2,
    Status: 0
  }
  Config:any={}
  Trans:any[]=[]
  constructor(
    private _LocalStorageService:LocalStorageService,
    private _snackBar: MatSnackBar,
    private _ExchangeService: ExchangeService,
    private _ConfigService: ConfigService,
    private _NotifierService: NotifierService,
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
      console.log(this.Config);
      this.SellData.Fee = this.Config.SellFee
    })
  }
  CreateSell(data:any)
  {
    data.Code = generateOrderId(11);
    this._ExchangeService.createExchange(data).subscribe(data => 
      {
        this._NotifierService.notify("success", "Create Success")
          this.router.navigate(['transfer',data.id]);
        }
      )
  }
  OnChange()
  {   
    this.SellData.QuantityOut = (this.SellData.QuantityIn *this.Config.Sellprice*(1 - (this.SellData.Fee / 100))).toFixed();
  }

}
