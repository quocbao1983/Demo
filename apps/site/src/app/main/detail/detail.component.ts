import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
// import { UsersService } from 'libs/shared/src/lib/users.service';
// import { RedirectService } from '../../../shared/redirects.service';
// import { RedirectsComponent } from '../redirects.component';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  Detail: any
  constructor(
    private route: ActivatedRoute,
    // private _userservice: UsersService,
    // private _RedirectService: RedirectService,
    // private _NotifierService: NotifierService,
    // private _RedirectsComponent: RedirectsComponent
  ) {}
  ngOnInit(): void {
    // this.route.params.subscribe((paramsId) => {
    //   const id = paramsId['id'];
    //   console.log(id);
    //   if (id) {
    //     this._RedirectsComponent.drawer.open();
    //     this._RedirectService.getByid(id).subscribe();
    //     this._RedirectService.redirect$.subscribe((res) => {
    //       if (res) {
    //         console.log(res);
    //         this.Detail = res;
    //       }
    //     });
    //   }
    // });
  }
  CloseDrawer()
  {
    //this._RedirectsComponent.drawer.close();
  }
}











