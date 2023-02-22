import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit{
  public pageTitle: string;
  public identity: any;
  public token: any;
  public post: Post;
  public categories: any;
  public status: any;
  public is_edit: boolean;
  public url: any;

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  public afuConfig = <any>{
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "20",
    uploadAPI:  {
      url: global.url + "post/upload",
      method:"POST",
      headers: {
          "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Elige una imagen',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Añade una imagen',
      afterUploadMsg_success: 'Imagen subida correctamente...',
      afterUploadMsg_error: 'Fallo al cargar!',
      sizeLimit: 'Imagen demasiado grande'
    }
};


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ){
    this.pageTitle = "Crear una entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null);
    this.is_edit = false;
    this.url = global.url;
  }


  ngOnInit() {
    this.getCategories();
   console.log(this.post);
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
          console.log(this.categories);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  onSubmit(form: any){
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['inicio']);
        }else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }


  imageUpload(data: any){
    this.post.image = data.body.image;
  }
}
