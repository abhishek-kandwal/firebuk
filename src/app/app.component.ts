import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchJsonDataService } from './fetch-json-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userList = [];
  userNameData = [];
  userEmailData = [];
  userPhoneData = [];
  userGenderData = [];
  userPassData = [];
  userIdData = [];

  constructor(private fetchData: FetchJsonDataService) { }

  ngOnInit() {
    this.subscription = this.fetchData.getUser().pipe().subscribe(val => {
      const userKey = Object.keys(val);
      userKey.map((ele, index) => {
        this.userIdData[index] = val[ele].id;
        this.userNameData[index] = val[ele].fullName;
        this.userEmailData[index] = val[ele].email;
        this.userPhoneData[index] = val[ele].phone;
        this.userGenderData[index] = val[ele].gender;
        this.userPassData[index] = val[ele].password;
        this.userList.push({
          id: this.userIdData[index],
          name: this.userNameData[index],
          username: this.userEmailData[index],
          password: this.userPassData[index],
          phone: this.userPhoneData[index],
          gender: this.userGenderData[index]
        });
      });
    });
    this.fetchData.putData(this.userList);
    console.log(this.userList);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
