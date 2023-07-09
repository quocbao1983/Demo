import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private APIURL = environment.APIURL;
  private TeleURL = `https://api.telegram.org/bot${environment.Teleram_bao_test_trans_bot}`
  private TeleChatURL = `https://api.telegram.org/bot${environment.Teleram_bot_token}`
  private _telegram: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _telegrams: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }
  get telegrams$(): Observable<any[]> {
    return this._telegrams.asObservable();
  }
  get telegram$(): Observable<any> {
    return this._telegram.asObservable();
  }
  getAll(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.TeleURL}/getUpdates`).pipe(
      tap((response: any[]) => {
        this._telegrams.next(response);
        return response
      })
    );
  }
  createTelegram(data: any): Observable<any> {
    console.log(data);
    return this._httpClient.post<any>(`${this.TeleURL}/sendMessage?chat_id=${environment.Teleram_bao_test_trans_group_id}&text=${data}&parse_mode=html`, data).pipe(
        map((res: any) => {
          this._telegrams.next(res);
          console.log(res);
          return res;
        })
    );
  }
  createChatTelegram(data: any): Observable<any> {
    console.log(data);
    return this._httpClient.post<any>(`${this.TeleChatURL}/sendMessage?chat_id=${environment.Teleram_group_id}&text=${data}&parse_mode=html`, data).pipe(
        map((res: any) => {
          this._telegrams.next(res);
          console.log(res);
          return res;
        })
    );
  }
  updateTelegram(dulieu: any): Observable<any> {
    return this.telegrams$.pipe(
      take(1),
      switchMap((telegrams: any) =>
        this._httpClient.patch(`${this.APIURL}/demo_telegram/${dulieu.id}`, dulieu).pipe(
          map((telegram: any) => {
            const index = telegrams.findIndex((item: any) => item.id === telegram.id);
            telegrams[index] = telegram;
            this._telegrams.next(telegrams);
            return telegram;
          })
        )
      ))
  }
  deleteTelegram(dulieu: any) {
    return this.telegrams$.pipe(
      take(1),
      switchMap((telegrams: any) =>
        this._httpClient.delete(`${this.APIURL}/demo_telegram/${dulieu.id}`).pipe(
          map((isDelete) => {
            const updatePhanquyens = telegrams.filter((e: any) => e.id != dulieu.id);
            this._telegrams.next(updatePhanquyens);
            return isDelete;
          })
        )
      ));
  }
}

