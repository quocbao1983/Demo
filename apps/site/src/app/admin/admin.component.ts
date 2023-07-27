import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { CauhinhService } from '../shared/cauhinh.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './auth/auth.service';
import { ConfigService } from '../shared/config.service';
import { environment } from '../../environments/environment';
import { UsersService } from '../shared/users.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Detail: any = {};
  isMini:boolean=false;
  Config:any={Brand:{Title:'',Img:{spath:''}}}
  ImgUrl=environment.ImgUrl
  Lists: any[] = [
    {id:1,Title:'Config',Slug:'cauhinh'},
    {id:2,Title:'Content',Slug:'noidung'},
    {id:3,Title:'Language',Slug:'ngonngu'},
    {id:4,Title:'Transaction',Slug:'transaction'},
    {id:5,Title:'Chart',Slug:'chart'},
    {id:6,Title:'Femail',Slug:'femail'},
    {id:7,Title:'User',Slug:'caidat'},
  ]
  FilterLists: any[] = [    
    {id:1,Title:'Config',Slug:'cauhinh'},
    {id:2,Title:'Content',Slug:'noidung'},
    {id:3,Title:'Language',Slug:'ngonngu'},
    {id:4,Title:'Transaction',Slug:'transaction'},
    {id:5,Title:'Chart',Slug:'chart'},
    {id:6,Title:'Femail',Slug:'femail'},
    {id:7,Title:'User',Slug:'caidat'},
]
  Sitemap: any = { loc: '', priority: '' }
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private router: Router,
    private _CauhinhService: CauhinhService,
    private _AuthService: AuthService,
    private _UsersService: UsersService,
    private breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _ConfigService: ConfigService,
  ) {
    breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
       
      }
  })
  }
  ngOnInit(): void {
    this._UsersService.getProfile().subscribe(data=>
    {
      if(data)
      {
        this.FilterLists = data.Role=="admin"?this.FilterLists:[    
          {id:4,Title:'Transaction',Slug:'transaction'},
          {id:6,Title:'Femail',Slug:'femail'},]
      }
    })
    this._ConfigService.getAll().subscribe((data)=>
    {this.Config=data[0]});
  }
 
  Logout() {
      this._AuthService.Dangxuat().subscribe((res) => {
          if (res == true) {
            this._router.navigate(['/admin']);
            location.reload();
           }
          }
      );
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.Lists = this.Lists.filter((v) => {
     return  v.Hoten.toLowerCase().includes(value)||v.SDT.toLowerCase().includes(value)
       }
      )
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._CauhinhService.createCauhinh(this.Detail).subscribe((data)=>this._Notification.notify('success','Add mới thành công'))
      }
    });
  }
}