import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit{
public pageTitle: string;
public post: any;
public identity: any;
public url: any;



  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.identity = _userService.getIdentity();
    this.pageTitle = "Contenido del Post";
    this.url = global.url;
  }



  ngOnInit() {
    this.getPost();
  }

  getPost(){
    // Sacar el id del post de la url con el router
    this._route.params.subscribe(params => {
      let id = +params['id'];
      console.log(id);

    // Hacer petición Ajax para sacar los datos
    this._postService.getPost(id).subscribe(
      response => {
        if(response.status == 'success'){
          this.post = response.posts;
          console.log(this.post);
        }else {
          this._router.navigate(['inicio']);
        }
      },
      error => {
        console.log(<any>error);
        this._router.navigate(['inicio']);
      }
    )
  });
  }

}
