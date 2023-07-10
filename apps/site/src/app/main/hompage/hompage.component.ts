import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../shared/config.service';
import { ExchangeService } from '../../shared/trans.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-hompage',
  templateUrl: './hompage.component.html',
  styleUrls: ['./hompage.component.css']
})
export class HompageComponent implements OnInit {
  Config:any={}
  ListsExchange: any[] = []
  displayedColumns: string[] = ['Email', 'CreateAt'];
  lang:any={}
  trans:any[]=JSON.parse(localStorage.getItem('Translate') || '[]');
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public _ConfigService: ConfigService,
    private _ExchangeService: ExchangeService,
    private _LangService: LangService,
  ) { }

  ngOnInit() {
    // this._LangService.getAll().subscribe(data=>{
    // const merged = data[0].keys.map((obj1:any) => ({ ...obj1, ...data[0].translate.find((obj2:any) => obj2.key_id === obj1.key_id) }));
    //  this.trans = merged.filter((v:any)=>v.language_id==data[0].Type)  
    //  })
    this._ConfigService.getAll().subscribe(data=>this.Config = data[0])
    this._ExchangeService.getAll().subscribe(data=>
      {
        this.ListsExchange = data
        this.ListsExchange.forEach(v => {
          v.Email = v.Email.replace(/(?<=.).(?=[^@]*?@)/g, "*");
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }
  GetTrans(trans:any[],value:any)
  {
    const result = trans.find((v:any)=>v.key_name==value)
    return result?result.translation_text:''
  }

}
