import {Component, OnInit, Inject} from '@angular/core';
import {Globals} from '../globals/globals';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Evento} from '../model/Evento';
import {EventosService} from '../service/eventos.service';
import {UserService} from '../service/user.service';
import {EventParticipationService} from '../service/event-participation.service';
import {User} from '../model/User';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  /*
        aux = 0 -> Definicion de envento (vista cliente)
        aux = 1 -> Definicion de evento
        aux = 2 -> Participantes de evento
        aux = 3 -> Modificar evento
    */
  aux = 1;
  evento: Evento;
  participants: User[];
  user: User;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private eventosService: EventosService,
              private globals: Globals, private dialog: MatDialog, private userService: UserService,
              private participationService: EventParticipationService, private toastr: ToastrService,
              private router: Router) {
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


    this.eventosService.getEventById(this.data.event._id).subscribe(data => {
      this.evento = data;

      console.log(this.evento.estado);

    }, () => {
      alert('Error');
    });

    this.userService.getUserById(this.data.event.idEmpleado).subscribe(user => {
      this.user = user[0];
    });

    this.participationService.getParticipantsByEventId(this.data.event._id).subscribe(participants => {
      this.participationService.getUsersParticipating(participants).subscribe(users => {
        this.participants = users;
      });
    });
  }

  changeEstado(estado) {
    if (estado >= 1 && estado <= 3) {
      this.aux = estado;
    }
  }

  delete(idEvento) {
    this.eventosService.deleteEvent(idEvento).subscribe(data => {

      }, () => {
        this.toastr.error('Could not remove the event, please retry later', 'Error');
      },
      () => {
        this.toastr.success('You removed the event with id ' + idEvento, 'Success');
        this.router.getCurrentNavigation();
      });

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
