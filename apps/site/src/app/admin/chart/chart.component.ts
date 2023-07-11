import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConfigService } from '../../shared/config.service';
import { AdminComponent } from '../admin.component';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
    const check = this.charts.find(v=>v.Ngay== this.datePipe.transform(data.Ngayformat, 'dd/MM/yyyy'))
     if(!check)
    {
      data.id = this.charts.length+1
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
  Selectchart(data:any)
  {    
    this.isEdit = true
    this.chart = data
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
    this.isEdit = false
  }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
}
