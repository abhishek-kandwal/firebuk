import { Component, OnInit, OnDestroy } from '@angular/core';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { PostdataService } from '../post-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})

export class ZacebukWallComponent implements OnInit, OnDestroy {

  constructor(private _postsData: FetchJsonDataService,
    private post_form: FormBuilder,
    private route: Router,
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
  totalLikes = [];
  totalComments: any;
  likeId;
  new_post = [];
  postid = 0;
  posts = [];
  postsContent = [];
  user_logged: any;
  isloggedin: boolean;
  // counter;
  postValue = [];
  postList = [];
  counter;
  postData: any;
  fetchPost = [];
  subscription: Subscription;
  likedUserKey = [];
  ngOnInit() {
    this.check.isloggedin.subscribe((val) => {
      this.isloggedin = val;
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    // console.log(this.currentUser.fullName);
    this.subscription = this._postsData.getPost()
      .subscribe(data => {
        let temp;
        this.postList = Object.keys(data);
        this.postValue = Object.values(data);
        this.postList.map((el, index) => {
          let temp1: number;
          try {
            temp1 = Object.values(this.postValue[index].Likes).length;
          } catch (error) {
            console.log('Read Error');
          }
          if (temp1 === undefined) {
            this.totalLikes.push(0);
          } else {
            this.totalLikes.push(temp1);
          }
          temp = data[el].Post_content;
          this.postid = this.postList.length;
          this.postsContent.push(temp);


          let url = `https://example-81cdf.firebaseio.com/Posts/${el}/Likes.json`;

          //this.post_data.pushlikes(url, { Liker_Name: this.currentUser.fullName }).subscribe(() => { });
          // }
          this.subscription = this.post_data.getlikes(url).subscribe(val => {
            try {

              let temp = [];
              temp.push(Object.keys(val));
              let temp1 = Object.values(val);
              // console.log(temp1);
              // console.log(this.currentUser.fullName);

              temp1.map((val, ind) => {
                if (val.Liker_Name === this.currentUser.fullName) {
                  document.getElementById('like'.concat("" + index)).setAttribute("disabled", "true");
                }
              });
            } catch (error) {
              console.log('First like to the post.');
            }

          }
          );

        });
      });

    this.totalLikes.map((val, ind) => {
      document.getElementById(`totallikes${ind}`).innerHTML = `${this.totalLikes[val]}`;
    });
    console.log(this.totalLikes);
    this.postForm = this.post_form.group({
      new_post: ['']
    });

    this.postForm = this.post_form.group({
      new_post: ['']
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
    const time = new Date().toTimeString(), post_Id = this.postid, liker_ID = ' ',
      poster = this.currentUser.fullName, comment_content = ' ', commenter_ID = ' ', commentId = ' ';
    this.postData = {
      Post_content: new_post,
      Time: time,
      Post_ID: post_Id,
      Poster_ID: poster,
      Likes: {

      },
      Comments: {
        Comment_No: {
          Comment_ID: commentId,
          Comment_Content: comment_content,
          Commenter_ID: commenter_ID
        }
      }
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
    this.likeId = (event.currentTarget as Element).id;
    console.log(this.likeId);
    if (this.likeId) {
      console.log('totallikes'.concat(this.likeId.slice(4)));
      document.getElementById('totallikes'.concat(this.likeId.slice(4))).innerHTML = `${this.totalLikes[this.likeId.slice(4)]}`;

      // document.getElementById(this.likeId).setAttribute("disabled", "true");
      const url = `https://example-81cdf.firebaseio.com/Posts/${this.postList[Number(this.likeId.slice(4))]}/Likes.json`;


      this.post_data.pushlikes(url, { Liker_Name: this.currentUser.fullName }).subscribe(() => { });
      // }
      this.subscription = this.post_data.getlikes(url).subscribe(val => {
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
  }
}
