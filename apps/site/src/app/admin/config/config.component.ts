import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { ConfigService } from '../../shared/config.service';
import { LangService } from '../../shared/lang.service';
import { AdminComponent } from '../admin.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { genID } from '../../shared/shared.utils';
import { environment } from 'apps/site/src/environments/environment';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  Config:any={Brand:{Title:'',Img:{spath:''}}}
  ImgUrl = environment.ImgUrl
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
      if(data)
      {
        console.log(data);
        
      this.Config=data[0]
      this.dataSource = new MatTableDataSource(this.Config.ListtypeCoin); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
    });
  }
  CheckValue(data:any,field:any)
  {
    const result = data[field] !== null && typeof data[field] === 'object'&&Object.keys(data[field]).length!==0;   
    return result
  }
  Change() {
    this._ConfigService.updateConfig(this.Config).subscribe(data=>this._NotifierService.notify("success","Update Success"))
  }
  onSelect(event: any) {
    this._ConfigService.uploadDriver(event.addedFiles[0]).subscribe((data)=>
    {
      this.Config.Brand.Img= data
     this._ConfigService.updateConfig(this.Config).subscribe(() => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
    }
    )
  }
  onRemove(data:any) {
    this._ConfigService.DeleteuploadDriver(data).subscribe(()=>
    {
      this.Config.Brand.Img = {}
     this._ConfigService.updateConfig(this.Config).subscribe(() => this._NotifierService.notify("success", "Cập Nhật Thành Công"));
    })  
  }
  AddCoin()
  {

    const check = this.Config.ListtypeCoin.find((v:any)=>v.Title== this.Typecoin.Title)
    if(!check)
    {
    this.Typecoin.id = genID(8)
    this.Config.ListtypeCoin.push(this.Typecoin)
    this._ConfigService.updateConfig(this.Config).subscribe(()=>{
        this.Typecoin={}
        this._NotifierService.notify("success","Update Success")
        this.dataSource = new MatTableDataSource(this.Config.ListtypeCoin); 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    else
    {
      this._NotifierService.notify("error","Đã tồn tại")
    }
  }
  UpdateCoin()
  {
    const hashMap = new Map(this.Config.ListtypeCoin.map((obj:any) => [obj.id, obj]));
    this.Config.ListtypeCoin = Array.from(hashMap.values());    
    this._ConfigService.updateConfig(this.Config).subscribe(()=>
    {
      this._NotifierService.notify("success","Update Success")
      this.Typecoin={}
      this.dataSource = new MatTableDataSource(this.Config.ListtypeCoin); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  DeleteCoin()
  {
    this.Config.ListtypeCoin = this.Config.ListtypeCoin.filter((v:any)=>v.id!==this.Typecoin.id)
    this._ConfigService.updateConfig(this.Config).subscribe(()=>
    {
      this._NotifierService.notify("success","Delete Success")
      this.Typecoin={}
      this.dataSource = new MatTableDataSource(this.Config.ListtypeCoin); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
