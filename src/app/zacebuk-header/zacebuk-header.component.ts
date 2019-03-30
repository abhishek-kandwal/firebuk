import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-zacebuk-header',
  templateUrl: './zacebuk-header.component.html',
  styleUrls: ['./zacebuk-header.component.css']
})
export class ZacebukHeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router, private messagingService: MessagingService) { }
  message;
  // sendPushNotification() {
    

  //   this.messagingService.sendPushMessage('FIREBUK NOTIFICATIONS', 'Hey Everyone, Greetings from the team');
  // }

  ngOnInit() {
    const userId = '22';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/app-zacebuk-login']);
  }
}
