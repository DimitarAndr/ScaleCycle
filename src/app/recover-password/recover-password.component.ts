import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
	isSendMail:boolean = true;
	user={
		"username":"",
		"password":""
	};
  constructor(private route:ActivatedRoute, private http:HttpClient, private globals:Globals) { }

  ngOnInit() {
  	this.route.params.subscribe( params => {
  		if(params['username']){
  			this.user['username'] = params['username'];
  			this.isSendMail = false;
  		}
  	});
  }
  sendMail(){
  	this.http.post(this.globals['SERVER']+'/sendRecoverPasswordMali', this.user).subscribe(data => {
			if (data['error']) {
				//this.loginStatud = false;
				//this.msgError = data['error'].text;
			}else{
				
			}
		});
  }
  onSubmit(){
  	this.http.post(this.globals['SERVER']+'/recoverPassword',this.user).subscribe(data => {
  		console.log(data);
  		if (data['error']) {
  			//this.error = true;
  			//this.msg = "Error: "+data['error']['text'];
  		}else{
  			//this.error = false;
  		}
		});
  }
}
