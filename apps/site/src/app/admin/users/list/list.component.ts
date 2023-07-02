import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { usertest } from '../user.type';

@Component({
  selector: 'tazagroup-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  User: any = {};
  Users: any[] = [];
  ws: any;
  FScreen: boolean = false;
  columnNames1 = Object.keys(usertest[0]);
  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  private _usertest: any[] = usertest;
  columnNames: string[] = ['avatar', 'Hoten','Trangthai','Status','Role'];
  colTieude: any = {
    avatar: 'Avatar',
    Hoten: 'Họ Tên',
    Role: 'Quyền',
    Status: 'Status',
    Trangthai: 'Status',
  };
  dataSource!: MatTableDataSource<any>;
  nhanvienform: any[] = [
    {
      id: 1,
      Tieude: 'Họ Và Tên',
      icon: 'account_circle',
      type: 'text',
      width: '1/2',
    },
    {
      id: 2,
      Tieude: 'Số Điện Thoại',
      icon: 'search',
      type: 'text',
      width: '1/2',
    },
    { id: 3, Tieude: 'Email', icon: 'search', type: 'text', width: '1/2' },
    { id: 4, Tieude: 'Role', icon: 'search', type: 'text', width: '1/2' },
    {
      id: 5,
      Tieude: 'Mã Nhân Viên',
      icon: 'search',
      type: 'text',
      width: '1/2',
    },
    { id: 6, Tieude: 'Ngày Sinh', icon: 'search', type: 'text', width: '1/2' },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _usersService: UsersService,
    private dialog: MatDialog
  ) {
    this._usersService.users$.subscribe((data) => {
      this.Users = data;
      this.dataSource = new MatTableDataSource(this.Users);
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
  ngOnInit(): void {}
  OpenDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
  CreateUser(user: User) {
    this._usersService.Dangky(user).subscribe((data) => {
      console.log(data);
    });
  }
  Caphnhatall() {
    this.Users.forEach((v) => {
      v.Hoten = this._usertest.find((v1) => v1.email == v.email).Hoten;
      this._usersService.updateUser(v).subscribe();
      console.log(v);
    });
  }
  StatusUser(data:User)
  {
    data.Status =!data.Status
    this._usersService.updateUser(data).subscribe();
  }
  // LoadAll() {
  //   this._usertest.forEach(v => {
  //     const dulieu = {Hoten:v.Hoten,email:v.email,SDT:v.SDT,password:'123456'}
  //     console.log(dulieu);
  //   this._usersService.Dangky(dulieu).subscribe(
  //     (data)=>{
  //       console.log(data);

  //     }
  //   )
  //   });
  // }
}
