import { Component, OnInit } from '@angular/core';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { PostdataService } from '../post-data.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})
export class ZacebukWallComponent implements OnInit {
  postForm: FormGroup;
  new_post = [];
  posts = [];
  constructor(
    private post_form: FormBuilder,
    private post_data: PostdataService,
  ) { }

  ngOnInit() {
    this.postForm = this.post_form.group({
      new_post: ['']
    });
  }
  get fieldValues() {
    return this.postForm.controls;
  }
  onSubmit(): void {
    const { new_post } = this.postForm.value;
    const like_no = ' ', time = ' ', post_Id = ' ', liker_ID = ' ',
      comment_content = ' ', commenter_ID = ' ';
    const postData = {
      Post_content: new_post,
      Time: time,
      Post_ID: post_Id,
      Likes: {
        Like_no: like_no,
        Liker_IDS: {
          Liker_Name: liker_ID
        },
      },
      Comments: {
        Comment_No: {
          Comment_Content: comment_content,
          Commenter_ID: commenter_ID
        }
      }
    }
    this.post_data.addPost(postData)
      .subscribe(post => this.posts.push(post));
    this.postForm.reset();
  }
}