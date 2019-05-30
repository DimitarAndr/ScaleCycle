import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  constructor() { }
	session:any;
  ngOnInit() {
		this.session = JSON.parse(sessionStorage.getItem('user'));
  	console.log(JSON.parse(sessionStorage.getItem('user')));
  }

}
