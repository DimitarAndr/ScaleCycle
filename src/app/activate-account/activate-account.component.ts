import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
	error:boolean = false;
	msg:String = "";
  constructor(private route:ActivatedRoute, private http:HttpClient, private globals:Globals) { }

  ngOnInit() {
  	this.route.params.subscribe( params => {
	  	this.http.get(this.globals['SERVER']+'/activateAccount/'+params['id']).subscribe(data => {
	  		if (data['error']) {
	  			this.error = true;
	  			this.msg = "Error: "+data['error']['text'];
	  		}else{
	  			this.error = false;
	  		}
	  	});
  	});
  }

}
