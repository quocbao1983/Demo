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
  ListEmail:any[]=[]
  SelectEmail:any='';
  Role:any='user';
  CUser:any={}
  isEmail:any=sessionStorage.getItem('EmailToken') || null;
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  isShowchat:boolean=false
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
    this._LivechatService.getChats().subscribe(data=>{
      const conver1 = Object.entries(data);
      const conver2 = conver1.map(([id, obj]) => ({ ...obj, id }));
      const sortedData = conver2.sort((a, b) => b.time - a.time);
      const groupedData = sortedData.reduce((acc, obj) => {
        const email = obj.email;
        if (!acc[email]) {
          acc[email] = { email, chat: [] };
        }
        acc[email].chat.push(obj);
        return acc;
      }, []);     
      const result = Object.values(groupedData);
      this.ListEmail = result
      if(this.isEmail)
      {
        this.FilterchatMessages = this.ListEmail.find(v=>v.email==this.isEmail).chat.sort((a:any, b:any) => a.time - b.time); 
      }
      else if(this.CUser.id)
      {
        this.isEmail  = this.ListEmail[0].email
        this.FilterchatMessages = this.ListEmail[0].chat.sort((a:any, b:any) => a.time - b.time);
      }
      else {this.FilterchatMessages = []}   
    })
  }
  CheckNew(data:any)
  {
    const count = data.chat.reduce((acc:any, chat:any) => {
      if (chat.type === 0) {
        acc++;
      }
      return acc;
    }, 0);
    return count
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
  updateMessage(key: string, type: number): void {
    const update = {type: type};
    this._LivechatService.updateChatMessage(key, update);
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
   if(result==undefined)
   {
    this.isEmail = email
    this._LivechatService.addEmail(email);
   }
    this._LivechatService.updateisEmail(email);
    }
  }
  LoadChat(data:any)
  { 
    data.chat.forEach((v:any) => {
      this.updateMessage(v.id,1)
    });
    console.log(data.chat);
    
    this.isEmail = data.email
    this.FilterchatMessages = data.chat.sort((a:any, b:any) => a.time - b.time);
   // this._LivechatService.updateisEmail(data.email);
  }
  NotiTele(data:any)
  {
    const result = `Có 1 livechat với email ${data}`
    this._TelegramService.createChatTelegram(result).subscribe();
  }

}
