import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import {MatDialog} from '@angular/material';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private http:HttpClient, private globals:Globals, private dialog:MatDialog, private toastr:ToastrService) { }
  session:any;
  events:any;
  ngOnInit() {
  	this.session = JSON.parse(sessionStorage.getItem('user'));
		this.http.get(this.globals['SERVER']+'/getAllEventActiv').subscribe(data => {
			console.log(data);
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				this.events = data;
			}
		});
  }

  join(event){
  	var data = {
  		'eventId': event['Id'],
  		'clientId': this.session['userId']
  	}
  	this.http.post(this.globals['SERVER']+'/joinEvent', data).subscribe(data => {
			if (data['error']) {
				//this.toastr.warning('Error', 'Warning');
			}else{
				this.toastr.success('Uniste a Evento '+event.Titulo+' Correctamente', 'Success');
			}
		});
  }
  detailEvent(event){
  	let dialogRef = this.dialog.open(EventDetailComponent, {
      /*'width': '330px',
		  'height': '400px',*/
		  'data': {
		    'vista': 'public',
		    'data':event
		  }
    });
  }
}
