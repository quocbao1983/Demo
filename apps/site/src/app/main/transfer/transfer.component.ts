import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivechatService } from '../../shared/livechat.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  Data:any = {}
  isShowlivechat:boolean= false
  chatMessages: any[] = [];
  newMessage: string = '';
  selectedImage: File | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _LivechatService: LivechatService
    ) {}
  ngOnInit() {   
    this.route.queryParams.subscribe((params:any) => {     
      // if(!params.Soluong){
      //   this.router.navigate(['/']);
      // }
      // else
      // {
      //   this.Data = params
      // }
    });
    this._LivechatService.getChatMessages().subscribe((messages) => {
      this.chatMessages = messages;
    });
  }
  sendMessage(): void {
    console.log(this.newMessage);
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
  }
}
