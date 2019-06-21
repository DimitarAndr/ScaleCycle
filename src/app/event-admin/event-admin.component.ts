import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {MatDialog} from '@angular/material';
import {EventDetailComponent} from '../event-detail/event-detail.component';
import {NewEventComponent} from '../new-event/new-event.component';
import {Evento} from '../model/Evento';
import {EventosService} from '../service/eventos.service';


@Component({
  selector: 'app-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.css']
})
export class EventAdminComponent implements OnInit {
  events: Evento[];
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  constructor(public dialog: MatDialog, private http: HttpClient, private eventos: EventosService) {
  }

  ngOnInit() {

    //Defining datatable options
    this.dtOptions = {
      responsive: true
    };

    this.eventos.getAllEventos().subscribe(data => {
      this.events = data;
      this.dtTrigger.next();

    });
  }

  openDialog(event) {
    const dialogRef = this.dialog.open(EventDetailComponent, {
      data: {
        event: event
      }
    });
  }

  filter()
    :
    void {
  }

  newEvent() {
    let dialogRef = this.dialog.open(NewEventComponent, {});
  }

}
