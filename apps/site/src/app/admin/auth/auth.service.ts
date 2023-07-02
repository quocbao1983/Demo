import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { AuthUtils } from './auth.utils';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { UsersService } from '../../shared/users.service';
@Injectable()
export class AuthService {
  private readonly _secret: any;
  private _authenticated: boolean = false;
  private APIURL: string = environment.APIURL;
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;
  constructor(
    private _httpClient: HttpClient,
    private _userService: UsersService
  ) {
    this._secret = 'site.hderma.vn';
    //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }
  // public get currentUserValue(): User {
  //     return this.currentUserSubject.value;
  // }
  set accessToken(token: string) {
    localStorage.setItem('TazagroupToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('TazagroupToken') ?? '';
  }
  Dangnhap(user: any): Observable<any> {
    if (this._authenticated) {
      return of([false, 'User Đã Đăng Nhập']);
    }
    return this._httpClient.post(`${this.APIURL}/hderma_auth/login`, user).pipe(
      switchMap((response: any) => {
        console.log(response);
        
        if (response[0]) {
          this._authenticated = true;
          this.accessToken = response[1].access_token;
        }
        return of(response);
      })
    );
  }
  checkDangnhap(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken || this.accessToken === 'undefined') {
      localStorage.removeItem('TazagroupToken');
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
        return of(false);
    }
    return of(true);
    // return this.signInUsingToken();
  }
  Dangxuat(): Observable<any> {
    localStorage.removeItem('TazagroupToken');
    this._authenticated = false;
    return of(true);
  }
  // Dangnhap(user: User): Observable<any> {
  //   return this._httpClient.post<any>(`${this.APIURL}/auth/login`, user)
  // }
  // signInUsingToken(): Observable<any> {
  //     return this._httpClient.post(`${environment.ApiURL}/auth/signbytoken`, { access_token: this.accessToken }).pipe(
  //         switchMap((response: any) => {
  //             if (response !== false) {
  //                 this._authenticated = true;
  //                 this._userService.user = response.user;
  //                 return of(true)
  //             }
  //             else return of(false)

  //         })
  //     );
  // }
  // signOut(): Observable<any> {
  //     localStorage.removeItem('accessToken');
  //     this._authenticated = false;
  //     return of(true);
  // }
  // unlockSession(credentials: { email: string; password: string }): Observable<any> {
  //     return this._httpClient.post('api/auth/unlock-session', credentials);
  // }
  // check(): Observable<boolean> {
  //     if (this._authenticated) {
  //         return of(true);
  //     }
  //     if (!this.accessToken || this.accessToken === 'undefined') {
  //         localStorage.removeItem('accessToken');
  //         return of(false);
  //     }
  //     if (AuthUtils.isTokenExpired(this.accessToken)) {
  //         return of(false);
  //     }
  //     //return of(true);
  //     return this.signInUsingToken();
  // }
  // CheckMenu(): Observable<any> {
  //     return this._httpClient.post(`${environment.ApiURL}/auth/signbytoken`, { access_token: this.accessToken }).pipe(
  //         switchMap((response: any) => {
  //             if (response !== false) {
  //                 const Menus = [];
  //                 this._navigationService.getMenu().subscribe();
  //                 this._navigationService.menus$.subscribe((menus) => {
  //                     this._menus.next(menus);
  //                 });
  //                 this._menus.subscribe((v1)=>
  //                 {
  //                    v1.forEach(v => {
  //                     console.log(v);
  //                     Menus.push({ 'link': v.link, 'status': response.Menu[v.uuid] });
  //                 });}
  //                 )
  //                 return of(Menus);
  //             }
  //             else return of(false)
  //         })
  //     );
  // }
}
