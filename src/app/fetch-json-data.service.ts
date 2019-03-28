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

  urlUser = 'https://example-81cdf.firebaseio.com/Users.json';
  urlPost = 'https://example-81cdf.firebaseio.com/Posts.json';

  getUser() {
    return this.http.get(this.urlUser);
  }

  getPost() {
    return this.http.get(this.urlPost);
  }

  putData(data) {
    this.userList = data;
  }
}
