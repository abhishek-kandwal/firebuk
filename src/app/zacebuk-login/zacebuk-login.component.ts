import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../_services';
import { Subscription } from 'rxjs';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { AuthService } from '../auth/auth.service';

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
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private check: FetchJsonDataService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
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
    this.authService.login(this.values.username.value, this.values.password.value);
    //console.log(this.check.isloggedin)
    this.check.isloggedin.next(true);
    this.check.isloggedin.subscribe((val) => {
      this.user_logged = val;
    });
    console.log(this.user_logged)
    // = this.check.isloggedin;

    if (this.user_logged) {
      this.isloggedin = true;
    } else {
      this.isloggedin = false;
    }
    //this.router.navigate([this.returnUrl]);
  }
}
