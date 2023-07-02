import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.css']
})
export class HompageComponent implements OnInit {
  Config:any={}
  constructor(
    private _LocalStorageService:LocalStorageService,
  ) { }

  ngOnInit() {
    this.Config = this._LocalStorageService.getItem('config')?this._LocalStorageService.getItem('config'):{};
  }

}
