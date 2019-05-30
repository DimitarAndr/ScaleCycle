import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  constructor() { }
  session:any;
  ngOnInit() {
  	this.session = JSON.parse(sessionStorage.getItem('user'));
  	console.log(JSON.parse(sessionStorage.getItem('user')));
  }

}
