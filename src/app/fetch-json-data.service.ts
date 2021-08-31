import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchJsonDataService {
  isloggedin: BehaviorSubject<boolean> = new BehaviorSubject(!!(localStorage.getItem('currentUser')));
  userList = [];
  userData = [];
  postList = [];
  userNameData = [];
  userPassData = [];
  Posts: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('Posts')));
  subscription: Subscription;
  constructor(private http: HttpClient) {}

  urlUser = 'https://firebuk-62b62-default-rtdb.firebaseio.com/Users.json';
  urlPost = 'https://firebuk-62b62-default-rtdb.firebaseio.com/Posts.json';

  getUser() {
    return this.http.get(this.urlUser);
  }

  getPost() {

    return this.http.get(this.urlPost);
  }

  putData(data: any[]) {
    this.userList = data;
  }

  put(data: any[]) {
    this.userData = data;
    console.log(this.userData);
  }

  getlikes(url: string) {
    return this.http.get(url);
  }
}
