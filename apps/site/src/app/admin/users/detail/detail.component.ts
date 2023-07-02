import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'tazagroup-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  ws: any;
  user:User = {}
  APITINYMCE: string;
  video: any;
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
  constructor(private _usersService: UsersService) {
    this.APITINYMCE = environment.APITINYMCE;
    this._usersService.user$.subscribe(data=>this.user = data)
  }
  ngAfterViewInit() {}
  ngOnInit(): void {
    console.log(this.user);

    //this._UsersService.getUsers().subscribe(data=>{})
  }
}
