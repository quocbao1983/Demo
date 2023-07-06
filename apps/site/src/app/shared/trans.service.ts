import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private APIURL = environment.APIURL;
  private _exchange: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _exchanges: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get exchanges$(): Observable<any[]> {
    return this._exchanges.asObservable();
  }
  get exchange$(): Observable<any> {
    return this._exchange.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demo_trans/${id}`).pipe(
      tap((response: any) => {
        this._exchange.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/demo_trans`).pipe(
      tap((response: any[]) => {
        this._exchanges.next(response);
        return response
      })
    );
  }
  createExchange(data: any): Observable<any> {
    console.log(data);
    return this._httpClient.post<any>(`${this.APIURL}/demo_trans`, data).pipe(
        map((res: any) => {
          this._exchanges.next(res);
          console.log(res);
          return res;
        })
    );
  }
  updateExchange(dulieu: any): Observable<any> {
    return this._httpClient.patch(`${this.APIURL}/demo_trans/${dulieu.id}`, dulieu).pipe(
          map((exchange: any) => {
            this._exchange.next(exchange);
            return exchange;
          }))
  }
  deleteExchange(dulieu: any) {
    return this.exchanges$.pipe(
      take(1),
      switchMap((exchanges: any) =>
        this._httpClient.delete(`${this.APIURL}/demo_trans/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = exchanges.filter((e: any) => e.id != dulieu.id);
            this._exchanges.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

