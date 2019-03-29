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
  postdata;
  postList=[];
  postForm: FormGroup;
  new_post = [];
  posts = [];
  //counter;
  postValue=[];
  constructor(private _postsData: FetchJsonDataService,    
    private post_form: FormBuilder,
    private post_data: PostdataService) { }
  counter;
  ngOnInit() {
     this.post_data.updatePost().subscribe(()=>{});
    

    this._postsData.getPost()
    .subscribe(data => {
      let temp;
      this.postList = Object.keys(data);
      this.postList.map((el,index)=>{
        temp = data[el]['Post_content'];
        this.postValue.push(temp);
        console.log(this.postList);
        console.log(this.postValue);
        
      })
            
      });
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