import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit{
  public pageTitle: string;
  public identity: any;
  public token: any;
  public category: Category;
  public status: string;




  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ){
    this.pageTitle = "Crear nueva categoría";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, "");
    this.status = "";
  }



  ngOnInit() {

  }

  onSubmit(form: any){
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if(response.status == 'success'){
          this.category = response.category;
          this.status = 'success';

          this._router.navigate(['inicio']);
        }else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }


}
