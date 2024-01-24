import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private _localStorageService: LocalStorageService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this._localStorageService.getToken();

    if(token) {
      return true;
    }

    this._router.navigate(['/auth/signin']);
    return false;
  }
  
  // token expiration
  private _tokenExpiration(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration
  }
}
