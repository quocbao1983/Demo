import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private APIURL = environment.APIURL;
  private _content: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _contents: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get contents$(): Observable<any[]> {
    return this._contents.asObservable();
  }
  get content$(): Observable<any> {
    return this._content.asObservable();
  }
  getByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demo_content/findid/${id}`).pipe(
      tap((response: any) => {
        this._content.next(response);
        return response
      })
    );
  }
  getByslug(slug: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/demo_content/findslug/${slug}`).pipe(
      tap((response: any) => {
        this._content.next(response);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/demo_content`).pipe(
      tap((response: any[]) => {
        this._contents.next(response);
        return response
      })
    );
  }
  createContent(data: any): Observable<any> {
    console.log(data);
    return this._httpClient.post<any>(`${this.APIURL}/demo_content`, data).pipe(
        map((res: any) => {
          this._contents.next(res);
          console.log(res);
          return res;
        })
    );
  }
  updateContent(dulieu: any): Observable<any> {
    return this._httpClient.patch(`${this.APIURL}/demo_content/${dulieu.id}`, dulieu).pipe(
          map((content: any) => {
            this._contents.next(content);
            return content;
          })
        )
  }
  deleteContent(dulieu: any) {
    return this.contents$.pipe(
      take(1),
      switchMap((contents: any) =>
        this._httpClient.delete(`${this.APIURL}/demo_content/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = contents.filter((e: any) => e.id != dulieu.id);
            this._contents.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

