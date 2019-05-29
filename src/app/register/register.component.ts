import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';

import {Globals} from '../globals/globals';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	Avatar:any;
	form: FormGroup;
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
		"TypeIdentifier": "1",
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
  	//let file = $<HTMLInputElement>("input[type='file']")[0].files;
  	//console.log(file[0]);
  	this.http.post(this.globals['SERVER']+'/createAccount', this.user).subscribe(data => {
			if (data['error']) {
				this.createStatud = false;
				this.msgError = data['error'].text;
			}else{
				this.createStatud = true;
				this.msgError = null;
				window.location.replace(this.globals['ScaleCycle'] + '/');
			}
		});
  }
  onFileChange(event) {
  	//this.user.Avatar = this.getBase64(event.target.files[0]);
  	//this.user.Avatar = <string>this.getBase64(event.target.files[0]);

  	console.log(this.user);
  }
  /*getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
   		console.log(reader.result);
   };
   return reader.result; 
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
   //return "x";
	}*/
	getBase64(file) {
  /*return new Promise((resolve, reject) => {
	  const reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => {
	      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
	      if ((encoded.length % 4) > 0) {
	        encoded += '='.repeat(4 - (encoded.length % 4));
	      }
	      resolve(encoded);
	    };
	    reader.onerror = error => reject(error);
	  });*/
	}

}