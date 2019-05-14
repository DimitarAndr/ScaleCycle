import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';

import {Globals} from '../globals/globals';


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
		"TypeIdentifier": "DNI",
		"Birthdate": "",
		"Gender": "No definido",
		"Avatar": ""
	};
	createStatud:boolean;
	msgError:String;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public dialog: MatDialog, private globals:Globals) { }

  ngOnInit() {

  }
  onSubmit(){
  	this.msgError = "";
  	this.http.post(this.globals['SERVER']+'/createAccount', this.user).subscribe(data => {
  		console.log("onsubmit");
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