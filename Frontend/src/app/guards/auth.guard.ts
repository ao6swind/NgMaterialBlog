import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public isAuthed: boolean = false;

  constructor(private router: Router) {
    this.isAuthed = (localStorage.getItem("token")) ? true : false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var token = localStorage.getItem("token");
    if(token)
      return true;
    else
      this.router.navigate(["homepage/users/signin"]);
  }
}
