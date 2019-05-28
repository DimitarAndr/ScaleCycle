import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {MatDialog} from '@angular/material';
import { SubmitDetailComponent } from '../submit-detail/submit-detail.component';

@Component({
  selector: 'app-submit-history',
  templateUrl: './submit-history.component.html',
  styleUrls: ['./submit-history.component.css']
})
export class SubmitHistoryComponent implements OnInit {

  constructor(private http:HttpClient, private globals:Globals, private dialog:MatDialog) { }
  session:any;
  submits:any;
  dtTrigger = new Subject();
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};

  ngOnInit() {
  	this.session = JSON.parse(sessionStorage.getItem('user'));
  	this.http.get(this.globals['SERVER']+'/getAllSubmitByUser/'+this.session['userId']).subscribe(data => {
  		console.log(data);
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				this.submits = data;
				this.dtTrigger.next();
			}
		});
  }
  openDialog(submit):void {
    let dialogRef = this.dialog.open(SubmitDetailComponent, {
      /*'width': '330px',
		  'height': '400px',*/
		  'data': {
		    'vista': 'client',
		    'data':submit
		  }
    });
  }
}
