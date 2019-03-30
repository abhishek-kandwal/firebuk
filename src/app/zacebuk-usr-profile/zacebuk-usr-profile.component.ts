import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../_models';
import { AuthenticationService} from '../_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zacebuk-usr-profile',
  templateUrl: './zacebuk-usr-profile.component.html',
  styleUrls: ['./zacebuk-usr-profile.component.css']
})
export class ZacebukUsrProfileComponent implements OnInit, OnDestroy {
  title = 'Hello!';
  keys = [];
  data = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  subscription: Subscription;
  constructor(
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.data.push(this.currentUser);
      this.keys = Object.keys(this.currentUser);
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
