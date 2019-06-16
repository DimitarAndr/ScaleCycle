import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../login/login.component';
import {Globals} from '../../globals/globals';
import {AuthenticationService} from '../../service/authentication.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent implements OnInit {

  user: User;
  isLoggedIn;

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthenticationService) {
  }


  openDialog(): void {
    this.dialog.open(LoginComponent, {});
  }

  ngOnInit() {
    if (localStorage.getItem('user') != null) {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user) {
        this.isLoggedIn = true;
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.authService.currentUserSubject.next(null);
    this.router.navigate(['home']);
  }

}
