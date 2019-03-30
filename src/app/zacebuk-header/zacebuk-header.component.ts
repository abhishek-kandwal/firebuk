import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { MessagingService } from '../messaging.service';
=======
import { FetchJsonDataService } from '../fetch-json-data.service';
>>>>>>> cb54102f7f09ff53881a56ce4f01d0ea0f1e7b61

@Component({
  selector: 'app-zacebuk-header',
  templateUrl: './zacebuk-header.component.html',
  styleUrls: ['./zacebuk-header.component.css']
})

export class ZacebukHeaderComponent implements OnInit {

<<<<<<< HEAD
  constructor(private authenticationService: AuthenticationService,
    private router: Router, private messagingService: MessagingService) { }
  message;
  sendPushNotification() {
    const userId = '2222';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.messagingService.sendPushMessage('Web push notification', 'HI, Firebase test messsage');
  }
=======
  user_logged:any;
  isloggedin:boolean;
>>>>>>> cb54102f7f09ff53881a56ce4f01d0ea0f1e7b61

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private check:FetchJsonDataService
            ) { }
  ngOnInit() {
    this.check.isloggedin.subscribe((val)=>{
      this.isloggedin=val;
    })
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/app-zacebuk-login']);
<<<<<<< HEAD
  }
=======

    // this below code is for the check the user is logged in or not
    this.user_logged=localStorage.getItem('currentUser');
    if(this.user_logged){
      this.isloggedin=true;
    }else{
      this.isloggedin=false;
    }
    console.log('Logout',this.isloggedin);
    

}
>>>>>>> cb54102f7f09ff53881a56ce4f01d0ea0f1e7b61
}
