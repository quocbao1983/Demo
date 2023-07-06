import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@demo/api-interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public translate: TranslateService) {}
}
