import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {Globals} from '../globals/globals';
import {AuthenticationService} from '../service/authentication.service';
import {User} from '../model/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  isLoggedIn;

  constructor(public dialog: MatDialog, private router: Router,
              private globals: Globals, private authService: AuthenticationService) {
  }


  openDialog(): void {
    this.dialog.open(LoginComponent, {});
  }

  ngOnInit() {
    debugger;
    if (sessionStorage.getItem('user') != null) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      if (this.user) {
        this.isLoggedIn = true;
        console.log(this.user + ' ' + this.isLoggedIn);
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    this.authService.logout();
  }

}
