import { Component, OnInit, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DiaChiInit } from 'libs/hdermav2/site/src/diachi';
import { UsersService } from '../../admin/users.service';
@Component({
  selector: 'app-diachi',
  templateUrl: './diachi.component.html',
  styleUrls: ['./diachi.component.css']
})
export class DiachiComponent implements OnInit {
  user: any={Diachi:[]};
  DiaChiInit = DiaChiInit;
  Data: any = { user: '', oldpass: '', newpass: '' };
  options: any = {
    componentRestrictions: { country: 'VN' }
  }
  ChosenTinh:any={}
  ChosenQuan:any={}
  ChosenPhuong:any={}
  ChosenDiachi:any
  filterTinh:any[]=[]
  Tinh:any[]=[]
  filterQuan:any[]=[]
  Quan:any[]=[]
  filterPhuong:any[]=[]
  Phuong:any[]=[]
  Diachi:any={}
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _notifierService: NotifierService,
    private fb: FormBuilder,
    private _usersService: UsersService,
    private _dialog: MatDialog,

  ) {}
  ngOnInit(): void {
    this.Tinh = this.filterTinh = this.DiaChiInit
    this._usersService.getProfile().subscribe();
    this._usersService.profile$.subscribe(user => {
      if(user){
        this.user = user;
      }
    }
  )
  }
  displayFn(data: any): string {
    return data && data.name ? data.name : '';
  }
  onTinhChange(state: any) {
    this.filterTinh = this.Tinh.filter(v => v.name.toLowerCase().includes(state));
    if(state &&state.name)
    {
      this.Quan = this.filterQuan = state.districts  
    }
  }
  onQuanChange(state: any) {
      this.filterQuan = this.Quan.filter(v => v.name.toLowerCase().includes(state));
      if(state &&state.name)
      {
        this.Phuong = this.filterPhuong = state.wards  
      }
  }
  onPhuongChange(state: string) {
    this.filterPhuong = this.Phuong.filter(v => v.name.toLowerCase().includes(state));
  }
  OpenDelete(item:any,teamplate:TemplateRef<any>)
  {
    const dialogRef = this._dialog.open(teamplate,{
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result)
      {
      this.user.Diachi = this.user.Diachi.filter((v:any)=>v.id!==item.id)
      }
    });
  }

  ChangePass(data: any): void {
    if (data.newpass != data.newpass2) {
      console.log(data);
      this._notifierService.show({
        message: 'Xác nhận mật khẩu mới không trùng khớp',
        type: 'error',
      });
    } else {
      const dulieu = {
        user: this.user,
        oldpass: data.oldpass,
        newpass: data.newpass,
      };
      this._usersService.changepass(dulieu).subscribe((data) => {
        if (data[0]) {
          this.Data = { user: '', oldpass: '', newpass: '' };
          this._notifierService.show({
            message: data[1],
            type: 'success',
          });
        } else {
          this._notifierService.show({
            message: data[1],
            type: 'error',
          });
        }
      });
    }
  }
  ThemDiachi()
  {
    console.log(this.ChosenTinh.name);
    
    if(this.ChosenTinh.name!=undefined&&this.ChosenDiachi!=undefined)
    {
    const data = {id:this.user.Diachi.length+1,Tinh:this.ChosenTinh.name,Quan:this.ChosenQuan.name,Phuong:this.ChosenPhuong.name,Diachi:this.ChosenDiachi}
    this.user.Diachi.push(data)
    this._usersService.updateOneUser(this.user).subscribe((data)=>
    {
      this._notifierService.notify("success","Thêm Thành Công")
    })
    }
    else 
    {
      this._notifierService.notify("error","Vui lòng thêm thông tin")
    }
  }
  UpdateProfile(data:any) {
    if (data.SDT==''||data.SDT==undefined) {
      this._notifierService.notify('error', `Vui lòng nhập SDT`);
    }
    else if (data.email==''||data.email==undefined) {
      this._notifierService.notify('error', `Vui lòng nhập Email`);
    }
    else if (data.Hoten==''||data.Hoten==undefined) {
      this._notifierService.notify('error', `Vui lòng nhập ho và tên`);
    }
    else this._usersService.updateOneUser(data).subscribe((data) => {
      this._notifierService.notify('success', `Cập Nhật Thành Công`);
        }
      );
  }


}
