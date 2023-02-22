import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit{

  public pageTitle: string;
  public user: User;
  public identity: any;
  public token: any;
  public status: any;
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
      url: global.url + "user/upload",
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
      selectFileBtn: 'Elige tu imagen',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu avatar',
      afterUploadMsg_success: 'Avatar subido correctamente',
      afterUploadMsg_error: 'Fallo al cargar!',
      sizeLimit: 'Imagen demasiado grande'
    }
};

  constructor(
    private _userService: UserService
  ){
    this.pageTitle = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;

    // Esto rellena el objeto usuario de manera predeterminada en el formulario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image
    );
  }

  ngOnInit() {

  }

  onSubmit(form: any){
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if(response && response.status){
          console.log(response);
          this.status = 'success';

          // ACTUALIZAR USUARIO EN SESIÓN
          if(response.change.name){
            this.user.name = response.change.name;
          }
          if(response.change.surname){
            this.user.surname = response.change.surname;
          }
          if(response.change.email){
            this.user.email = response.change.email;
          }
          if(response.change.description){
            this.user.description = response.change.description;
          }
          if(response.change.image){
            this.user.image = response.change.image;
          }
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  avatarUpload(datos: any){
    this.user.image = datos.body.image;
    this.identity.image = datos.body.image;
  }

}
