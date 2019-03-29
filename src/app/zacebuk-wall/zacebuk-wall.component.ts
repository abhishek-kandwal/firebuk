import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { PostdataService } from '../post-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrentUserService } from '../current-user.service';


@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})
export class ZacebukWallComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  totalLikes: any;
  totalComments: any;
  new_post = [];
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
    private postsData: FetchJsonDataService,
    private currentuser: CurrentUserService
  ) { }

  ngOnInit() {
    this.postForm = this.post_form.group({
      new_post: ['']
    });
    this.subscription = this.postsData.getPost().subscribe(val => {
      this.fetchPost.push(val);
      this.postlength = Object.values(this.fetchPost).length;
      console.log(this.fetchPost);
      if (this.fetchPost.length === 0) {
        this.fetchPost.map((ele, index) => {
          this.commentLength = Object.keys(ele[index].Comments).length;
          this.commentNoLength = Object.keys(ele[index].Comments).length;
          this.commentKey = Object.keys(ele[index].Comments);
          this.commentKey = Number(this.commentKey) + 1;
          this.likeNoLength = Object.keys(ele[index].Likes).length;
          this.likesKey = Number(this.likeNoLength) + 1;
          this.likeValue = this.likeNoLength;
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get fieldValues() {
    return this.postForm.controls;
  }
  onSubmit(): void {
    console.log(this.currentuser.data);
    const { new_post } = this.postForm.value;
    const like_no = ' ', time = ' ', post_Id = this.postlength + 1, liker_ID = ' ',
    poster = this.currentuser.data.id, comment_content = ' ', commenter_ID = ' ', commentId = this.commentLength + 1;
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

  likes() {
    this.totalLikes = this.likeValue;
    const postId = ( document.getElementById('this.postData.Post_ID') as HTMLInputElement).value;
    // this.fetchPost.Post_ID[postId] = ++this.totalLikes;
  }

  comments() {
    this.totalComments = this.postData.Comments.length;
    const commentId = ( document.getElementById('this.postData.Comments.Comment_No.Commenter_ID') as HTMLInputElement).value;
    this.postData.Likes.Like_no = ++this.totalLikes;
  }

}