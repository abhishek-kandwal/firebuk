import { Injectable } from '@angular/core';
import { AuthenticationService, UserService } from './_services';
import { Subscription } from 'rxjs';
import { User } from './_models';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  data;  
  constructor() {
   }

   sendUser(user) {
     this.data = user;
   }
}
