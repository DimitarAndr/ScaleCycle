import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ParticipateDetailComponent} from '../participate-detail/participate-detail.component';
import {Evento} from '../model/Evento';

//import { Subject } from 'rxjs';
//import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  /*
        aux = 0 -> Definicion de envento (vista cliente)
        aux = 1 -> Definicion de evento
        aux = 2 -> Participante de evento
        aux = 3 -> Modificar evento
    */
  aux = 1;
  event: Evento;
  participants: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private globals: Globals, private dialog: MatDialog) {
  }

  /*dtTrigger = new Subject();
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;*/
  employee = {
    'Nombre': '',
    'Apellido': ''
  };

  ngOnInit() {
    this.event = {};
    console.log(this.data);
    if (this.data['vista'] == 'public') {
      this.aux = -1;
      this.event = this.data['data'];
    } else if (this.data['vista'] == 'client') {
      this.aux = 0;
      this.event = this.data['data'];
    } else {
      this.http.get(this.globals['SERVER'] + '/getEvent/' + this.data['id']).subscribe(data => {
        if (data['error']) {
          //this.createStatud = false;
          //this.msgError =
          data['error'].text;
        } else {
          this.event = data[0];
          this.http.get(this.globals['SERVER'] + '/getEmployee/' + this.event['Id_empleado']).subscribe(employee => {
            if (data['error']) {
              //this.createStatud = false;
              //this.msgError = data['error'].text;
            } else {
              this.employee = employee[0];
            }
          });
          this.http.get(this.globals['SERVER'] + '/getAllParticipants/' + this.event['Id']).subscribe(participants => {
            if (data['error']) {
              //this.createStatud = false;
              //this.msgError = data['error'].text;
            } else {
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
    //console.log(this.dtElement);
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
  openDialog(idParticipant: number, idEvent: number): void {
    var participant: any;
    for (var i = 0; i < this.participants.length; i++) {
      if (this.participants[i]['IdCliente'] == idParticipant) {
        participant = this.participants[i];
      }
    }

    let dialogRef = this.dialog.open(ParticipateDetailComponent, {
      'data': {
        'participant': participant,
        'event': this.event
      }
    });
  }

  changeEstado(estado) {
    if (estado >= 1 && estado <= 3) {
      this.aux = estado;
    }
  }

  delete() {
    this.http.delete(this.globals['SERVER'] + '/deleteEvent/' + this.event['Id']).subscribe(data => {
      if (data['error']) {

      } else {
        window.location.replace(this.globals['ScaleCycle'] + '/EventAdmin');
      }
    });
  }

  onSubmit() {
    this.http.put(this.globals['SERVER'] + '/modifyEvent', this.event).subscribe(data => {
      if (data['error']) {

      } else {
        window.location.replace(this.globals['ScaleCycle'] + '/EventAdmin');
      }
    });
  }
}
