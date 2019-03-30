import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { User } from '../_models';
import { PostdataService } from '../post-data.service';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor  {
    constructor(private fetchData: FetchJsonDataService,
                private addUser: PostdataService) {
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in database for registered users
        const users = ( this.fetchData.userList || []);
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                const filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        username: user.username,
                        email: user.username,
                        fullName: user.name,
                        gender: user.gender,
                        phone: user.phone,
                    };

                    return of(new HttpResponse({ status: 200, body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                const newUser = request.body;
                console.log(newUser);
                // validation
                const duplicateUser = users.filter(user => user.username === newUser.email).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.email + '" is already taken' } });
                }
                // save new user
                newUser.id = users.length + 1;
                this.addUser.addUser(newUser)
                .subscribe(user => users.push(user));
                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // call materialize and dematerialize to ensure delay even if an error is thrown
            // (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
    
};
