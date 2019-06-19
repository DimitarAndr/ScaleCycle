import {Component, OnDestroy, OnInit} from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Evento} from '../model/Evento';
import {EventosService} from '../service/eventos.service';
import {ToastrService} from 'ngx-toastr';
import {LoginComponent} from '../login/login.component';
import {MatDialog} from '@angular/material';
import {User} from '../model/User';
import {EventParticipationService} from '../service/event-participation.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  user: User;
  eventos: Evento[];


  constructor(private eventosService: EventosService, private dialog: MatDialog,
              private toastr: ToastrService, private signInToEvent: EventParticipationService) {
  }


  ngOnInit() {
    AOS.init();

    this.eventosService.getAllEventos().subscribe((data: Evento[]) => {
        this.eventos = (data);
      },
      () => {
        this.toastr.warning('Connection error, please try later');
      }, () => {
      });


  }


  unirseEvento(event) {
    if (!localStorage.getItem('user') || localStorage.getItem('user') === 'null') {
      localStorage.setItem('url', window.location.pathname);
      const dialogRef = this.dialog.open(LoginComponent, {});
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user[0].role === 'Cliente') {
        this.signInToEvent.signInPersonToEvent(event._id, this.user[0]._id).subscribe(data => {
        }, () => {
        }, () => {
          this.toastr.success('Uniste a Evento ' + event.titulo + ' Correctamente', 'Success');
        });
      } else {
        this.toastr.warning('No es una cuenta con tipo cliente', 'Error');
      }
    }

  }
}








