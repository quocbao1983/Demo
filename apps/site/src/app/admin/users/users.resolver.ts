import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, throwError, } from 'rxjs';
import { UsersService } from '../users.service';
@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<any> {
  constructor(
    private _usersService: UsersService,
    private _router: Router
){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._usersService.getUsers();
  }
}
@Injectable({
  providedIn: 'root'
})
export class UsersDetailResolver implements Resolve<any> {
  constructor(
    private _usersService: UsersService,
    private _router: Router
){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route.paramMap.get('id'));
    return this._usersService.getUserByid(route.paramMap.get('id'))
    .pipe(
        catchError((error) => {
            console.error(error);
            const parentUrl = state.url.split('/').slice(0, -1).join('/');
            this._router.navigateByUrl(parentUrl);
            return throwError(error);
        })
    );
  }
}