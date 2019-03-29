import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { FetchJsonDataService } from '../fetch-json-data.service';

@Component({
  selector: 'app-zacebuk-header',
  templateUrl: './zacebuk-header.component.html',
  styleUrls: ['./zacebuk-header.component.css']
})

export class ZacebukHeaderComponent implements OnInit {

  user_logged:any;
  isloggedin:boolean;

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

    // this below code is for the check the user is logged in or not
    this.user_logged=localStorage.getItem('currentUser');
    if(this.user_logged){
      this.isloggedin=true;
    }else{
      this.isloggedin=false;
    }
    console.log('Logout',this.isloggedin);
    

}
}
