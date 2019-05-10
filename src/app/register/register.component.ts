import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	user = {
		"Username": "",
		"Password": "",
		"Name": "",
		"LastName": "",
		"Location": "",
		"Address": "",
		"Email": "",
		"Phone": "",
		"Identifier": "",
		"TypeIdentifier": "",
		"Birthdate": "",
		"Gender": "No definido",
		"Avatar": ""
	};
	createStatud:boolean;
	msgError:String;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  onSubmit(){
  	this.http.post('http://localhost/M12/login', this.user).subscribe(data => {
			if (data['error']) {
				this.createStatud = false;
				this.msgError = data['error'].text;
			}else{
				this.createStatud = true;
				this.msgError = null;
				console.log("Correct");
			}
		});
  }
}