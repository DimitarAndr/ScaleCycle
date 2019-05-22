import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialog} from '@angular/material';
import { ParticipateDetailComponent } from '../participate-detail/participate-detail.component';

//import { Subject } from 'rxjs';
//import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
	aux:boolean = true;
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
  participants:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http:HttpClient, private globals:Globals, private dialog: MatDialog) { }
  /*dtTrigger = new Subject();
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;*/
  employee={
  	"Nombre":"",
  	"Apellido":""
  };
  ngOnInit() {
  	//console.log(this.dtElement);
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
				this.http.get(this.globals['SERVER']+'/getAllParticipants/'+this.event['Id']).subscribe(participants => {
					if (data['error']) {
						//this.createStatud = false;
						//this.msgError = data['error'].text;
					}else{
						this.participants = participants;
						//this.dtTrigger.next();
						/*this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
				      dtInstance.columns().every(function () {
				        const that = this;
				        $('input', this.footer()).on('keyup change', function () {
				          if (that.search() !== this['value']) {
				            that
				              .search(this['value'])
				              .draw();
				          }
				        });
				      });
				    });*/
					}
				});
			}
		});
  }
  /*ngAfterViewInit(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }*/
  openDialog(idParticipant:number,idEvent:number):void {
  	var participant:any;
  	for(var i = 0 ; i< this.participants.length; i++){
  		if (this.participants[i]['IdCliente']==idParticipant) {
  			participant = this.participants[i];
  		}
  	}

    let dialogRef = this.dialog.open(ParticipateDetailComponent, {
		  'data': {
		    'participant': participant,
		    'event':this.event
		  }
    });
  }
  getPaericipante(){
  	this.aux = false;
  }
  getevento(){
  	this.aux=true;
  }

}
