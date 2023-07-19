import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../shared/config.service';
import { ExchangeService } from '../../shared/trans.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LangService } from '../../shared/lang.service';
import { LivechatService } from '../../shared/livechat.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from 'apps/site/src/environments/environment';
@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
      ]),
      
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
      ])
    ])
],
})
export class HompageComponent implements OnInit {
  Config:any={}
  isLoading: boolean = true;
  ListsExchange: any[] = []
  displayedColumns: string[] = ['Email', 'CreateAt'];
  lang:any={}
  ImgUrl = environment.ImgUrl;
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  dataSource!: MatTableDataSource<any>;
  SelectCoin:any={}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public _ConfigService: ConfigService,
    private _ExchangeService: ExchangeService,
    private _LivechatService: LivechatService,
    
  ) { }

  ngOnInit() {
    this._ConfigService.getAll().subscribe(data=>
      {
        if(data)
        {
        this.isLoading = false;
        this.Config = data[0]
        this.SelectCoin = this.Config.ListtypeCoin[0]
        }
      }
      )
      this._LivechatService.getlistExchange().subscribe((data) => {
        this.ListsExchange = data.sort((a:any, b:any) => new Date(b.Ngaytao).getTime()- new Date(a.Ngaytao).getTime()).slice(0,10)       
        this.ListsExchange.forEach(v => {
          v.Email = v.Email.replace(/(.)(.*)(.@)/, '$1***$3');
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;    
      });
  }
}
