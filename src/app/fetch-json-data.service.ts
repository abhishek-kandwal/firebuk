import { Injectable, OnDestroy } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchJsonDataService {
  userList = [];
  userNameData = [];
  userPassData = [];
  subscription: Subscription;
  constructor(private http: HttpClient) { }

  apiUrl = 'https://example-81cdf.firebaseio.com/Users.json';

  getJsonData() {
    return this.http.get(this.apiUrl);
  }

  postData(data) {
    return this.http.post(this.apiUrl, data);
  }
}
