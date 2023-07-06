import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from '../../shared/local-storage.service';
import { NotifierService } from 'angular-notifier';
import { ExchangeService } from '../../shared/trans.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  data:any[]=[]
  displayedColumns: string[] = ['Type','QuantityIn','Fee','QuantityOut','CompanyAccount1', 'CompanyAccount2', 'CustomAccount1', 'CustomAccount2', 'Email', 'Content','Note','Status'];

//   Data:any = {
//     QuantityIn: "0",
//     QuantityOut: "0",
//     CompanyAccount1: "",
//     CompanyAccount2: "",
//     CustomAccount1: "",
//     CustomAccount2: "",
//     Email: "",
//     Content: "",
//     Fee: "0",
//     Note: "",
//     Type: 0,
//     Status: 0,
// }

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _LocalStorageService:LocalStorageService,
    private _ExchangeService: ExchangeService,
    private _NotifierService: NotifierService,
  ) {
    this._ExchangeService.getAll().subscribe(data=>
      {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

    
  }
  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  UpdateTT(data:any)
  {
    data.Status=!data.Status;
    this._ExchangeService.updateExchange(data).subscribe(data=>this._NotifierService.notify("success", "Update Success"))
  }
}
