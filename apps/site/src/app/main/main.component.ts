import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { ExchangeService } from '../shared/trans.service';
import { ConfigService } from '../shared/config.service';
import { LangService } from '../shared/lang.service';
import { stringify } from 'querystring';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  Detail: any = {};
  Config: any = {};
  ListsExchange: any[] = []
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  langselect: any =  { id: 1, code: "en",img: 'assets/flag/en.png', name: "English" };
  ListLang: any[] = [
    { id: 0, code: "vi",img: 'assets/flag/vi.png', name: "Vietnamese" },
    { id: 1, code: "en",img: 'assets/flag/en.png', name: "English" },
    { id: 2, code: "zh",img: 'assets/flag/zh.png', name: "China" },
    { id: 3, code: "ko",img: 'assets/flag/ko.png', name: "South Korea" },
    { id: 4, code: "ru",img: 'assets/flag/ru.png', name: "Russia" },
    { id: 5, code: "fr",img: 'assets/flag/fr.png', name: "France" }
  ]
  langInit:any={}
  isshowLive:boolean=true;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  displayedColumns: string[] = ['Email', 'CreateAt'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    public translate: TranslateService,
    public _ConfigService: ConfigService,
    private _ExchangeService: ExchangeService,
    private _LangService: LangService,
  ) {
  }
  ngOnInit(): void {
    this._LangService.getAll().subscribe(()=>
      {
        this._LangService.langs$.subscribe(data=>
          {
            this.langInit = data[0]
            this.langselect = this.ListLang.find(v=>v.id==data[0].Type)
            const result = data[0].translate.reduce((acc:any, obj:any) => {
              if (obj[this.langselect.code]) {
                acc[obj.key_name] = obj[this.langselect.code];
              }
              return acc;
            }, {});    
            localStorage.setItem('Translate', JSON.stringify(result)); 
          })
      }
    )
    this._ConfigService.getAll().subscribe(data => this.Config = data[0])
    this._ExchangeService.getAll().subscribe(data => {
      this.ListsExchange = data
      this.ListsExchange.forEach(v => {
        v.Email = v.Email.replace(/(?<=.).(?=[^@]*?@)/g, "*");
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.Lists = this.Lists.filter((v) => {
        return v.Hoten.toLowerCase().includes(value) || v.SDT.toLowerCase().includes(value)
      }
      )
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result) {
      //   this._RedirectService.createRedirect(this.Detail).subscribe((data)=>this._Notification.notify('success','Thêm mới thành công'))
      // }
    });
  }
  UpdateLang(data:any)
  {
    this.langInit.Type = data.id   
    this._LangService.updateLang(this.langInit,data.code).subscribe((data)=>
    { 
      console.log(data);
      window.location.reload()
    }
    )
  }
}