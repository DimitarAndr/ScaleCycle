import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  user: User;

  canActivate() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null && this.user[0].role === 'Admin') {
      return true;
    } else {
      this.router.navigate(['']);
    }
    return false;

  }
}
