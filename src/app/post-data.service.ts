import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Users } from './user';
import { Posts } from './posts';
import {Comments} from './comments';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PostdataService {
  Users: object;
  Posts: object;
  Comments: object;
  url = 'https://example-81cdf.firebaseio.com/Users.json';  // URL to users
  pUrl = 'https://example-81cdf.firebaseio.com/Posts.json'; // URL to posts
  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    private route: Router,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('');
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.url, user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }

  updatePost(url, data) {
    // console.log("done");
    return this.http.put(url, data, httpOptions);


  }
  pushlikes(url, data) {
    return this.http.post(url, data);
  }


  deleteLikes(url) {
    return this.http.delete(url, httpOptions);
  }

  addPost(post: Posts): Observable<Posts> {
    return this.http.post<Posts>(this.pUrl, post, httpOptions)
      .pipe(
        catchError(this.handleError('addPost', post))
      );
  }

  addComment(comment: Comments, url): Observable<Comments> {
    return this.http.post<Posts>(url, comment, httpOptions)
      .pipe(
        catchError(this.handleError('addPost', comment))
      );
  }
}