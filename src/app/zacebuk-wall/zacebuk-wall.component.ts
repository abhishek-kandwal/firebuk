import { Component, OnInit } from '@angular/core';
import { FetchJsonDataService } from '../fetch-json-data.service';


@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})
export class ZacebukWallComponent implements OnInit {
  postdata;
  postList=[];
  //counter;
  postValue=[];
  constructor(private _postsData: FetchJsonDataService) { }
  counter;
  ngOnInit() {
    this._postsData.getPost()
    .subscribe(data => {
      let temp;
      this.postList = Object.keys(data);
      this.postList.map((el,index)=>{
        temp = data[el]['Post_content'];
        this.postValue.push(temp);
        console.log(this.postList);
        console.log(this.postValue);
        
      })
            
      });
      
  }
  // to get json data. anyone who changes kindly change the function name.
  // samplefn(){
  // this._postsData.getJsonData()
  //     .subscribe(data=>(console.log(data)))
  // }



}
