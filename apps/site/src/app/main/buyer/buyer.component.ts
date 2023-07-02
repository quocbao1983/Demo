import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  BuyData:any={type:2,Trangthai:0}
  Config:any={}
  Trans:any[]=[]
  constructor(
    private _LocalStorageService:LocalStorageService,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string,action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
  ngOnInit() {
    this.Config = this._LocalStorageService.getItem('config')
    this.Trans = this._LocalStorageService.getItem('trans')||[]
    this.BuyData.Phimua = this.Config.Phimua
  }
  CreateBuy(data:any)
  {
      this.Trans.push(data)
      this._LocalStorageService.setItem('trans',this.Trans)
  }
  OnChangeSL()
  {   
    this.BuyData.DVTra = (this.BuyData.Soluong * (1 - (this.BuyData.Phimua / 100))).toFixed();
  }

}
