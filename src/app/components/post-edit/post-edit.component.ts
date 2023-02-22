import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['../post-new/post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit{
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
    this.pageTitle = "Editar la entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null);
    this.is_edit = true;
    this.url = global.url;
  }


  ngOnInit() {
    this.getCategories();
    this.getPost();

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

          if(this.post.user_id != this.identity.sub){
            this._router.navigate(['inicio']);
          }

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


  onSubmit(form: any){
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';

          this._router.navigate(['/entrada', this.post.id]);
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


  imageUpload(data: any){
    this.post.image = data.body.image;
  }
}
