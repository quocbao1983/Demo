import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from '../../shared/local-storage.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  data:any[]=[]
  // displayedColumns: string[] = ['type', 'Trangthai', 'Phiban', 'Soluong', 'DVNhan', 'TK2KH', 'TK1KH', 'TK1Cty', 'Noidungban'];
  // displayedColumns: string[] = ['type', 'Trangthai', 'Phimua', 'Soluong', 'DVTra', 'TK1KH', 'Email', 'TK2Cty', 'Noidungmua'];
  displayedColumns: string[] = ['type', 'Trangthai','Field1', 'Field2', 'Field3', 'Noidung', 'Soluong', 'Phi',  'DV'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _LocalStorageService:LocalStorageService,
  ) {

    this.dataSource = new MatTableDataSource(this._LocalStorageService.getItem('trans'));
    console.log(this.dataSource.data);
    
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    data.Trangthai=!data.Trangthai;
  }
}
