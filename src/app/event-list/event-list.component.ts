import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import {MatDialog} from '@angular/material';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private http:HttpClient, private globals:Globals, private dialog:MatDialog) { }
  session:any;
  events:any;
  ngOnInit() {
  	this.session = JSON.parse(sessionStorage.getItem('user'));
		this.http.get(this.globals['SERVER']+'/getAllEventActiv').subscribe(data => {
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				this.events = data;
				console.log(this.events);
			}
		});
  }
  join(event){
  	var data = {
  		'eventId': event,
  		'clientId': this.session['userId']
  	}
  	this.http.put(this.globals['SERVER']+'/joinEvent', data).subscribe(data => {
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				this.events = data;
				console.log(this.events);
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
