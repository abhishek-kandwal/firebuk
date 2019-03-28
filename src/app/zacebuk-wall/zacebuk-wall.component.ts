import { Component, OnInit } from '@angular/core';
import { PostDataFetchService } from '../post-data-fetch.service'

@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})
export class ZacebukWallComponent implements OnInit {

  constructor(private _postData:PostDataFetchService) { }

  public testData:any;
  ngOnInit() {
    this._postData.getPost()
    .subscribe(data=> console.log( data))
  }

}
