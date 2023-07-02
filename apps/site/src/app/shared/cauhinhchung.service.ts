import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CauhinhchungService {
  private APIURL = environment.APIURL;
  private _cauhinhchung: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _cauhinhchungs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get cauhinhchungs$(): Observable<any[]> {
    return this._cauhinhchungs.asObservable();
  }
  get cauhinhchung$(): Observable<any> {
    return this._cauhinhchung.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/hderma-cauhinh/${id}`).pipe(
      tap((response: any) => {
        this._cauhinhchung.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/hderma-cauhinh`).pipe(
      tap((response: any[]) => {
        this._cauhinhchungs.next(response);
      })
    );
  }
  createCauhinhchung(dulieu: any): Observable<any> {
    return this.cauhinhchungs$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/hderma-cauhinh`, dulieu).pipe(
        map((res: any) => {
          this._cauhinhchungs.next([res[1], ...datas]);
          console.log(res);
          return res[1];
        })
      ))
    );
  }
  updateCauhinhchung(dulieu: any): Observable<any> {
    return this.cauhinhchungs$.pipe(
      take(1),
      switchMap((cauhinhchungs: any) =>
        this._httpClient.patch(`${this.APIURL}/hderma-cauhinh/${dulieu.id}`, dulieu).pipe(
          map((cauhinhchung: any) => {
            const index = cauhinhchungs.findIndex((item: any) => item.id === cauhinhchung.id);
            cauhinhchungs[index] = cauhinhchung;
            this._cauhinhchungs.next(cauhinhchungs);
            return cauhinhchung;
          })
        )
      ))
  }
  deleteCauhinhchung(dulieu: any) {
    return this.cauhinhchungs$.pipe(
      take(1),
      switchMap((cauhinhchungs: any) =>
        this._httpClient.delete(`${this.APIURL}/hderma-cauhinh/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = cauhinhchungs.filter((e: any) => e.id != dulieu.id);
            this._cauhinhchungs.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
