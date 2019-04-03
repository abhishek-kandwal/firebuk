import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {AlertService } from '../_services';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { FetchJsonDataService } from '../fetch-json-data.service';


@Component({
  selector: 'app-zacebuk-signup',
  templateUrl: './zacebuk-signup.component.html',
  styleUrls: ['./zacebuk-signup.component.css']
})
export class ZacebukSignupComponent implements OnInit {
  user: User;
  constructor(
    private fb: FormBuilder,
    public  afAuth: AngularFireAuth,
    private alertService: AlertService,
    private fetch: FetchJsonDataService,
    private router: Router,
    private authService: AuthService) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          this.router.navigate(['/']);
        }
      });
  }
  get fieldValues() {
    return this.employeeForm.controls;
  }
  employeeForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  formRequest;
  newFormReques;
  ngOnInit() {
    this.employeeForm = this.fb.group({
      // second arguements are sync validations, async are passed as third arguement(returns promises/observables)
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15),
         Validators.pattern(/^[a-zA-Z]+/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(80),
      Validators.pattern(/^[A-Za-z0-9._%+-]+@(?!testdomain.com)[A-Za-z0-9.-]+\.[A-Za-z]{1,3}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15),
                    Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]+/)]],
      gender: ['', Validators.required]
    });
    window.addEventListener('online', (event) => {
      // location.reload();
      this.newFormReques = JSON.parse(localStorage.getItem('newUserData'));
      this.onSubmit();
      localStorage.removeItem('newUserData');
    });
  }
  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }
    this.loading = true;
    let {fullName, email, phone, gender} = this.employeeForm.value;
    this.formRequest = {fullName, email, phone, gender};

    if (navigator.onLine) {
      this.authService.register(this.fieldValues.email.value, this.fieldValues.password.value)
      .then(() => {
        this.fetch.put(this.formRequest);
        console.log(this.formRequest);
      });
    } else {
      this.alertService.error('Network Down');
      localStorage.setItem('newUserData', JSON.stringify(this.formRequest));
    }
  }
}
