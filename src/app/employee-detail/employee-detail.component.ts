import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private globals:Globals) { }
  aux = 1;
  employee:any;
  ngOnInit() {
  	if (this.data['vista']=='newEmployee') {
  		this.aux=0;
  		this.employee = {
  			Username:"",
  			Password:"",
  			Nombre:"",
  			Apellido:""
  		}
  	}else{
  		this.employee=this.data['employee'];
  	}
  }
	delete(id){
		this.http.delete(this.globals['SERVER']+'/deleteEmployee/'+this.employee['Id']).subscribe(data => {
  		if (data['error']) {

  		}else{
  			window.location.replace(this.globals['ScaleCycle']+'/EmployeeList');
  		}
  	});
	}
	onSubmit(){
		this.http.put(this.globals['SERVER']+'/modifyEmployee',this.employee).subscribe(data => {
  		if (data['error']) {

  		}else{
  			window.location.replace(this.globals['ScaleCycle']+'/EmployeeList');
  		}
  	});
	}
	changeEstado(estado){
		if (estado==1 || estado==2) {
			this.aux=estado;
		}
	}
	updateEstado(estado){
		if(estado >=0 && estado <=2){
  		this.employee['Estado'] = estado;
			var data = {
				'id':this.employee['Id'],
				'statud':this.employee['Estado']
			}
			this.http.put(this.globals['SERVER']+'/updateEmployeeStatud', data).subscribe(data => {
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
	createEmployee(){
		this.http.post(this.globals['SERVER']+'/createEmployee',this.employee).subscribe(data => {
  		if (data['error']) {

  		}else{
  			window.location.replace(this.globals['ScaleCycle']+'/EmployeeList');
  		}
  	});
	}
}
