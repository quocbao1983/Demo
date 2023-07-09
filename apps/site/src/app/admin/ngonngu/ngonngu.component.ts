import { Component, OnInit } from '@angular/core';
import { CauhinhService } from '../../shared/cauhinh.service';
import { LangService } from '../../shared/lang.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-ngonngu',
  templateUrl: './ngonngu.component.html',
  styleUrls: ['./ngonngu.component.css']
})
export class NgonnguComponent implements OnInit {
  Data: any = {}
  NewKey: any;
  lang: any[] = []
  // {"lang":[{"id":1,"code":"en","name":"English"},{"id":2,"code":"zh","name":"China"},{"id":3,"code":"ko","name":"South Korea"},{"id":4,"code":"ru","name":"Russia"},{"id":5,"code":"fr","name":"France"}],"keys":[{"key_id":1,"key_name":"greeting"},{"key_id":2,"key_name":"goodbye"},{"key_id":3,"key_name":"welcome"}]}
  keys: any[] = []
  //"keys":[{"key_id": 1,"key_name":"greeting"},{"key_id":2,"key_name":"goodbye"},{"key_id":3,"key_name":"welcome"}]}
  translate: any[] = []
  // {"translation_id": 1, "language_id": 1, "key_id": 1,"translation_text": "Hello"}
  constructor(
    private _LangService: LangService,
    private _NotifierService: NotifierService,
  ) { }
  ngOnInit() {
       this.NewKey="";
      this._LangService.getAll().subscribe(data => {
      this.Data = data
      console.log(data);
      this.lang = this.Data[0].lang
      this.keys = this.Data[0].keys
      this.translate = this.Data[0].translate
      // this.keys = data.Data.keys
    }
    )
  }
  Change(e: any, translate: any[], lang: any, keys: any) {
    const match = translate.find(
      t => t.language_id === lang.id && t.key_id === keys.key_id
    );
    if (match) {
      const updatedData = translate.map(obj => {
        if (obj.translation_id === match.translation_id) {
          return { ...obj, translation_text: e.target.value };
        }
        return obj;
      });
      this.Data[0].translate =updatedData
      this._LangService.updateLang(this.Data[0]).subscribe(()=>this._NotifierService.notify("success","Cập Nhật Thành Công"));
    }
    else {
      const tran =
      {
        "translation_id": translate.length + 1,
        "language_id": lang.id,
        "key_id": keys.key_id,
        "translation_text": e.target.value
      }
      this.Data[0].translate.push(tran)
      this._LangService.updateLang(this.Data[0]).subscribe(()=>this._NotifierService.notify("success","Cập Nhật Thành Công"));
    }
  }
  createKey(data: any) {
    if (this.NewKey) {
      const key: any = {};
      key.key_id = this.keys.length + 1;
      key.key_name = data;
      this.Data[0].keys.push(key)
      this._LangService.updateLang(this.Data[0]).subscribe(()=>this.ngOnInit());
    }
  }
  GetTranslate(translate: any[], lang: any, keys: any) {
    const matchedTranslation = translate.find(
      t => t.language_id === lang.id && t.key_id === keys.key_id
    );
    const translationText = matchedTranslation ? matchedTranslation.translation_text : '';
    return translationText
    //   const tran = [
    //       {
    //           "translation_id": 1,
    //           "language_id": 1,
    //           "key_id": 1,
    //           "translation_text": "Hello"
    //       }
    //   ]

    //  const lang= {
    //     "id": 5,
    //     "code": "fr",
    //     "name": "France"
    // }
    // const keys={
    //   "key_id": 1,
    //   "key_name": "welcome"
    // }
  }

}
