import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PostdataService } from '../post-data.service';

@Component({
  selector: 'app-zacebuk-signup',
  templateUrl: './zacebuk-signup.component.html',
  styleUrls: ['./zacebuk-signup.component.css']
})
export class ZacebukSignupComponent implements OnInit {
  employeeForm: FormGroup;
  users = [];
  constructor(private fb: FormBuilder, private postData: PostdataService) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      // second arguements are sync validations, async are passed as third arguement(returns promises/observables)
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      phone: [''],
      gender: ['']
    });

  }
  get fieldValues() {
    return this.employeeForm.controls;
  }
  onSubmit(): void {
    console.log(this.employeeForm.value);
    const {fullName, email, password, phone, gender} = this.employeeForm.value;
    console.log(fullName);
    if (gender === 'male') {
      const formRequest = {fullName, email, password, phone, gender};
      this.postData.addUser(formRequest)
      .subscribe(user => this.users.push(user));
    } else {
      const formRequest = {fullName, email, password, phone, gender};
      this.postData.addUser(formRequest)
      .subscribe(user => this.users.push(user));
    }
    this.employeeForm.reset();
  }

}
