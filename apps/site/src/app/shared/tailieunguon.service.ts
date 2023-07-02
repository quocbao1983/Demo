import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TailieunguonService {
  private urlApi = environment.APIURL;
  private _tailieunguons: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _tailieunguon: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get tailieunguons$(): Observable<any[] | null> {
    return this._tailieunguons.asObservable();
  }
  get tailieunguon$(): Observable<any | null> {
    return this._tailieunguon.asObservable();
  }
  constructor(private http: HttpClient) { }
  getTailieunguons() {
    return this.http.get(this.urlApi + '/daotao-tailieunguon').pipe(
      map((data: any) => {

        this._tailieunguons.next(data);
        return data;
      })
    );
  }
  getTailieunguonDetail(slug: string) {
    return this.http.get(this.urlApi + `/daotao-tailieunguon/${slug}`).pipe(
      map((data: any) => {
        this._tailieunguon.next(data);
        return data;
      })
    );
  }
  postTailieunguon(data: any) {
    return this.tailieunguons$.pipe(
      take(1),
      switchMap((tailieunguons: any) =>
        this.http.post(this.urlApi + '/daotao-tailieunguon', data).pipe(
          map((tailieunguon) => {
            if (tailieunguons?.length > 0) {
              this._tailieunguons.next([...tailieunguons, tailieunguon]);
            }
            return tailieunguon;
          })
        )
      )
    );
  }
  updateTailieunguon(data: any) {
    return this.tailieunguons$.pipe(
      take(1),
      switchMap((tailieunguons: any) =>
        this.http.patch(this.urlApi + `/daotao-tailieunguon/${data.id}`, data).pipe(
          map((tailieunguon) => {
            // Find the index of the updated tag
            const index = tailieunguons.findIndex((item: any) => item.id === data.id);
            if (index != -1) {
              tailieunguons[index] = data;
              this._tailieunguons.next(tailieunguons as any[]);

            } else {
              this._tailieunguons.next([tailieunguon]);

            }

            // Return the updated tag
            return tailieunguon;
          })
        )
      )
    );
  }
  deleteTailieunguon(id: string) {
    return this.tailieunguons$.pipe(
      take(1),
      switchMap((tailieunguons: any) =>
        this.http.delete(this.urlApi + `/daotao-tailieunguon/${id}`).pipe(
          map((isDelete) => {
            const updateTailieunguon = tailieunguons.filter((e: any) => e.id != id);

            this._tailieunguons.next(updateTailieunguon);
            return isDelete;
          })
        )
      )
    );
  }
  private _danhmucs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  get danhmucs$(): Observable<any[] | null> {
    return this._danhmucs.asObservable();
  }
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get danhmuc$(): Observable<any | null> {
    return this._danhmuc.asObservable();
  }
  getDanhmucs() {
    return this.http.get(this.urlApi + '/daotao-danhmuc').pipe(
      map((data: any) => {
        this._danhmucs.next(data);
        return data;
      })
    );
  }
  getDanhmucDetail(slug: string) {
    return this.http.get(this.urlApi + `/daotao-danhmuc/${slug}`).pipe(
      map((data: any) => {
        this._danhmuc.next(data);
        return data;
      })
    );
  }
  postDanhmuc(data: any) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.post(this.urlApi + '/daotao-danhmuc', data).pipe(
          map((danhmuc) => {
            if (danhmucs?.length > 0) {
              this._danhmucs.next([...danhmucs, danhmuc]);
            } else {
              this._danhmucs.next([danhmuc]);
            }
            return danhmuc;
          })
        )
      )
    );
  }
  updateDanhmuc(data: any) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.patch(this.urlApi + `/daotao-danhmuc/${data.id}`, data).pipe(
          map((danhmuc) => {
            // Find the index of the updated tag
            const index = danhmucs.findIndex((item: any) => item.id === data.id);

            // Update the tag
            if (index != -1) {
              danhmucs[index] = data;

              this._danhmucs.next(danhmucs as any[]);
            } else {
              this._danhmucs.next([danhmuc]);


            }


            // Return the updated tag
            return danhmuc;
          })
        )
      )
    );
  }
  deleteDanhmuc(id: String) {
    return this.danhmucs$.pipe(
      take(1),
      switchMap((danhmucs: any) =>
        this.http.delete(this.urlApi + `/daotao-danhmuc/${id}`).pipe(
          map((isDelete) => {
            const updateDanhmuc = danhmucs.filter((e: any) => e.id != id);

            this._danhmucs.next(updateDanhmuc);
            return isDelete;
          })
        )
      )
    );
  }
  uploadDelete(data:any) {
    return this.http.delete(this.urlApi + `/upload/${data.id}`,{body:data}).pipe(
      map((isDelete) => {
        return isDelete;
      })
    )
  }
  uploadDaotao(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}_${month}_${year}`;
    return this.http.post(this.urlApi + `/upload/server?folder=daotao/${formattedDate}`, formData).pipe(
      map((data: any) => {
        if (data) {
          return data;
        }
      })
    );
  }
}
