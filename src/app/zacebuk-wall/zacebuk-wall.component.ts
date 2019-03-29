import { Component, OnInit } from '@angular/core';
import { FetchJsonDataService } from '../fetch-json-data.service';


@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})
export class ZacebukWallComponent implements OnInit {
 postdata: Object;
 postKeys = [];
 postContentKeys = [];
 commentsKeys = [];
 likesKeys = [];
  constructor(private _postsData: FetchJsonDataService) { }
  ngOnInit() {
    this._postsData.getPost()
      .subscribe(data => {
        this.postKeys = Object.keys(data);
        this.postdata = data;
        this.postContentKeys = Object.keys(data[this.postKeys[0]]);
        this.commentsKeys = Object.keys(data[this.postKeys[0]].Comments);
        this.commentsKeys = Object.keys(data[this.postKeys[0]].Comments.testComment1);
        console.log(this.commentsKeys);
        console.log(this.postContentKeys);
        console.log(this.postKeys);
        console.log(this.postdata[this.postKeys[0]]);
        });
  }
  // to get json data. anyone who changes kindly change the function name.
  // samplefn(){
  // this._postsData.getJsonData()
  //     .subscribe(data=>(console.log(data)))
  // }



}
