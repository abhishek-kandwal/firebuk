import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchJsonDataService {

  constructor(private http:HttpClient) { }

  apiUrl : string = 'https://example-81cdf.firebaseio.com/.json';

  getJsonData(){
    return this.http.get(this.apiUrl);
  }

  postData(data){
    return this.http.post(this.apiUrl,data)
  }
}
