import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event={
  	"Id":"",
  	"Titulo":"",
  	"Descripcion":"",
  	"Fecha":"",
  	"HoraInicio":"",
  	"HoraFinal":"",
  	"Lugar":"",
  	"Puntos":"",
  	"Id_empleado":""
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:HttpClient, private globals:Globals) { }
  employee={
  	"Nombre":"",
  	"Apellido":""
  };
  ngOnInit() {
  	this.http.get(this.globals['SERVER']+'/getEvent/'+this.data['id']).subscribe(data => {
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = 
				data['error'].text;
			}else{
				this.event=data[0];
		  	this.http.get(this.globals['SERVER']+'/getEmployee/'+this.event['Id_empleado']).subscribe(employee => {
					if (data['error']) {
						//this.createStatud = false;
						//this.msgError = data['error'].text;
					}else{
						this.employee = employee[0];
					}
				});
			}
		});
  }

}
