import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Users } from './user';
import { Posts } from './posts';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PostdataService {
  Users: object;
  Posts: object;
  url = 'https://example-81cdf.firebaseio.com/Users.json';  // URL to users
  pUrl = 'https://example-81cdf.firebaseio.com/Posts.json'; // URL to posts
  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('');
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.url, user, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', user))
      );
  }

  addPost(post: Posts): Observable<Posts> {
    return this.http.post<Posts>(this.pUrl , post, httpOptions)
    .pipe(
      retry(5),
      catchError(this.handleError('addPost', post))
    );
  }
}
