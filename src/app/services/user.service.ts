import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
    public url: string;
    public identity: any;
    public token: any;

    constructor(
      public _http: HttpClient
    ) {
      this.url = global.url;
    }

    test(){
      return "Hola mundo desde un servicio";
    }

    register(user: any): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register', params, {headers: headers});
    }

    signup(user: any, getToken = false): Observable<any> {
      if(getToken != false){
        user.getToken = 'true';
      }

      let json = JSON.stringify(user);
      let params = 'json='+json;
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this._http.post(this.url+'login', params, {headers: headers});
    }


    update(token: any, user: User): Observable<any>{
      // LIMPIAR CAMPO CONTENT (editor texto enriquecido) HTMLENTITIES > UTF8
      user.description = global.htmlEntities(user.description);

      let json = JSON.stringify(user);
      let params = 'json='+json;

      let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);

      return this._http.put(this.url + 'user/update', params, {headers: headers});
    }


    getIdentity(){
      let identity = localStorage.getItem('identity');

      if(identity && identity != "undefinded" || identity != null){
          this.identity = JSON.parse(identity);
      }else {
        this.identity = null;
      }

      return this.identity;

    }

    getToken(){
      let token = localStorage.getItem('token');

      if(token && token != 'undefinded'){
        this.token = token;
      }else {
        this.token = null;
      }

      return this.token;
    }

    getPosts(id: number):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this._http.get(this.url + 'post/user/' + id, {headers: headers});
    }

    getUser(id: number):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this._http.get(this.url + 'user/detail/' + id, {headers: headers});
    }



}
