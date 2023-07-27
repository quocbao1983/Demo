import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../shared/users.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-caidat',
  templateUrl: './caidat.component.html',
  styleUrls: ['./caidat.component.css']
})
export class CaidatComponent implements OnInit {
  User:any={}
  Users:any[]=[]
  displayedColumns: string[] = ['Hoten', 'email', 'SDT','Role','Reset'];
  dataSource!: MatTableDataSource<any>;
  Role:any={admin:'admin',user:'user'}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private _UsersService:UsersService,
    private _NotifierService:NotifierService
  ) {
    this._UsersService.getUsers().subscribe(data=>
      {
        this.Users = data
        this.dataSource = new MatTableDataSource(data);
      })
   }

  ngOnInit() {

  }
  Dangky(User:any)
  {
    this._UsersService.Dangky(User).subscribe((data)=>
    {
    this.User={}
    this._NotifierService.notify('success','Add Thành Công')
    this.drawer.close();
    }
    );
  }
  Update(User:any)
  {
    this._UsersService.updateUser(User).subscribe((data)=>
    {
      this.User={}
      this._NotifierService.notify('success','Update Thành Công')
      this.drawer.close();
      }
    );
  }
  SetRole(data:any,item:any)
  {
    data.Role = item.value
    this._UsersService.updateUser(data).subscribe((data)=>
    {
      this.User={}
      this._NotifierService.notify('success','Update Thành Công')
      this.drawer.close();
      }
    );
  }
  RandomPass(data:any)
  {
    const index = this.Users.findIndex(v=>v.id==data.id)
    console.log(index);
    
    this._UsersService.Randompass(data).subscribe((data)=>{
      this.Users[index].Randompass =data[1]
      this._NotifierService.show({
        message: 'Password Mới : '+data[1],
        type: 'success',
      });
    });
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
}
