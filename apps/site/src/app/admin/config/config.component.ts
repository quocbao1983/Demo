import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/config.service';
import { LangService } from '../../shared/lang.service';
import { AdminComponent } from '../admin.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  Config:any={}
  Listtypecoin:any[]=[]
  Typecoin:any={}
  editableContent: string = '';
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  displayedColumns: string[] = ['Title','img'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _NotifierService:NotifierService,
    private router: Router,
    private _ConfigService: ConfigService,
    private _AdminComponent: AdminComponent,
    ) {}
  ngOnInit() {
    this._ConfigService.getAll().subscribe((data)=>
    {
      this.Config=data[0]
      console.log(data); 
      this.dataSource = new MatTableDataSource(this.Config.ListtypeCoin); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Change() {
    this._ConfigService.updateConfig(this.Config).subscribe(data=>this._NotifierService.notify("success","Update Success"))
  }
  AddCoin()
  {
    const check = this.Config.ListtypeCoin.find((v:any)=>v.Title== this.Typecoin.Title)
    if(!check)
    {
    this.Typecoin.id = this.Config.ListtypeCoin.length +1
    this.Config.ListtypeCoin.push(this.Typecoin)
    this._ConfigService.updateConfig(this.Config).subscribe(data=>this._NotifierService.notify("success","Update Success"))
    }
    else
    {
      this._NotifierService.notify("error","Đã tồn tại")
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onContentChange(event: any,field:any) {
    this.Config[field] = event.target.innerHTML;
  }
  Update(data:any)
  {
    this._ConfigService.updateConfig(data).subscribe(data=>this._NotifierService.notify("success","Update Success"))
  }
  ClearAll()
  {
    this._NotifierService.notify("success","Xoá Thành Công")
    window.location.reload();
  }
  CloseDrawer()
  {
    this._AdminComponent.drawer.toggle();
  }

}
