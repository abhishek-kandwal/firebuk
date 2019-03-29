import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { PostdataService } from '../post-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})
export class ZacebukWallComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  totalLikes: any;
  totalComments: any;
  posts = [];
  postData: any;
  fetchPost = [];
  commentNoLength: number;
  likeNoLength: number;
  commentKey: number | string[];
  likesKey: number;
  postlength;
  commentLength;
  likeValue: number;
  subscription: Subscription;
  constructor(
    private post_form: FormBuilder,
    private post_data: PostdataService,
  ) { }

  ngOnInit() {
    this.postForm = this.post_form.group({
      new_post: ['']
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get fieldValues() {
    return this.postForm.controls;
  }
  onSubmit(): void {
    const { new_post } = this.postForm.value;
    const like_no = ' ', time = ' ', post_Id = this.postlength + 1, liker_ID = ' ',
    poster = ' ', comment_content = ' ', commenter_ID = ' ', commentId = this.commentLength + 1;
    this.postData = {
      Post_content: new_post,
      Time: time,
      Post_ID: post_Id,
      Poster_ID: poster,
      Likes: {
        1: {
          Liker_Name: liker_ID
        },
      },
      Comments: {
        1: {
          Comment_ID: commentId,
          Comment_Content: comment_content,
          Commenter_ID: commenter_ID
        }
      }
    };

    this.post_data.addPost(this.postData)
      .subscribe(post => this.posts.push(post));
    this.postForm.reset();

  }
}
