import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivechatService {
  private chatMessagesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.chatMessagesRef = this.db.list('chatMessages');   
  }

  getChatMessages(): Observable<any[]> {
    return this.chatMessagesRef.valueChanges();
  }

  addChatMessage(message: string, sender: string, type: number): void {
    this.chatMessagesRef.push({ message, sender,type });
  }

  addChatMessageWithImage(message: string, sender: string, imageFile: File, type: number): void {
    const filePath = `chat-images/${new Date().getTime()}_${imageFile.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imageFile);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            this.chatMessagesRef.push({ message, sender, image: downloadURL,type});
          });
        })
      )
      .subscribe();
  }
}