import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { global } from 'src/app/services/global';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit{
  public pageTitle: string;
  public category: Category;
  public posts: any;
  public url: any;
  public identity: any;
  public token: any;



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.pageTitle = "Detalle de la categoría";
    this.category =  new Category(1, "");
    this.url = global.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
  }


  ngOnInit() {
    this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._categoryService.getCategory(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.category = response.category;

            this._categoryService.getPosts(id).subscribe(
              response => {
                if(response.status == 'success'){
                  this.posts = response.posts;
                }else {
                  this._router.navigate(['inicio']);
                }

              },
              error => {
                console.log(<any>error);
              }
            );

          }else {
            this._router.navigate(['inicio']);
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    })
  }

  deletePost(id: number){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsByCategory();
      },
      error => {
        console.log(error);
      }
    )
  }
}
