import { Injectable } from '@angular/core';

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
