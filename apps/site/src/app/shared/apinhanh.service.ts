import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/hdermaapp/src/environments/environment';
import { NotifierService } from 'angular-notifier';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApinhanhService {
  private APIURL = environment.APIURL;
  private _sanpham: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _sanphams: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private _NotifierService: NotifierService,
    ) { }
  get sanphams$(): Observable<any[]> {
    return this._sanphams.asObservable();
  }
  get sanpham$(): Observable<any> {
    return this._sanpham.asObservable();
  }
  getToken(data: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/apinhanh/gettoken`,data).pipe(
      tap((response: any) => {
            if(response.code!=0)
            {
                const token = JSON.stringify({nhanhToken: response.accessToken, businessId: response.businessId});
                localStorage.setItem('nhanhApi', token);
                this._NotifierService.notify("success","Kết Nối Thành Công")
            }
            else {
            this._NotifierService.notify("error",response.error)
        }
      })
    );
  }
  getSanpham(data: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/apinhanh/getsanpham`,data).pipe(
      tap((response: any) => {
                console.log(response);
                return response      
      })
    );
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/sanpham/id`).pipe(
      tap((response: any) => {
        this._sanpham.next(response);
        console.log(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/sanpham`).pipe(
      tap((response: any[]) => {
        this._sanphams.next(response);
      })
    );
  }
  createSanpham(dulieu: any): Observable<any> {
    return this.sanphams$.pipe(
      take(1),
      switchMap(datas => this._httpClient.post<any>(`${this.APIURL}/sanpham`, dulieu).pipe(
        map((res: any) => {
          this._sanphams.next([res[1], ...datas]);
          console.log(res);
          return res[1];
        })
      ))
    );
  }
  updateSanpham(dulieu: any): Observable<any> {
    return this.sanphams$.pipe(
      take(1),
      switchMap((sanphams: any) =>
        this._httpClient.patch(`${this.APIURL}/sanpham/${dulieu.id}`, dulieu).pipe(
          map((sanpham: any) => {
            const index = sanphams.findIndex((item: any) => item.id === sanpham.id);
            sanphams[index] = sanpham;
            this._sanphams.next(sanphams);
            return sanpham;
          })
        )
      ))
  }
  deleteSanpham(dulieu: any) {
    return this.sanphams$.pipe(
      take(1),
      switchMap((sanphams: any) =>
        this._httpClient.delete(`${this.APIURL}/sanpham/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = sanphams.filter((e: any) => e.id != dulieu.id);
            this._sanphams.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}
