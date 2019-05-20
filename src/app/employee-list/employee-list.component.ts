import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
	//type:string ="3";
	employeeList: any;
	//isNull:boolean = false;
	dtTrigger = new Subject();
  //x:boolean = false;

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
  constructor(private globals:Globals, private http:HttpClient) { }

  ngOnInit() {
  	console.log(this.dtTrigger);
		this.filter();
  	/*this.http.get(this.globals['SERVER']+'/getAllEmployee').subscribe(data => {
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				//this.createStatud = true;
				//this.msgError = null;
				this.employeeList = data;
				console.log(this.employeeList);
			}
		});*/
  }
  /*filter(){
  	
  	
  	var error = false;
  	var string = "";
  	switch (this.type) {
  		case "0":
  			string = "/getEmployeeLocked";
  			break;
  		case "1":
  			string = "/getEmployeeEmployee";
  			break;
  		case "2":
  			string = "/getEmployeeAdmin";
  			break;
  		case "3":
  			string = "/getEmployeeValid";
  			break;
  		case "4":
  			string = "/getAllEmployee";
  			break;
  		default:
  			console.log("Tipo desconocido");
  			error = true;
  			break;
  	}
  	if(!error){
  		this.http.get(this.globals['SERVER']+string).subscribe(data => {
  			
				if (data['error']) {
					this.isNull = true;
					this.employeeList = null;
					//this.createStatud = false;
					//this.msgError = data['error'].text;
				}else{
					this.isNull = false;
					//this.createStatud = true;
					//this.msgError = null;
					this.employeeList = data;
					console.log(this.dtTrigger);
					if(!this.x){
						this.dtTrigger.next();
						this.x =true;
					}
				}
			});
  	}
  }*/
  filter(){
  		this.http.get(this.globals['SERVER']+"/getAllEmployee").subscribe(data => {
  			
				if (data['error']) {
					//this.createStatud = false;
					//this.msgError = data['error'].text;
				}else{
					//this.createStatud = true;
					//this.msgError = null;
					this.employeeList = data;
					this.dtTrigger.next();
					this.valid();
				}
			});
  }
	locked():void{
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.column(4).search("\^0\$",true,false).draw();
    });
	}
	empleado():void{
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.column(4).search("\^1\$",true,false).draw();
    });
	}
	administrador():void{
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.column(4).search("\^2\$",true,false).draw();
    });
	}
	valid():void{
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.column(4).search("\^1|2\$",true,false).draw();
    });
	}
	all(){
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.column(4).search("\^0|1|2\$",true,false).draw();
		});
	}
}