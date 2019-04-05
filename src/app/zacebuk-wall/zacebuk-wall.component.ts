import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FetchJsonDataService } from '../fetch-json-data.service';
import { PostdataService } from '../post-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../_services';


@Component({
  selector: 'app-zacebuk-wall',
  templateUrl: './zacebuk-wall.component.html',
  styleUrls: ['./zacebuk-wall.component.css']
})


export class ZacebukWallComponent implements OnInit, OnDestroy {


  constructor(private _postsData: FetchJsonDataService,
    private post_form: FormBuilder,
    private post_comment: FormBuilder,
    private route: Router,
    private AppComponent: AppComponent,
    private fetchLikes: FetchJsonDataService,
    private post_data: PostdataService,
    private postsData: FetchJsonDataService,
    private currentuser: CurrentUserService,
    private check: FetchJsonDataService,
  ) { }
  commentboxid;
  temparray;
  isLiked: boolean[] = [];
  likerlist3: any[] = []; likerlist: any[] = [];
  likerlist1: any[] = [];
  commenterlist: any[] = [];
  commenterlist1: any[] = [];
  commentValue = [];
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
  modid;
  commentData: any;
  fetchPost = [];
  subscription: Subscription;
  likedUserKey = [];
  posterId = [];
  isCollapsed = true;
  delKeys = [];
  commentFlag = false;

