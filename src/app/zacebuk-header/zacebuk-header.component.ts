import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { MessagingService } from '../messaging.service';
import { FetchJsonDataService } from '../fetch-json-data.service';

@Component({
  selector: 'app-zacebuk-header',
  templateUrl: './zacebuk-header.component.html',
  styleUrls: ['./zacebuk-header.component.css']
})

export class ZacebukHeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private messagingService: MessagingService,
              private check: FetchJsonDataService) { }
  message;
  user_logged: any;
  isloggedin: boolean;
  sendPushNotification() {
    const userId = '22';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.messagingService.sendPushMessage('FIREBUK NOTIFICATIONS', 'Hey Everyone, Greetings from the team');
  }

  ngOnInit() {
    this.check.isloggedin.subscribe((val) => {
      this.isloggedin = val;
    });
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    location.reload();

    // this below code is for the check the user is logged in or not
    this.user_logged = localStorage.getItem('currentUser');
    if (this.user_logged) {
      this.isloggedin = true;
    } else {
      this.isloggedin = false;
    }
    console.log('Logout', this.isloggedin);
}
}
