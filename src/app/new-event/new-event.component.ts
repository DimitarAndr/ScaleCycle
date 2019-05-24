import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
	event = {
		"Titulo":"",
		"Lugar":"",
		"Descripcion":"",
		"Puntos":"",
		"Fecha":"",
		"HoraInicio":"",
		"HoraFinal":"",
		"Id_empleado":""
	}
  constructor(private http:HttpClient, private globals:Globals, private router:Router) { }

  ngOnInit() {
  }
  onSubmit(){
  	this.event['Id_empleado'] = JSON.parse(sessionStorage.getItem('user'))['userId'];
  	console.log(this.event);
  	this.http.post(this.globals['SERVER']+'/newEvnet', this.event).subscribe(data => {
			if (data['error']) {
				
			}else{
				window.location.replace(this.globals['ScaleCycle']+'/EventAdmin');
				console.log("Correct");
			}
		});
  }
  onFileChange(event){

  }
}
