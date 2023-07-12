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
  ListsExchange: any[] = []
  displayedColumns: string[] = ['Email', 'CreateAt'];
  lang:any={}
  ImgUrl = environment.ImgUrl;
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  dataSource!: MatTableDataSource<any>;
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
        this.Config = data[0]
      }
      )
      this._LivechatService.getlistExchange().subscribe((data) => {
        this.ListsExchange = data.sort((a, b) => b.CreateAt-a.CreateAt).slice(0,10)
        this.ListsExchange.forEach(v => {
          v.Email = v.Email.replace(/(?<=.).(?=[^@]*?@)/g, "*");
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;    
      });
  }
  // GetTrans(trans:any,value:any)
  // {
  //   const result = trans.find((v:any)=>v.key_name==value)
  //   return result?result.translation_text:''
  // }

}
