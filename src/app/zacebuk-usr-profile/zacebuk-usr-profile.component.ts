import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AlertService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-zacebuk-usr-profile',
  templateUrl: './zacebuk-usr-profile.component.html',
  styleUrls: ['./zacebuk-usr-profile.component.css']
})
export class ZacebukUsrProfileComponent implements OnInit, OnDestroy {
  keys = [];
  data = [];
  loading = false;
  user: User;
  subscription: Subscription;
  updateForm: FormGroup;
  constructor(
    public afAuth: AngularFireAuth, public router: Router,  private fb: FormBuilder,
    private alert: AlertService) {
  }

  ngOnInit() {
    this.subscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.data.push(this.user);
        this.keys = Object.keys(this.user);
      } else {
        this.router.navigate(['/app-zacebuk-login']);
      }
    });

    this.updateForm = this.fb.group({
      // second arguements are sync validations, async are passed as third arguement(returns promises/observables)
      name: ['', [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(80),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      photo: ['']
    });
  }

  get fieldValues() {
    return this.updateForm.controls;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateDetails() {
    document.getElementById('updateDetails').style.display = 'block';
  }

  onSubmit() {
    this.loading = true;
    const user = this.afAuth.auth.currentUser;
    user.updateProfile({
      displayName: this.fieldValues.name.value,
      photoURL: this.fieldValues.photo.value,
    }).then(() => {
      this.alert.success('Details Updated', true);
    }).catch ((error) => {
      this.alert.error(error);
    });
    document.getElementById('updateDetails').style.display = 'none';
  }
}
