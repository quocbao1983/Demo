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

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  Config:any={}
  chart:any={}
  charts:any[]=[]
  displayedColumns: string[] = ['Ngay', 'Buy', 'Sell'];
  dataSource!: MatTableDataSource<any>;
  isEdit:boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _NotifierService:NotifierService,
    private router: Router,
    private _ConfigService: ConfigService,
    private _AdminComponent: AdminComponent,
    private datePipe: DatePipe
    ) {
    
    }
    
  ngOnInit() {
    this._ConfigService.getAll().subscribe((data)=>
    {
      this.Config = data[0];
      this.charts=data[0].Chart
      this.dataSource = new MatTableDataSource(this.charts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);  
    });
  }
  CloseDrawer()
  {
    this._AdminComponent.drawer.toggle();
  }
  AddChart(data:any)
  {
    console.log(data.Ngayformat);
    
    const check = this.charts.find(v=>v.Ngay== this.datePipe.transform(data.Ngayformat, 'dd/MM/yyyy'))
    if(data.Ngayformat==undefined)
    {
      this._NotifierService.notify("error","Vui lòng Chọn Ngày")
    }
    else if(!check)
    {

      data.id = genID(8)
      data.Ngay = this.datePipe.transform(data.Ngayformat, 'dd/MM/yyyy');
      this.charts.push(data)
      this.Config.Chart = this.charts      
      this._ConfigService.updateConfig(this.Config).subscribe(()=>
      {
        this.dataSource = new MatTableDataSource(this.Config.Chart);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this._NotifierService.notify("success","Thêm Thành Công")
        this.chart={}
      })
    }
    else {this._NotifierService.notify("error","Đã tồn tại ngày")}
  }
  Updatechart()
  {
    this.chart.Ngay = this.datePipe.transform(this.chart.Ngayformat, 'dd/MM/yyyy');
    this.Config.Chart = this.charts      
    this._ConfigService.updateConfig(this.Config).subscribe(()=>
    {
      this.dataSource = new MatTableDataSource(this.Config.Chart);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._NotifierService.notify("success","Cập nhật thành công")
      this.chart={}
    })
  }
  Deletechart()
  {
    this.Config.Chart = this.Config.Chart.filter((v:any)=>v.id!=this.chart.id)   
    this._ConfigService.updateConfig(this.Config).subscribe(()=>
    {
      this.dataSource = new MatTableDataSource(this.Config.Chart);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._NotifierService.notify("success","Xóa thành công")
      this.chart={}
    })
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
}
