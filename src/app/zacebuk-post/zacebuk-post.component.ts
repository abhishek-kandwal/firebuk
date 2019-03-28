import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PostdataService } from '../post-data.service';

@Component({
  selector: 'app-zacebuk-post',
  templateUrl: './zacebuk-post.component.html',
  styleUrls: ['./zacebuk-post.component.css']
})
export class ZacebukPostComponent implements OnInit {

  postForm: FormGroup;
  posts = [];
  constructor(
    private fb: FormBuilder,
    private postData: PostdataService,){
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      
      post : ['', Validators.required ],
      
    });

  }
  get fieldValues() {
    return this.postForm.controls;
  }
  onSubmit(): void {
    console.log(this.postForm.value);
    
    this.postForm.reset();
  }

}
