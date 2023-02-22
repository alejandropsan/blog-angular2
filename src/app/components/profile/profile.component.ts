import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostService } from 'src/app/services/post.service';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit{
  public url: any;
  public posts: Array<Post>;
  public status: any;
  public identity: any;
  public token: any;
  public user: any;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = global.url;
    this.posts = [];
    this.status = "";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getProfile();

  }

  getProfile(){
    // Sacar el id del post de la url con el router
    this._route.params.subscribe(params => {
      let userId = +params['id'];
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  getUser(userId: number){
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.status == 'success'){
          this.user = response.user;

          console.log(this.user);
        }else {
          console.log('error');
        }
      },
      error => {
        console.log('error');
      }
    )
  }

  getPosts(userId: number){
    this._userService.getPosts(userId).subscribe(
      response => {
        if(response.status == 200){
          this.posts = response.posts;
          console.log(this.posts);
        }else{
          console.log('error');
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deletePost(id: number){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(error);
      }
    )
  }
}
