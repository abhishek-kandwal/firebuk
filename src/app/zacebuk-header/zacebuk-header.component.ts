import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from '../messaging.service';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-zacebuk-header',
  templateUrl: './zacebuk-header.component.html',
  styleUrls: ['./zacebuk-header.component.css']
})

export class ZacebukHeaderComponent implements OnInit {
  message;
  user_logged: any;
  isloggedin: boolean;
  currentUserData;
  picUrl;
  subscription: Subscription;
  user: User;

  constructor(private router: Router, private messagingService: MessagingService,
              private check: FetchJsonDataService,
              private  authService: AuthService,
              private afAuth: AngularFireAuth) {
                this.subscription = this.afAuth.authState.subscribe(user => {
                  if (user) {
                    this.user = user;
                    this.picUrl = this.user.email;
                    this.currentUserData  = JSON.parse(localStorage.getItem('currentUser'));
                  }
                });
               }

  sendPushNotification() {

    this.messagingService.sendPushMessage('FIREBUK NOTIFICATIONS', 'Hey Everyone, Greetings from the team');
  }

  ngOnInit() {
    const userId = '22';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    this.check.isloggedin.subscribe((val) => {
      this.isloggedin = val;
    });
  }
  logout() {
    this.authService.logout();
    // this below code is for the check the user is logged in or not
    this.user_logged = localStorage.getItem('user');
    this.isloggedin = false;
    this.router.navigate(['/app-zacebuk-login']);
  }

  reload() {
    this.router.navigate(['/']);
    setTimeout(() => {
      location.reload();
    }, 0);
  }
}
