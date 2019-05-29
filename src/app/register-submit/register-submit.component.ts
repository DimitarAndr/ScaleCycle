import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import {FormControl, NgForm} from '@angular/forms';
  

@Component({
  selector: 'app-register-submit',
  templateUrl: './register-submit.component.html',
  styleUrls: ['./register-submit.component.css']
})
export class RegisterSubmitComponent implements OnInit {
	@ViewChild('form')
	htmlForm: NgForm;

	client:any = {
		"Apellido":"",
		"Avatar":"",
		"Direccion":"",
		"Email":"",
		"FechaNacimiento":"",
		"Genero":"",
		"Id":"",
		"Identificador":"",
		"Localidad":"",
		"Nombre":"",
		"Oculto":"",
		"Password":"",
		"Puntos":"",
		"Telefono":"",
		"TipoIdentificador":"",
		"Username":""
	};
  identification:string;
	id:number;
	isId :boolean = true;
	type: string = "1";
	session = JSON.parse(sessionStorage.getItem('user'));
	submit={
		"plastic":0,
		"paperboard":0,
		"crystal":0,
		"metal":0,
		"oil":0,
		"battery":0,
		"points":0
	}
  constructor(private http:HttpClient, private globals:Globals) { }

  ngOnInit() {
  	console.log(this.session);
  }
	search(){
  	if(this.type == "1"){
  		this.http.get(this.globals['SERVER']+'/getClientForId/'+this.id).subscribe(data => {
				if (data['error']) {
					//this.createStatud = false;
					//this.msgError = data['error'].text;
				}else{
					this.client = data[0];
					//this.createStatud = true;
					//this.msgError = null;
				}
			});
  	}else if(this.type == "2"){
  		this.http.get(this.globals['SERVER']+'/getClientForIdentification/'+this.identification).subscribe(data => {
				if (data['error']) {
					//this.createStatud = false;
					//this.msgError = data['error'].text;
				}else{
					//this.createStatud = true;
					//this.msgError = null;
					this.client = data[0];
					console.log(this.client);
				}
			});
  	}
  }
  change(){
  	this.submit['points'] = 0;
  	this.submit['points'] = this.submit['plastic'] * this.globals['PoinPlastic'];
  	this.submit['points'] += this.submit['paperboard'] * this.globals['PoinPaperBoard'];
  	this.submit['points'] += this.submit['crystal'] * this.globals['PoinCrystal'];
  	this.submit['points'] += this.submit['metal'] * this.globals['PoinMetal'];
  	this.submit['points'] += this.submit['oil'] * this.globals['PoinOil'];
  	this.submit['points'] += this.submit['battery'] * this.globals['PoinBattry'];
  	this.submit['points'] = Math.round(this.submit['points'] * 100) / 100;
  }
  onSubmit(){
  	var data={
  		"client":this.client,
  		"submit":this.submit,
  		"employee":this.session['userId']
  	}
  	this.http.post(this.globals['SERVER']+'/newRegisterSubmit',data).subscribe(data => {
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				this.htmlForm.resetForm();
				this.submit['points'] = 0;
				//this.createStatud = true;
				//this.msgError = null;
				//this.client = data[0];
			}
		});
  }
  /*
	PoinPlastic = '2';
  PoinPaperBoard = '1';
  PoinCrystal = '1';
  PoinMetal = '1';
  PoinOil = '5';
  PoinBattry = '5';
  */
}
