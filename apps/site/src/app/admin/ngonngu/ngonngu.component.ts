import { Component, OnInit } from '@angular/core';
import { CauhinhService } from '../../shared/cauhinh.service';
import { LangService } from '../../shared/lang.service';
import { NotifierService } from 'angular-notifier';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-ngonngu',
  templateUrl: './ngonngu.component.html',
  styleUrls: ['./ngonngu.component.css']
})
export class NgonnguComponent implements OnInit {
  Data: any = {}
  NewKey: any;
  lang: any[] = []
  keys: any[] = []
  translate: any[] = []
  constructor(
    private _LangService: LangService,
    private _NotifierService: NotifierService,
    private _AdminComponent: AdminComponent,
  ) { }
  ngOnInit() {
      this.NewKey="";
      this._LangService.getAll().subscribe(data => {
      this.Data = data
      this.lang = this.Data[0].lang
      this.keys = this.Data[0].keys
      this.translate = this.Data[0].translate 
      console.log(data);
           
      // this.keys = data.Data.keys
    }
    )
  }
  Change(translate: any[]) {
    this.Data[0].translate = translate
    this._LangService.updateLang(this.Data[0]).subscribe(()=>this._NotifierService.notify("success","Update Success"));
  }
  createKey(data: any) {
    if (this.NewKey) {
      const translate: any = {};
      translate.id = this.translate.length + 1;
      translate.key_name = data;
      this.lang.forEach(v => {
        translate[v.code]=''
      });
      this.Data[0].translate.push(translate)
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
  CloseDrawer()
  {
    this._AdminComponent.drawer.toggle();
  }
}