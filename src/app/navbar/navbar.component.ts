import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,private router: Router) {}
  isLogin: boolean = false;
  Estado:String = 'Client';
  session = {};
  openDialog():void {
    let dialogRef = this.dialog.open(LoginComponent, {
      
    });
    /*dialogRef.afterClosed().subscribe(result => {
    	console.log("gg");
    })*/
  }

  ngOnInit() {
    if(sessionStorage.getItem('user') != null){
      this.session = JSON.parse(sessionStorage.getItem('user'));
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }
  logout(){
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.router.navigateByUrl("/");
  }

}
