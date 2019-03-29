import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  likeId;
  new_post = [];
  postid;
  posts = [];

  //counter;
  postValue=[];
  postList =[];
  constructor(private _postsData: FetchJsonDataService,    
    private post_form: FormBuilder,
    private post_data: PostdataService,
   
    private postsData: FetchJsonDataService,
    private currentuser: CurrentUserService) { }
  counter;
  ngOnInit() {
    //  this.post_data.updatePost().subscribe(()=>{});
    

    this._postsData.getPost()
    .subscribe(data => {
      let temp;
      this.postList = Object.keys(data);
      this.postList.map((el,index)=>{
        console.log(this.postList[index])
        temp=data[el].Post_content;
        this.postid = this.postList.length;
        this.postValue.push(temp);
        console.log(this.postid);
        console.log(this.postList);
        console.log(this.postValue);
        
      })
            
      });
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
  postData: any;
  fetchPost = [];
  subscription: Subscription;




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  get fieldValues() {
    return this.postForm.controls;
  }
  onSubmit(): void {
    console.log(this.currentuser.data);
    const { new_post } = this.postForm.value;
    const like_no = ' ', time = ' ', post_Id = this.postid++, liker_ID = ' ',
    poster = ' ', comment_content = ' ', commenter_ID = ' ', commentId = ' ';
    this.postData = {
      Post_content: new_post,
      Time: time,
      Post_ID: post_Id,
      Poster_ID: poster,
      Likes: {
        Likes_No: {
          Liker_Name: liker_ID
        },
      },
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
      //this.likeId = document.getElementById() as HTMLElement;
      this.likeId = event.target.id;
      console.log(this.postList[Number(this.likeId)]);
      
      let url ='https://example-81cdf.firebaseio.com/Posts/'+this.postList[this.likeId]+'/Likes.json'
      if(this.likeId === this.postid) {
            this.post_data.updatePost(url,{[this.likeId] : {Liker_Name: ' '}}).subscribe(()=>{});
      }
    }
  }

