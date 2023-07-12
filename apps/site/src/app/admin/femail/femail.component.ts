import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConfigService } from '../../shared/config.service';
import { AdminComponent } from '../admin.component';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { genID } from '../../shared/shared.utils';
import { LivechatService } from '../../shared/livechat.service';

@Component({
  selector: 'app-femail',
  templateUrl: './femail.component.html',
  styleUrls: ['./femail.component.css']
})
export class FemailComponent implements OnInit {
  Config:any={}
  femail:any=  {}

  femails:any[]=[]
  displayedColumns: string[] = ['Email', 'CreateAt'];
  dataSource!: MatTableDataSource<any>;
  isEdit:boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _NotifierService:NotifierService,
    private router: Router,
    private _LivechatService: LivechatService,
    private _AdminComponent: AdminComponent,
    ) {}
  ngOnInit() {
    this._LivechatService.getlistExchange().subscribe((data) => {
      console.log(data);
      this.femails = data
      this.dataSource = new MatTableDataSource(this.femails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    });
  }
  CloseDrawer()
  {
    this._AdminComponent.drawer.toggle();
  }
  AddFemail(data:any)
  {
    if(data.Email=='')
    {
      this._NotifierService.notify("error","Vui lòng Nhập Email")
    }
    else
    {
      data.id = genID(8)
      data.CreateAt = new Date().getTime();
      this._LivechatService.addExchange(data)
      this.ngOnInit();
      this._NotifierService.notify("success","Thêm Thành Công")
    }
  }
  // Updatefemail()
  // {
  //   this.Config.Femail = this.femails      
  //   this._ConfigService.updateConfig(this.Config).subscribe(()=>
  //   {
  //     this.dataSource = new MatTableDataSource(this.Config.Femail);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this._NotifierService.notify("success","Cập nhật thành công")
  //     this.femail={}
  //   })
  // }
  // Deletefemail()
  // {
  //   this.Config.Femail = this.Config.Femail.filter((v:any)=>v.id!=this.femail.id)   
  //   this._ConfigService.updateConfig(this.Config).subscribe(()=>
  //   {
  //     this.dataSource = new MatTableDataSource(this.Config.Femail);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this._NotifierService.notify("success","Xóa thành công")
  //     this.femail={}
  //   })
  // }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
}

