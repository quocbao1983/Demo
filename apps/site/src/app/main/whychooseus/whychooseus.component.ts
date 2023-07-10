import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../shared/content.service';

@Component({
  selector: 'app-whychooseus',
  templateUrl: './whychooseus.component.html',
  styleUrls: ['./whychooseus.component.css']
})
export class WhychooseusComponent implements OnInit {
  Detail:any={}
  constructor(
    private _route:ActivatedRoute,
    private _ContentService:ContentService
  ) { }
  ngOnInit() {
    this._route.url.subscribe(urlSegments => {
      const path = urlSegments.join('/');
      this._ContentService.getByslug(path).subscribe((data)=>this.Detail = data)
    });
  }
  
}
