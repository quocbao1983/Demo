import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CauhinhService {
  private APIURL = environment.APIURL;
  private _cauhinh: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _cauhinhs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get cauhinhs$(): Observable<any[]> {
    return this._cauhinhs.asObservable();
  }
  get cauhinh$(): Observable<any> {
    return this._cauhinh.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demo_cauhinh/id`).pipe(
      tap((response: any) => {
        this._cauhinh.next(response);
      })
    );
  }
  getByslug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demo_cauhinh/slug/${slug}`).pipe(
      tap((response: any) => {
        this._cauhinh.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/demo_cauhinh`).pipe(
      tap((response: any[]) => {
        this._cauhinhs.next(response);
        return response
      })
    );
  }
  createCauhinh(data: any): Observable<any> {
    console.log(data);
    return this._httpClient.post<any>(`${this.APIURL}/demo_cauhinh`, data).pipe(
        map((res: any) => {
          this._cauhinhs.next(res);
          console.log(res);
          return res;
        })
    );
  }
  updateCauhinh(dulieu: any): Observable<any> {
    return this.cauhinhs$.pipe(
      take(1),
      switchMap((cauhinhs: any) =>
        this._httpClient.patch(`${this.APIURL}/demo_cauhinh/${dulieu.id}`, dulieu).pipe(
          map((cauhinh: any) => {
            const index = cauhinhs.findIndex((item: any) => item.id === cauhinh.id);
            cauhinhs[index] = cauhinh;
            this._cauhinhs.next(cauhinhs);
            return cauhinh;
          })
        )
      ))
  }
  deleteCauhinh(dulieu: any) {
    return this.cauhinhs$.pipe(
      take(1),
      switchMap((cauhinhs: any) =>
        this._httpClient.delete(`${this.APIURL}/demo_cauhinh/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = cauhinhs.filter((e: any) => e.id != dulieu.id);
            this._cauhinhs.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

