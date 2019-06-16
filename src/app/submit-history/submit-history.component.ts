import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {MatDialog} from '@angular/material';
import {SubmitDetailComponent} from '../submit-detail/submit-detail.component';
import {User} from '../model/User';

@Component({
  selector: 'app-submit-history',
  templateUrl: './submit-history.component.html',
  styleUrls: ['./submit-history.component.css']
})
export class SubmitHistoryComponent implements OnInit {

/*  @ViewChild(DataTableDirective)*/
  constructor(private http: HttpClient, private globals: Globals, private dialog: MatDialog) {
  }

  user: User;
  submits: any;
  dtTrigger = new Subject();

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.http.get(this.globals['SERVER']).subscribe(data => {
      if (data['error']) {

      } else {
        this.submits = data;
        this.dtTrigger.next();
      }
    });
  }

  openDialog(submit): void {
    let dialogRef = this.dialog.open(SubmitDetailComponent, {
      /*'width': '330px',
		  'height': '400px',*/
      'data': {
        'vista': 'client',
        'data': submit
      }
    });
  }
}
