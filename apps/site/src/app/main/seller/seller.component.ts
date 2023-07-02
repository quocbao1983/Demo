import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  SellData:any={type:1,Trangthai:0}
  Config:any={}
  Trans:any[]=[]
  constructor(
    private _LocalStorageService:LocalStorageService,
    private _snackBar: MatSnackBar
  ) { 
 
  }
  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
  ngOnInit() {
    this.Config = this._LocalStorageService.getItem('config')
    this.Trans = this._LocalStorageService.getItem('trans')||[]
    this.SellData.Phiban = this.Config.Phiban

  }
  CreateSell(data:any)
  {
    this.Trans.push(data)
    this._LocalStorageService.setItem('trans',this.Trans)
  }
  OnChangeSL()
  {   
    this.SellData.DVNhan = (this.SellData.Soluong * (1 - (this.SellData.Phiban / 100))).toFixed();
  }

}
