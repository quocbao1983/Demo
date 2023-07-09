import { Component, OnInit } from '@angular/core';
import { LivechatService } from '../../shared/livechat.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MainComponent } from '../main.component';
import { Observable } from 'rxjs';
import { UsersService } from '../../shared/users.service';
import { NotifierService } from 'angular-notifier';
import { TelegramService } from '../../shared/telegram.service';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  chatMessages: any[] = [];
  FilterchatMessages: any[] = [];
  fileURL:any
  newMessage: string = '';
  selectedImage: File | null = null;
  Email:any;
  isEmail:any;
  ListEmail:any[]=[]
  Role:any='user';
  CUser:any={}
  constructor(
    private _LivechatService: LivechatService,
    private sanitizer: DomSanitizer,
    private _MainComponent: MainComponent,
    private _UsersService: UsersService,
    private _NotifierService: NotifierService,
    private _TelegramService: TelegramService,
    ) {}

  ngOnInit(): void {
    this._UsersService.getProfile().subscribe(data=>
      {
        if(data){
        this.Role='admin'
        this.CUser = data
      }})
    this._LivechatService.isEmail$.subscribe(data => {
      this.isEmail = data;
      this._LivechatService.getChatMessages().subscribe((messages) => {
        this.chatMessages = messages
        this.FilterchatMessages = messages.filter(v=>v.email==this.isEmail) 
      });
    });
    this._LivechatService.getlistEmail().subscribe(data=>{
      this.ListEmail=data
    })

  }
  onEnterPressed(email: any) {
    this.sendMessage(email)
  }
  sendMessage(email:any): void {
    this.fileURL = null;
    if (this.selectedImage) {
      this._LivechatService.addChatMessageWithImage(email,this.newMessage, this.Role, this.selectedImage,0);
    } else if (this.newMessage.trim() !== '') {
      this._LivechatService.addChatMessage(email,this.newMessage, this.Role,0);
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
  Closedrawer()
  {
    this._MainComponent.drawer.close();
  }
  CreateChat(email:any)
  {
   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (email=='')
    {
      this._NotifierService.notify("error", "Vui lòng nhập Email")
    }
    else if (!emailPattern.test(email)) {
      this._NotifierService.notify("error", "Sai Định Dạng Email")
    }
  else
    {
   const result = this.ListEmail.find(v=>v.data==email)
   console.log(result);
   
   if(result==undefined)
   {
    this._LivechatService.addEmail(email);
   }
    this._LivechatService.updateisEmail(email);
    }
  }
  LoadChat(data:any)
  {
    this.FilterchatMessages = this.chatMessages.filter(v=>v.email==data) 
    this._LivechatService.updateisEmail(data);
  }
  NotiTele(data:any)
  {
    const result = `Có 1 livechat với email ${data}`
    this._TelegramService.createChatTelegram(result).subscribe();
  }

}
