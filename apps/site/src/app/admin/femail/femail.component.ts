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
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-femail',
  templateUrl: './femail.component.html',
  styleUrls: ['./femail.component.css']
})
export class FemailComponent implements OnInit {
  Config:any={}
  femail:any=  {Email:''}
  femails:any[]=[]
  displayedColumns: string[] = ['Email', 'CreateAt'];
  dataSource!: MatTableDataSource<any>;
  isEdit:boolean = false
  TimeSpace:number = 60;//phút
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
      this.femails = data.sort((a, b) => b.Ngaytao-a.Ngaytao);
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
      this._NotifierService.notify("error","Please enter Email")
    }
    else
    {
      data.id = genID(8)
      data.Ngaytao = new Date().getTime();
      this._LivechatService.addExchange(data)
      this.ngOnInit();
      this._NotifierService.notify("success","Add Success")
    }
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
            this.AddFemail(v)
          }, this.TimeSpace*1000*k); //1000milis
        });
      };
      fileReader.readAsArrayBuffer(file);
    }
  
    writeExcelFile() {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
        {Email: 'test1@gmail.com'},
        {Email: 'test2@gmail.com'}
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
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
}

