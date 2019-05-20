import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
	session:any;
	employee = {
		"Id":"",
		"Username":"",
		"Password":"",
		"Name":"",
		"LastName":""
	};
	isClient:boolean;
  constructor(private http:HttpClient, private globals:Globals) { }

  ngOnInit() {
  	this.session = JSON.parse(sessionStorage.getItem('user'));
  	//Cliente
  	if (this.session.userType == "1") {
  		this.isClient = true;
  		this.http.get(this.globals['SERVER']+'/getClient/'+this.session['Id']).subscribe(data => {
				if (data['error']) {
					//this.createStatud = false;
					//this.msgError = data['error'].text;
				}else{
					//this.createStatud = true;
					//this.msgError = null;
				}
			});
  	//Empleado
  	}else if(this.session.userType == "2"){
  		this.isClient = false;
			this.http.get(this.globals['SERVER']+'/getEmployee/'+this.session['userId']).subscribe(data => {
				if (data['error']) {
					//this.createStatud = false;
					//this.msgError = data['error'].text;
				}else{
					//this.createStatud = true;
					//this.msgError = null;
					this.employee['Id'] = data[0]['Id'];
					this.employee['Username'] = data[0]['Username'];
					this.employee['Password'] = data[0]['Password'];
					this.employee['Name'] = data[0]['Nombre'];
					this.employee['LastName'] = data[0]['Apellido'];
				}
			});
  	}
  }

  changeCliente(){

  }
	changeEmployee(){
		this.http.post(this.globals['SERVER']+'/changeEmployee', this.employee).subscribe(data => {
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				//this.createStatud = true;
				//this.msgError = null;
				console.log("Correct");
			}
		});
	}

}
