import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { CauhinhService } from '../shared/cauhinh.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Detail: any = {};
  isMini:boolean=false;
  Lists: any[] = [
    {id:1,Title:'Cấu Hình',Slug:'cauhinh'},
    {id:2,Title:'Nội Dung',Slug:'noidung'},
    {id:3,Title:'Ngôn Ngữ',Slug:'ngonngu'},
    {id:4,Title:'Giao Dịch',Slug:'transaction'},
    {id:5,Title:'Chart',Slug:'chart'},
    {id:6,Title:'Femail',Slug:'femail'},
  ]
  FilterLists: any[] = [    
    {id:1,Title:'Cấu Hình',Slug:'cauhinh'},
    {id:2,Title:'Nội Dung',Slug:'noidung'},
    {id:3,Title:'Ngôn Ngữ',Slug:'ngonngu'},
    {id:4,Title:'Giao Dịch',Slug:'transaction'},
    {id:5,Title:'Chart',Slug:'chart'},
    {id:6,Title:'Femail',Slug:'femail'},
]
  Sitemap: any = { loc: '', priority: '' }
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
    private router: Router,
    private _CauhinhService: CauhinhService,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
       
      }
  })
  }
  ngOnInit(): void {
    // this._CauhinhService.getAll().subscribe((data)=>{
    //   this.FilterLists = this.Lists = data
    // })
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
        this._CauhinhService.createCauhinh(this.Detail).subscribe((data)=>this._Notification.notify('success','Thêm mới thành công'))
      }
    });
  }
}