import { Component, OnInit } from '@angular/core';
import { LivechatService } from '../../shared/livechat.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  chatMessages: any[] = [];
  fileURL:any
  newMessage: string = '';
  selectedImage: File | null = null;
  constructor(
    private _LivechatService: LivechatService,
    private sanitizer: DomSanitizer
    ) {}

  ngOnInit(): void {
    this._LivechatService.getChatMessages().subscribe((messages) => {
      this.chatMessages = messages;
    });
  }

  sendMessage(): void {
    this.fileURL = null;
    if (this.selectedImage) {
      this._LivechatService.addChatMessageWithImage(this.newMessage, 'User', this.selectedImage,0);
    } else if (this.newMessage.trim() !== '') {
      this._LivechatService.addChatMessage(this.newMessage, 'User',0);
    }

    this.newMessage = '';
    this.selectedImage = null;
  }
  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      this.fileURL = URL.createObjectURL(this.selectedImage);
    }
  }
  GetImg(data:any)
  {
   return this.sanitizer.bypassSecurityTrustUrl(data);
  }

}
