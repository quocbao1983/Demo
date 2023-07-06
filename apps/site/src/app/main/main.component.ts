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
  langselect:any = 'en';
  ListLang:any={
    en:'English',
    zh:'China',
    ko:'South Korea',
    ru:'Russia',
    fr:'France',
  }
  ListImg:any={
    en:'assets/flag/en.png',
    zh:'assets/flag/zh.png',
    ko:'assets/flag/ko.png',
    ru:'assets/flag/ru.png',
    fr:'assets/flag/fr.png',
  }
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  displayedColumns: string[] = ['Email', 'CreateAt'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    public translate: TranslateService,
    public _ConfigService: ConfigService,
    private _ExchangeService: ExchangeService,
  ) {
    translate.addLangs(['en','zh','ko','ru','fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();  
  }
  ChangeLang(event:any)
  {
    this.translate.use(event)
  }
  ngOnInit(): void {
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
    // this._RedirectService.getAll().subscribe((data)=>{
    //   console.log(data);
    //   this.FilterLists = this.Lists = data
    // })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.Lists = this.Lists.filter((v) => {
     return  v.Hoten.toLowerCase().includes(value)||v.SDT.toLowerCase().includes(value)
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
}