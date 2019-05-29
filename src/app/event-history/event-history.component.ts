import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {MatDialog} from '@angular/material';
import { EventDetailComponent } from '../event-detail/event-detail.component';
@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.css']
})
export class EventHistoryComponent implements OnInit {

  constructor(private http:HttpClient, private globals:Globals, private dialog:MatDialog) { }
  session:any;
  events:any
  dtTrigger = new Subject();
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
  ngOnInit() {
  	this.session = JSON.parse(sessionStorage.getItem('user'));

		this.http.get(this.globals['SERVER']+'/getAllEventByUser/'+this.session['userId']).subscribe(data => {
			console.log(this.session);
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				console.log(data);
				this.events = data;
				this.dtTrigger.next();
			}
		});
  }
  openDialog(event):void {
    let dialogRef = this.dialog.open(EventDetailComponent, {
      /*'width': '330px',
		  'height': '400px',*/
		  'data': {
		    'vista': 'client',
		    'data':event
		  }
    });
  }

}
