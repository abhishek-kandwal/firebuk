import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PostDataFetchService {

  constructor( private postData: HttpClient) {}

  apiUrl:string = 'https://example-81cdf.firebaseio.com/.json';

  getPost(){
    return this.postData.get(this.apiUrl);
  }
}