  ngOnInit() {

    setTimeout(() => {
      if (document.getElementById('message')) {
        document.getElementById('message').style.display = 'none';
      }
    }, 7000);
    this.check.isloggedin.subscribe((val) => {
      this.isloggedin = val;
    });
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))[0];
    }
    try {
      this.subscription = this._postsData.getPost()
        .subscribe(data => {
          let temp;
          let templikes;
          this.postList = Object.keys(data);
          this.postValue = Object.values(data);
          this.postList.map((el, index) => {
            let temp1: number;
            let temp2: number;
            try {
              temp1 = Object.values(this.postValue[index].Likes).length;
              templikes = Object.values(this.postValue[index].Likes);
              temp2 = Object.values(this.postValue[index].Comments).length;
            } catch (error) {
              console.log('Read Error');
            }
            this.totalLikes.push((temp1) || 0);
            this.totalComments.push((temp2) || 0);
            temp = data[el].Post_content;
            const temp3 = data[el].Poster_ID;
            this.posterId.push(temp3);
            this.postid = this.postList.length;
            this.postsContent.push(temp);
            this.postsContent = this.postsContent;
            const url = `https://example-81cdf.firebaseio.com/Posts/${el}/Likes.json`;
            const cUrl = `https://example-81cdf.firebaseio.com/Posts/${el}/Comments.json`;
            this.subscription = this.fetchLikes.getlikes(url).subscribe(val => {
              try {
                const temp = [];
                temp.push(Object.keys(val));
                const temp1 = Object.values(val);
                temp1.map((val, ind) => {
                  if (this.currentUser.fullName) {
                    if (val.Liker_Name === this.currentUser.fullName) {
                      this.isLiked[index] = true;

                      document.getElementById('like'.concat('' + index)).setAttribute('style', 'background-color:red');
                    } else {
                      this.isLiked[index] = false;
                    }
                  } else {
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

      let temp1;

      this.fetchLikes.getPost().subscribe((val) => {
        temp1 = Object.values(val);
        temp1.map((ele, inde) => {

          if (ele.Likes) {
            this.delKeys.push(Object.keys(ele.Likes));
            this.likerlist.push(Object.values(ele.Likes));
          } else {
            this.delKeys.push(['false']);
            this.likerlist.push(['false']);
            console.log('Likes not found');

          }

          if (ele.Comments) {
            const cc = [];
            const cid = [];
            const co = Object.values(ele.Comments);
            co.map((valuee, indexee) => {
              cc[indexee] = valuee['Comment_Content'];
              cid[indexee] = valuee['Commenter_ID'];
            });
            this.commenterlist.push(cid);
            this.commentValue.push(cc);
          } else {
            this.commenterlist.push(0);
            this.commentValue.push(0);
          }
        });
      });
      this.totalLikes.map((val, ind) => {
        // console.log(`totallikes${ind}`);
        document.getElementById(`totallikes${ind}`).innerHTML = `${this.totalLikes[val]}`;
      });

      this.totalComments.map((val, ind) => {
        // console.log(`totallikes${ind}`);
        document.getElementById(`totalcomments${ind}`).innerHTML = `${this.totalComments[val]}`;
      });
      this.postForm = this.post_form.group({
        new_post: ['']
      });

      this.commentForm = this.post_comment.group({
        new_comment: ['', Validators.required]
      });

      this.subscription = this.postsData.getPost().subscribe(val => {
        this.fetchPost.push(val);
      });
    } catch (error) {
      console.log('Read Error');

    }
  }

  openModal(event: { currentTarget: Element; }) {
    this.modid = (event.currentTarget as Element).id;
    const tempFlag = !this.commentFlag;
    if (tempFlag) {
      document.getElementById('mod'.concat(this.modid.slice(10))).style.display = 'block';
      this.commentFlag = true;
    } else {
      this.commentFlag = false;
      document.getElementById('mod'.concat(this.modid.slice(10))).style.display = 'none';
    }
  }

  cOpenModal(event: { currentTarget: Element; }) {
    this.modid = (event.currentTarget as Element).id;
    const tempFlag = !this.commentFlag;
    if (tempFlag) {
      document.getElementById('cmod'.concat(this.modid.slice(12))).style.display = 'block';
      this.commentFlag = true;
    } else {
      this.commentFlag = false;
      document.getElementById('cmod'.concat(this.modid.slice(12))).style.display = 'none';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmit(): void {
    console.log(this.currentuser.data);
    const { new_post } = this.postForm.value;
    const time = new Date(), post_Id = this.postid,
      poster = this.currentUser.fullName;
    this.postData = {
      Post_content: new_post,
      Time: time,
      Post_ID: post_Id,
      Poster_ID: poster
    };

    this.subscription = this.post_data.addPost(this.postData)
      .subscribe(post => {
        location.reload();
        //   let noUse = new AppComponent( this.fetchData, this.authenticationService, this.setUser);
      });
    this.postForm.reset();
  }

  // Likes Function
  likes(event: { currentTarget: Element; }) {
    if (this.isloggedin) {
      // this.ngOnInit();
      for (let i = 0; i < this.likerlist.length; i++) {
        const a = this.likerlist[i].length;
        const temp = [];
        for (let j = 0; j < a; j++) {
          console.log(this.likerlist[i][j].Liker_Name);

          if (this.likerlist[i][j].Liker_Name) {
            temp[j] = this.likerlist[i][j].Liker_Name;
          } else {
            temp[j] = false;
          }

        }
        this.likerlist1.push(temp);

      }
      // for end
      this.likeId = (event.currentTarget as Element).id;
      console.log(this.likeId);
      let temp1d = this.likeId.slice(4);
      if (this.likeId) {
        if (this.isLiked[temp1d]) {
          console.log(this.isLiked[temp1d]);
          console.log(this.likerlist);
          console.log(this.likerlist1);
          console.log(this.likerlist3);
          const likerindex = this.likerlist1[temp1d].indexOf(this.currentUser.fullName);
          const dislikekey = this.delKeys[temp1d][likerindex];
          const delurl = `https://example-81cdf.firebaseio.com/Posts/${this.postList[Number(this.likeId.slice(4))]}/Likes/${dislikekey}.json`;
          this.post_data.deleteLikes(delurl).subscribe(() => {
            //this.ngOnInit();
            console.log('disliked');
            location.reload();
          });
        } else {
          const url = `https://example-81cdf.firebaseio.com/Posts/${this.postList[Number(this.likeId.slice(4))]}/Likes.json`;

          this.post_data.pushlikes(url, { Liker_Name: this.currentUser.fullName }).subscribe(() => {


            console.log('liked');

            location.reload();

          });
        }
      }

    } else {

      window.alert('Please Login');

    }
  }
  comment(event: { currentTarget: Element; }) {
    const commentId = (event.currentTarget as Element).id;
    console.log(commentId);
    const { new_comment } = this.commentForm.value;
    console.log(new_comment);
    if (new_comment !== '') {
      this.commentData = {
        Comment_Content: new_comment,
        Time: new Date().toTimeString(),
        Commenter_ID: this.currentUser.fullName
      };
    }
    const curl = `https://example-81cdf.firebaseio.com/Posts/${this.postList[Number(commentId.slice(7))]}/Comments.json`;
    this.subscription = this.post_data.addComment(this.commentData, curl)
      .subscribe(comment => {
        this.comments.push(comment);
        location.reload();
      });
  }
  commentShowHide(event: { currentTarget: Element; }) {
    if (this.isloggedin) {
      const commentBoxId = (event.currentTarget as Element).id;
      const tempFlag = !this.commentFlag;
      if (tempFlag) {
        document.getElementById('commentBox'.concat('' + commentBoxId.slice(7))).style.display = 'block';
        this.commentFlag = true;
      } else {
        this.commentFlag = false;
        document.getElementById('commentBox'.concat('' + commentBoxId.slice(7))).style.display = 'none';
      }
    } else {
      alert('Please Login');
    }
  }
}
