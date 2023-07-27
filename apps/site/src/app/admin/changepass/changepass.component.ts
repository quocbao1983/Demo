import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../../shared/users.service';
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  user: any;
  Data: any = { user: '', oldpass: '', newpass: '' };
  constructor(
    private _userService: UsersService,
    private _notifierService: NotifierService
  ) {
    
    this._userService.getProfile().subscribe((data) => {
      this.user = data;
      console.log( this.user);
      
    });
  }
  ngOnInit(): void {}
  ChangePass(data: any): void {
    if (data.newpass != data.newpass2) {
      console.log(data);
      this._notifierService.show({
        message: 'Xác nhận password không trùng',
        type: 'error',
      });
    } else {
      const dulieu = {
        user: this.user,
        oldpass: data.oldpass,
        newpass: data.newpass,
      };
      this._userService.changepass(dulieu).subscribe((data) => {
        if (data[0]) {
          this.Data = { user: '', oldpass: '', newpass: '' };
          this._notifierService.show({
            message: data[1],
            type: 'success',
          });
          this._notifierService.show({
            message:"Login Again",
            type: 'success',
          });
          setTimeout(() => {
            localStorage.removeItem('DemoToken');
            window.location.reload()
          }, 1000);
        } else {
          this._notifierService.show({
            message: data[1],
            type: 'error',
          });
        }
      });
    }
  }
}
