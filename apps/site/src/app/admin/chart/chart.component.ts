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
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  Config: any = {}
  chart: any = {}
  charts: any[] = []
  displayedColumns: string[] = ['Ngay', 'Buy', 'Sell'];
  dataSource!: MatTableDataSource<any>;
  isEdit: boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _NotifierService: NotifierService,
    private router: Router,
    private _ConfigService: ConfigService,
    private _AdminComponent: AdminComponent,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit() {
    this._ConfigService.getAll().subscribe((data) => {
      this.Config = data[0];
      this.charts = data[0].Chart
      this.charts = this.charts.sort((a,b)=> new Date(b.Ngayformat).getTime() - new Date(a.Ngayformat).getTime())
      this.dataSource = new MatTableDataSource(this.charts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
      console.log(this.charts);
    });
  }
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(jsonData);
      jsonData.forEach((v:any,k:any) => {
        setTimeout(() => {
          const convertedDate = v.Ngay.replace(/_/g, "/")
          v.Ngayformat = new Date(convertedDate)
          this.AddChart(v)
          console.log(v);
        }, 100*k);
      });
      console.log(jsonData);
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      {id:'TeXqj8Q2', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
      {id:'TeXqj8Q3', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
    ]);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'data');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
  CloseDrawer() {
    this._AdminComponent.drawer.toggle();
  }
  AddChart(data: any) {
    const check = this.charts.find(v => v.Ngay == this.datePipe.transform(data.Ngayformat, 'dd/MM/yyyy'))
    if (data.Ngayformat == undefined) {
      this._NotifierService.notify("error", "Vui lòng Choosen")
    }
    else if (!check) {
      data.id = genID(8)
      data.Ngay = this.datePipe.transform(data.Ngayformat, 'dd/MM/yyyy');
      this.charts.push(data)
      this.Config.Chart = this.charts
      this._ConfigService.updateConfig(this.Config).subscribe(() => {
        this.dataSource = new MatTableDataSource(this.Config.Chart);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this._NotifierService.notify("success", "Add Thành Công")
        this.chart = {}
      })
    }
    else { this._NotifierService.notify("error", "Đã tồn tại ngày") }
  }
  Updatechart() {
    this.chart.Ngay = this.datePipe.transform(this.chart.Ngayformat, 'dd/MM/yyyy');
    this.Config.Chart = this.charts
    this._ConfigService.updateConfig(this.Config).subscribe(() => {
      this.dataSource = new MatTableDataSource(this.Config.Chart);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._NotifierService.notify("success", "Update thành công")
      this.chart = {}
    })
  }
  Deletechart() {
    this.Config.Chart = this.Config.Chart.filter((v: any) => v.id != this.chart.id)
    this._ConfigService.updateConfig(this.Config).subscribe(() => {
      this.dataSource = new MatTableDataSource(this.Config.Chart);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._NotifierService.notify("success", "Xóa thành công")
      this.chart = {}
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
