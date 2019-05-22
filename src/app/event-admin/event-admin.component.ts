import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {MatDialog} from '@angular/material';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { NewEventComponent } from '../new-event/new-event.component';

@Component({
  selector: 'app-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.css']
})
export class EventAdminComponent implements OnInit {
	events:any;
	dtTrigger = new Subject();
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
  constructor(public dialog: MatDialog, private http: HttpClient, private globals:Globals) { }

  ngOnInit() {
  	this.dtOptions = {
      responsive: true
    };
  	this.http.get(this.globals['SERVER']+'/getAllEvent').subscribe(data => {
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				this.events = data;
				this.dtTrigger.next();
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
			}
		});
  }
  openDialog(id):void {
    let dialogRef = this.dialog.open(EventDetailComponent, {
      /*'width': '330px',
		  'height': '400px',*/
		  'data': {
		    'id': id
		  }
    });
  }
  filter(): void {
    
  }
  newEvent(){
  	let dialogRef = this.dialog.open(NewEventComponent, {
    });
  }
}
