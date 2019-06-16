import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthClienteGuard implements CanActivate {

  constructor(private router: Router) {
  }

  user: User;

  canActivate() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null && (this.user[0].role === 'Cliente' || this.user[0].role === 'Admin')) {
      return true;
    } else {
      this.router.navigate(['']);
    }
    return false;

  }
}

