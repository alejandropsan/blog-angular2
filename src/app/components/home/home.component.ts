import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit{
    public pageTitle: string;
    public url: any;
    public posts: Array<Post>;
    public status: any;
    public identity: any;
    public token: any;

    constructor(
      private _postService: PostService,
      private _userService: UserService
    ) {
      this.pageTitle = 'Inicio';
      this.url = global.url;
      this.posts = [];
      this.status = "";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }

    ngOnInit() {
      this.getPosts();
    }

    getPosts(){
      this._postService.getPosts().subscribe(
        response => {
          if(response.status == 'success'){
            this.posts = response.posts;
            console.log(this.posts);
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
          this.getPosts();
        },
        error => {
          console.log(error);
        }
      )
    }
}
