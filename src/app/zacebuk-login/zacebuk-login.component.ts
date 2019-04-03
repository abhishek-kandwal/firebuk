import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services';
import { Subscription } from 'rxjs';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-zacebuk-login',
  templateUrl: './zacebuk-login.component.html',
  styleUrls: ['./zacebuk-login.component.css']
})
export class ZacebukLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  userList = [];
  userNameData = [];
  userPassData = [];
  userIdData = [];
  subscription: Subscription;
  user_logged: any;
  isloggedin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth,
    private alertService: AlertService,
    private check: FetchJsonDataService,
    private authService: AuthService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/app-zacebuk-login']);
      }
   });
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get values() { return this.loginForm.controls; }
  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // user loggin code
    //console.log('Login', this.isloggedin);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.authService.login(this.values.username.value, this.values.password.value);
  }
}
