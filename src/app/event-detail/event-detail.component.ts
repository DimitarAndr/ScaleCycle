import {Component, OnInit, Inject} from '@angular/core';
import {Globals} from '../globals/globals';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ParticipateDetailComponent} from '../participate-detail/participate-detail.component';
import {Evento} from '../model/Evento';
import {EventosService} from '../service/eventos.service';
import {role} from '../service/role.service';
import {UserService} from '../service/user.service';
import {EventParticipationService} from '../service/event-participation.service';
import {Participation} from '../model/Participation';
import {User} from '../model/User';

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
  evento: Evento;
  participants: User[];
  user: User;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private eventosService: EventosService,
              private globals: Globals, private dialog: MatDialog, private userService: UserService,
              private participationService: EventParticipationService) {
  }


  ngOnInit() {

    // Useless for the moment will check later if i need it
    /* if (this.data['vista'] == 'public') {
       this.aux = -1;
       this.event = this.data['data'];
       }

     if (this.data.vista === 'client') {
       this.aux = 0;
       this.event = this.data.data;
     } else {*/


    this.eventosService.getEventoById(this.data.event._id).subscribe(data => {
      console.log(data);
      this.evento = data;
    });

    this.userService.getUserById(this.data.event.idEmpleado).subscribe(user => {
      console.log(user);
      this.user = user[0];
    });

    this.participationService.getParticipantsByEventId(this.data.event._id).subscribe(participants => {
      this.participationService.getUsersParticipating(participants).subscribe(users => {
        this.participants = users;
      });
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
  openDialog(idParticipant, idEvent): void {
    let participant: User;

    for (let i = 0; i < this.participants.length; i++) {
      if (this.participants[i]._id == idParticipant) {
        participant = this.participants[i];
      }
    }

    const dialogRef = this.dialog.open(ParticipateDetailComponent, {
      data: {
        participant,
        event: this.evento
      }
    });
  }

  changeEstado(estado) {
    if (estado >= 1 && estado <= 3) {
      this.aux = estado;
    }
  }

  delete() {
    /* this.http.delete(this.globals.SERVER + '/deleteEvent/' + this.evento._id).subscribe(data => {
       if (data.error) {

       } else {
         window.location.replace(this.globals.ScaleCycle + '/EventAdmin');
       }
     });*/
  }

  onSubmit() {
    /*  this.http.put(this.globals.SERVER + '/modifyEvent', this.evento).subscribe(data => {
        if (data.error) {

        } else {
          window.location.replace(this.globals.ScaleCycle + '/EventAdmin');
        }
      });*/
  }
}
