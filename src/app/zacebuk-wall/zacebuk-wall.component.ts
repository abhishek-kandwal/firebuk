import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  constructor(private _postsData: FetchJsonDataService,
              private post_form: FormBuilder,
              private post_data: PostdataService,
              private postsData: FetchJsonDataService, ) { }
  get fieldValues() {
    return this.postForm.controls;
  }
  postForm: FormGroup;
  totalLikes = [];
  totalComments: any;
  likeId;
  new_post = [];
  postid = 0;
  posts = [];
  postsContent = [];
  // counter;
  postValue = [];
  postList = [];
  counter;
  postData: any;
  fetchPost = [];
  subscription: Subscription;
  ngOnInit() {
    this._postsData.getPost()
      .subscribe(data => {
        let temp;
        this.postList = Object.keys(data);
        this.postValue = Object.values(data);
        this.postList.map((el, index) => {
          const temp1 = Object.values(this.postValue[index].Likes).length;
          this.totalLikes.push(temp1);
          temp = data[el].Post_content;
          this.postid = this.postList.length;
          this.postsContent.push(temp);

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
    const { new_post } = this.postForm.value;
    // tslint:disable-next-line: one-variable-per-declaration
    const time = ' ', post_Id = this.postid, liker_ID = ' ',
      poster = ' ', comment_content = ' ', commenter_ID = ' ', commentId = ' ';
    this.postData = {
      Post_content: new_post,
      Time: time,
      Post_ID: post_Id,
      Poster_ID: poster,
      Likes: ' ',
      Comments: {
        Comment_No: {
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

  likes(event) {

    this.likeId = event.target.id;
    if (this.likeId) {
      console.log('totallikes'.concat(this.likeId.slice(4)));
      document.getElementById('totallikes'.concat(this.likeId.slice(4))).innerHTML = `${this.totalLikes[this.likeId.slice(4)]}`;
      // console.log(this.postList[Number(this.likeId)]);  [this.likeId]:

      const url = `https://example-81cdf.firebaseio.com/Posts/${this.postList[Number(this.likeId.slice(4))]}/Likes.json`;
      // if (this.likeId === this.postid) {
      this.post_data.updatePost(url, { Liker_Name: 'Dev' }).subscribe(() => { });
      // }
    }
  }
}
