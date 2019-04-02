import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { MessagingService } from '../messaging.service';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-zacebuk-header',
  templateUrl: './zacebuk-header.component.html',
  styleUrls: ['./zacebuk-header.component.css']
})

export class ZacebukHeaderComponent implements OnInit {
  message;
  user_logged: any;
  isloggedin: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private messagingService: MessagingService,
              private check: FetchJsonDataService,
              private  authService: AuthService) { }
  
  // sendPushNotification() {
  //   this.messagingService.sendPushMessage('FIREBUK NOTIFICATIONS', 'Hey Everyone, Greetings from the team');
  // }

  ngOnInit() {
    const userId = '22';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    this.check.isloggedin.subscribe((val) => {
      this.isloggedin = val;
      console.log(this.isloggedin);
    });
  }
  logout() {
    this.authService.logout();
    // this below code is for the check the user is logged in or not
    this.user_logged = localStorage.getItem('user');
    this.isloggedin = false;
    console.log('Logout', this.isloggedin);
    this.router.navigate(['/app-zacebuk-login']);
  }
}
