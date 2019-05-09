import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  isLogin: boolean = true;
  Estado:String = 'Client';
  openDialog():void {
    let dialogRef = this.dialog.open(LoginComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
    	console.log("gg");
    })
  }

  ngOnInit() {

  }

}
