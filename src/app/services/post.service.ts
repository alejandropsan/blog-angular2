import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService {
    public url: string;

    constructor(
      public _http: HttpClient
    ) {
      this.url = global.url;
    }

    pruebas(){
      return "Hola desde el servicio de Post";
    }

    create(token: any, post: any): Observable<any>{
      // LIMPIAR CAMPO CONTENT (editor texto enriquecido) HTMLENTITIES > UTF8
      post.content = global.htmlEntities(post.content);

      let json = JSON.stringify(post);
      let params = 'json='+json;

      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

        return this._http.post(this.url + 'post', params, {headers: headers});
    }

    getPosts(): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this._http.get(this.url + 'post', {headers: headers});
    }

    getPost(id: number): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this._http.get(this.url + 'post/' + id, {headers: headers});
    }

    update(token: any, post: any, id: number): Observable<any>{
      // LIMPIAR CAMPO CONTENT (editor texto enriquecido) HTMLENTITIES > UTF8
      post.content = global.htmlEntities(post.content);

      let json = JSON.stringify(post);
      let params = 'json='+json;

      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

      return this._http.put(this.url + 'post/' + id, params, {headers: headers});
    }

    delete(token: any, id: number){
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

      return this._http.delete(this.url + 'post/' + id, {headers: headers});
    }

}
