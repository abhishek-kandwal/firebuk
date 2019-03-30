import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../_services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-zacebuk-login',
    templateUrl: './zacebuk-login.component.html',
    styleUrls: ['./zacebuk-login.component.css']
})
export class ZacebukLoginComponent implements OnInit , OnDestroy {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    userList = [];
    userNameData = [];
    userPassData = [];
    userIdData = [];
    subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
        
    }
    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    // convenience getter for easy access to form fields
    get values() { return this.loginForm.controls; }
    onSubmit() {
        const passwordHash = btoa(this.values.password.value);
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.values.username.value, passwordHash )
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    console.log(error);
                    this.loading = false;
                });
    }
}
