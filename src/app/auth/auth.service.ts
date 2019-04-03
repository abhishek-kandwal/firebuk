import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { of, Subscription} from 'rxjs';
import { AlertService } from '../_services';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { PostdataService } from '../post-data.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users = this.fetchUser.userData || [];
  userNameData = [];
  userEmailData = [];
  userPhoneData = [];
  userGenderData = [];
  subscription: Subscription;
  currentUserData = [];
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router, private alert: AlertService,
              private fetchUser: FetchJsonDataService,
              private postUser: PostdataService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.subscription = this.fetchUser.getUser().pipe().subscribe(val => {
          const userKey = Object.keys(val);
          userKey.map((ele, index) => {
            this.userNameData[index] = val[ele].fullName;
            this.userEmailData[index] = val[ele].email;
            this.userPhoneData[index] = val[ele].phone;
            this.userGenderData[index] = val[ele].gender;
            if (this.user.email === val[ele].email) {
                this.currentUserData.push({
                  fullName: this.userNameData[index],
                  phone: this.userPhoneData[index],
                  gender: this.userGenderData[index]
              });
                localStorage.setItem('currentUser', JSON.stringify(this.currentUserData));
            }
          });
        });
        // this.router.navigate(['/']);
      } else {
        localStorage.setItem('user', null);
      }
    });
  }


  async login(email: string, password: string) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/']);
  }

  async register(email: string, password: string) {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        setTimeout(() => {
          this.alert.success('Registration Successful', true);
          this.postUser.addUser(this.fetchUser.userData)
            .subscribe(user => this.users.push(user));
          // respond 200 OK
          return of(new HttpResponse({ status: 200 }));
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert(errorCode);
        } else {
          this.alert.error(errorMessage);
        }
      });
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  // async  loginWithGoogle() {
  //   await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  //   this.router.navigate(['/']);
  // }
}