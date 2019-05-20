import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';


@Component({
  selector: 'app-register-submit',
  templateUrl: './register-submit.component.html',
  styleUrls: ['./register-submit.component.css']
})
export class RegisterSubmitComponent implements OnInit {
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

  constructor(private http:HttpClient, private globals:Globals) { }

  ngOnInit() {
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
}
