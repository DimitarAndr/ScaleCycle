import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';

import {Globals} from '../globals/globals';
@Component({
  selector: 'app-participate-detail',
  templateUrl: './participate-detail.component.html',
  styleUrls: ['./participate-detail.component.css']
})
export class ParticipateDetailComponent implements OnInit {
	changeDescription:boolean=false;
	description = this.data['participant']['Descripcion'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:HttpClient, private globals:Globals) { }
  event = this.data['event'];
  participant = this.data['participant'];
  ngOnInit() {
  	console.log(this.data);
  }
	updateEstado(estado){
		console.log(this.participant);
		if(estado >=0 && estado <=3){
  		this.participant['Estado'] = estado;
			var data = {
				'participant':this.participant['IdCliente'],
				'event':this.participant['IdEvento'],
				'estado':this.participant['Estado']/*,
				'descripcion':this.participant['Descripcion']*/
			}
			console.log(data);
			this.http.put(this.globals['SERVER']+'/updateEstadoPartipate', data).subscribe(data => {
				if (data['error']) {
					//this.createStatud = false;
					//this.msgError = data['error'].text;
				}else{
					//this.createStatud = true;
					//this.msgError = null;
				}
			});
		}
	}
	onchange(){
		this.changeDescription = true;
	}
	updateDescrioption(){
		var data = {
			'participant':this.participant['IdCliente'],
			'event':this.participant['IdEvento'],
			'descripcion':this.description
		}
		this.http.put(this.globals['SERVER']+'/updateDescripcionPartipate', data).subscribe(data => {
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				//this.createStatud = true;
				//this.msgError = null;
				this.changeDescription = false;
			}
		});	
	}
}
