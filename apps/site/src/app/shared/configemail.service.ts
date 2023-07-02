import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private APIURL = environment.APIURL;
  private _configemail: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _configemails: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get configemails$(): Observable<any[]> {
    return this._configemails.asObservable();
  }
  get configemail$(): Observable<any> {
    return this._configemail.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/configemail/id`).pipe(
      tap((response: any) => {
        this._configemail.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/configemail`).pipe(
      tap((response: any[]) => {
        this._configemails.next(response);
      })
    );
  }
  createConfigEmail(dulieu: any): Observable<any> {
    return this.configemails$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/configemail`, dulieu).pipe(
        map((res: any) => {
          this._configemails.next([res[1], ...datas]);
          console.log(res);
          return res[1];
        })
      ))
    );
  }
  updateConfigEmail(dulieu: any): Observable<any> {
    return this.configemails$.pipe(
      take(1),
      switchMap((configemails: any) =>
        this._httpClient.patch(`${this.APIURL}/configemail/${dulieu.id}`, dulieu).pipe(
          map((configemail: any) => {
            const index = configemails.findIndex((item: any) => item.id === configemail.id);
            configemails[index] = configemail;
            this._configemails.next(configemails);
            return configemail;
          })
        )
      ))
  }
  deleteConfigEmail(dulieu: any) {
    return this.configemails$.pipe(
      take(1),
      switchMap((configemails: any) =>
        this._httpClient.delete(`${this.APIURL}/configemail/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = configemails.filter((e: any) => e.id != dulieu.id);
            this._configemails.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
