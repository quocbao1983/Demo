import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private APIURL = environment.APIURL;
  private _config: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _configs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get configs$(): Observable<any[]> {
    return this._configs.asObservable();
  }
  get config$(): Observable<any> {
    return this._config.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demo_config/id`).pipe(
      tap((response: any) => {
        this._config.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/demo_config`).pipe(
      tap((response: any[]) => {
        this._configs.next(response);
        return response
      })
    );
  }
  createConfig(data: any): Observable<any> {
    console.log(data);
    return this._httpClient.post<any>(`${this.APIURL}/demo_config`, data).pipe(
        map((res: any) => {
          this._configs.next(res);
          console.log(res);
          return res;
        })
    );
  }
  updateConfig(dulieu: any): Observable<any> {
    return this.configs$.pipe(
      take(1),
      switchMap((configs: any) =>
        this._httpClient.patch(`${this.APIURL}/demo_config/${dulieu.id}`, dulieu).pipe(
          map((config: any) => {
            const index = configs.findIndex((item: any) => item.id === config.id);
            configs[index] = config;
            this._configs.next(configs);
            return config;
          })
        )
      ))
  }
  deleteConfig(dulieu: any) {
    return this.configs$.pipe(
      take(1),
      switchMap((configs: any) =>
        this._httpClient.delete(`${this.APIURL}/demo_config/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = configs.filter((e: any) => e.id != dulieu.id);
            this._configs.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

