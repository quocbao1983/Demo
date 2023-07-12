import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { ExchangeService } from '../../shared/trans.service';
import { AdminComponent } from '../admin.component';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  data:any[]=[]
  displayedColumns: string[] = ['Code','Type','QuantityIn','Fee','QuantityOut','TransHash','TransIdBank','CompanyAccount1', 'CompanyAccount2', 'CustomAccount1', 'CustomAccount2', 'Email', 'Content','Note','Status'];
   trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _ExchangeService: ExchangeService,
    private _NotifierService: NotifierService,
    private _AdminComponent: AdminComponent,
  ) {
    this._ExchangeService.getAll().subscribe(data=>
      {
        console.log(data);
        
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
  CloseDrawer()
  {
    this._AdminComponent.drawer.toggle();
  }
}
