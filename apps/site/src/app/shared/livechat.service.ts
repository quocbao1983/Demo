import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivechatService {
  private chatMessagesRef: AngularFireList<any>;
  private listEmail: AngularFireList<any>;
  private chatbyid!: AngularFireList<any>;
  private _isEmail = new BehaviorSubject<string>(sessionStorage.getItem('EmailToken') || '');
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.chatMessagesRef = this.db.list('chatMessages');   
    this.listEmail = this.db.list('listEmail');   
  }
  isEmail$ = this._isEmail.asObservable();
  updateisEmail(data: string) {
    sessionStorage.setItem('EmailToken', data); 
    this._isEmail.next(data);
  }
  addEmail(data:string)
  {
    this.listEmail.push({data});
  }
  getChatMessages(): Observable<any[]> {
    return this.chatMessagesRef.valueChanges();
  }
  getlistEmail(): Observable<any[]> {
    return this.listEmail.valueChanges();
  }
  addChatMessagebyID(email: string,message: string, sender: string, type: number): void {
    console.log(email);
    this.chatbyid = this.db.list(email);   
    console.log(this.chatbyid);
    this.chatMessagesRef.push({email, message, sender,type });
  }
  addChatMessage(email: string,message: string, sender: string, type: number): void {
    this.chatMessagesRef.push({email,message, sender,type });
  }

  addChatMessageWithImage(email: string,message: string, sender: string, imageFile: File, type: number): void {
    const filePath = `chat_images/${new Date().getTime()}_${imageFile.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imageFile);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            this.chatMessagesRef.push({ email,message, sender, image: downloadURL,type});
          });
        })
      )
      .subscribe();
  }
}