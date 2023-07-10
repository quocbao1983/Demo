import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivechatService } from '../../shared/livechat.service';
import { ExchangeService } from '../../shared/trans.service';
import { NotifierService } from 'angular-notifier';
import { LangService } from '../../shared/lang.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  Data:any = {
    QuantityIn: "0",
    QuantityOut: "0",
    CompanyAccount1: "",
    CompanyAccount2: "",
    CustomAccount1: "",
    CustomAccount2: "",
    Email: "",
    Content: "",
    Fee: "0",
    Note: "",
    Type: 0,
    Status: 0,
}
  isShowlivechat:boolean= false
  chatMessages: any[] = [];
  newMessage: string = '';
  selectedImage: File | null = null;
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _LivechatService: LivechatService,
    private _ExchangeService: ExchangeService,
    private _NotifierService: NotifierService,
    private _LangService: LangService,
    ) {}
  ngOnInit() {   
    // this._LangService.getAll().subscribe(data=>{
    //   const merged = data[0].keys.map((obj1:any) => ({ ...obj1, ...data[0].translate.find((obj2:any) => obj2.key_id === obj1.key_id) }));
    //    this.trans = merged.filter((v:any)=>v.language_id==data[0].Type)  
    // }) 
    this.route.params.subscribe((params:any) => {     
      this._ExchangeService.getByid(params['id']).subscribe(data=>
        {
          if(data)
          {
            this.Data = data
            console.log(data);
          }
          else
          {
              this._NotifierService.notify("error","Not Have Transfer")
              this.router.navigate(['/']);
          }  
        })

    });
  }
  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }
  GetTrans(trans:any[],value:any)
  {
    const result = trans.find((v:any)=>v.key_name==value)
    return result?result.translation_text:''
  }
}
