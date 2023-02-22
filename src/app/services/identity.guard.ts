import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class IdentityGuard implements CanActivate{

  constructor(
    private _router: Router,
    private _userService: UserService
    ){}

  canActivate()
    {
    let identity = this._userService.getIdentity();

    if(identity){
      return true;
    }else {
      this._router.navigate(['error']);
      return false;
    }
  }

}
