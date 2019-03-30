import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { PostdataService } from '../post-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})

export class ZacebukWallComponent implements OnDestroy, OnInit {

  constructor(private _postsData: FetchJsonDataService,
              private post_form: FormBuilder,
              private post_comment: FormBuilder,
              private route: Router,
              private alertService: AlertService,
              private fetchLikes: FetchJsonDataService,
              private post_data: PostdataService,
              private postsData: FetchJsonDataService,
              private currentuser: CurrentUserService,
              private check: FetchJsonDataService
  ) { }

  get fieldValues() {
    return this.postForm.controls;
  }
  currentUser;
  postForm: FormGroup;
  commentForm: FormGroup;
  totalLikes = [];
  totalComments = [];
  likeId;
  new_post = [];
  new_comment = [];
  postid = 0;
  posts = [];
  comments = [];
  postsContent = [];
  user_logged: any;
  isloggedin: boolean;
  postValue = [];
  postList = [];
  counter;
  postData: any;
  commentData: any;
  fetchPost = [];
  subscription: Subscription;
  likedUserKey = [];
  ngOnInit() {
    this.check.isloggedin.subscribe((val) => {
      this.isloggedin = val;
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.subscription = this._postsData.getPost()
      .subscribe(data => {
        let temp;
        this.postList = Object.keys(data);
        this.postValue = Object.values(data);
        this.postList.map((el, index) => {
          let temp1: number;
          let temp2: number;
          try {
            temp1 = Object.values(this.postValue[index].Likes).length;
            temp2 = Object.values(this.postValue[index].Comments).length;
          } catch (error) {
            console.log('Read Error');
          }
          this.totalLikes.push(temp1);
          this.totalComments.push(temp2);

          // if (temp2 === undefined) {
          //   this.totalComments.push(0);
          // } else {
          //   this.totalComments.push(temp2);
          // }
          temp = data[el].Post_content;
          this.postid = this.postList.length;
          this.postsContent.push(temp);


          const url = `https://example-81cdf.firebaseio.com/Posts/${el}/Likes.json`;
          const cUrl = `https://example-81cdf.firebaseio.com/Posts/${el}/Comments.json`;
          this.subscription = this.fetchLikes.getlikes(url).subscribe(val => {
            try {
              const temp = [];
              temp.push(Object.keys(val));
              const temp1 = Object.values(val);
              console.log(temp1);
              temp1.map((val, ind) => {
                if (val.Liker_Name === this.currentUser.fullName) {
                  console.log(val.Liker_Name);
                  document.getElementById('like'.concat('' + index)).setAttribute('disabled', 'true');
                }
              });
            } catch (error) {
              console.log('First like to the post.');
            }

          }
          );

        });
      });
    // console.log(this.totalLikes);

    this.totalLikes.map((val, ind) => {
      // console.log(`totallikes${ind}`);
      document.getElementById(`totallikes${ind}`).innerHTML = `${this.totalLikes[val]}`;
    });

    this.totalComments.map((val, ind) => {
      // console.log(`totallikes${ind}`);
      document.getElementById(`totalcomments${ind}`).innerHTML = `${this.totalComments[val]}`;
    });
    console.log(this.totalLikes);
    this.postForm = this.post_form.group({
      new_post: ['']
    });

    this.commentForm = this.post_comment.group({
      new_comment: ['']
    });

    this.subscription = this.postsData.getPost().subscribe(val => {
      this.fetchPost.push(val);
    });


  }
  ngOnDestroy() {

    this.subscription.unsubscribe();
  }
  onSubmit(): void {
    console.log(this.currentuser.data);
    const { new_post } = this.postForm.value;
    // tslint:disable-next-line: one-variable-per-declaration
    const time = new Date().toTimeString(), post_Id = this.postid,
      poster = this.currentUser.fullName;
    this.postData = {
      Post_content: new_post,
      Time: time,
      Post_ID: post_Id,
      Poster_ID: poster
    };

    this.subscription = this.post_data.addPost(this.postData)
      .subscribe(post => {
        this.posts.push(post);
        window.location.reload();
      });
    this.postForm.reset();

  }

  // Likes Function
  likes(event: { currentTarget: Element; }) {
    if (this.isloggedin) {
      this.likeId = (event.currentTarget as Element).id;
      console.log(this.likeId);
      if (this.likeId) {
        console.log('totallikes'.concat(this.likeId.slice(4)));
        document.getElementById('totallikes'.concat(this.likeId.slice(4))).innerHTML = `${this.totalLikes[this.likeId.slice(4)]}`;
        // document.getElementById(this.likeId).setAttribute("disabled", "true");
        const url = `https://example-81cdf.firebaseio.com/Posts/${this.postList[Number(this.likeId.slice(4))]}/Likes.json`;
        this.post_data.pushlikes(url, { Liker_Name: this.currentUser.fullName }).subscribe(() => { });
        // }
        this.subscription = this.fetchLikes.getlikes(url).subscribe(val => {
          try {
            const temp = [];
            temp.push(Object.keys(val));
            const temp1 = Object.values(val);
            console.log(temp1);
          } catch (error) {
            console.log('First like to the post.');
            location.reload();
          }
        }
        );
      }
    } else {
      window.alert('Please Login');
    }

  }

  comment(event: { currentTarget: Element; }) {
    const commentId = (event.currentTarget as Element).id;
    console.log(commentId);
    const { new_comment } = this.commentForm.value;
    this.commentData = {
      Comment_Content: new_comment,
      Time: new Date().toTimeString(),
      Commenter_ID: this.currentUser.fullName
    };
    const curl = `https://example-81cdf.firebaseio.com/Posts/${this.postList[Number(commentId.slice(7))]}/Comments.json`;

    this.subscription = this.post_data.addComment(this.commentData, curl)
      .subscribe(comment => {
        this.comments.push(comment);
        location.reload();
      });
  }
}
