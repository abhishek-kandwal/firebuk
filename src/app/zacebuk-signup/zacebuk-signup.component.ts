import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-zacebuk-signup',
  templateUrl: './zacebuk-signup.component.html',
  styleUrls: ['./zacebuk-signup.component.css']
})
export class ZacebukSignupComponent implements OnInit {
  employeeForm:FormGroup;
  constructor(private fb:FormBuilder){}
 
   ngOnInit() {
     this.employeeForm= this.fb.group({
       //second arguements are sync validations, async are passed as third arguement(returns promises/observables)
 
       fullName:[' ', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],  
       email:[' ',[Validators.required, Validators.email]],
       password:[' ', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]]
       
     });
    
   }
   onSubmit():void{
     console.log(this.employeeForm.value);
   }

}
