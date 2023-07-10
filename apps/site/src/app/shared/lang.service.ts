import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LangService {
  private APIURL = environment.APIURL;
  private _lang: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _langs: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get langs$(): Observable<any[]> {
    return this._langs.asObservable();
  }
  get lang$(): Observable<any> {
    return this._lang.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demo_lang/id`).pipe(
      tap((response: any) => {
        this._lang.next(response);
      })
    );
  }
  getByslug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demo_lang/slug/${slug}`).pipe(
      tap((response: any) => {
        this._lang.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/demo_lang`).pipe(
      tap((response: any[]) => {
        this._langs.next(response);
        return response
      })
    );
  }
  createLang(data: any): Observable<any> {
    console.log(data);
    return this._httpClient.post<any>(`${this.APIURL}/demo_lang`, data).pipe(
        map((res: any) => {
          this._langs.next(res);
          console.log(res);
          return res;
        })
    );
  }
  updateLang(dulieu: any): Observable<any> {
    return this._httpClient.patch(`${this.APIURL}/demo_lang/${dulieu.id}`, dulieu).pipe(
          map((lang: any) => {
            this._lang.next(lang);            
            const merged = lang.keys.map((obj1:any) => ({ ...obj1, ...lang.translate.find((obj2:any) => obj2.key_id === obj1.key_id) }));
            const trans = merged.filter((v:any)=>v.language_id==lang.Type)
            localStorage.setItem('Translate', JSON.stringify(trans)); 
            return lang;
          })
        )
  }
  deleteLang(dulieu: any) {
    return this.langs$.pipe(
      take(1),
      switchMap((langs: any) =>
        this._httpClient.delete(`${this.APIURL}/demo_lang/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = langs.filter((e: any) => e.id != dulieu.id);
            this._langs.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

