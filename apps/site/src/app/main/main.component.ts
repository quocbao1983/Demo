import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  Detail: any = {};
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    private _Notification: NotifierService,
  ) {
  }
  ngOnInit(): void {
    // this._RedirectService.getAll().subscribe((data)=>{
    //   console.log(data);
    //   this.FilterLists = this.Lists = data
    // })
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
      // if (result) {
      //   this._RedirectService.createRedirect(this.Detail).subscribe((data)=>this._Notification.notify('success','Thêm mới thành công'))
      // }
    });
  }
}