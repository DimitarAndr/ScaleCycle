import {Component, OnInit} from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Evento} from '../model/Evento';
import {EventosService} from '../service/eventos.service';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {ToastrService} from 'ngx-toastr';
import {LoginComponent} from '../login/login.component';
import {MatDialog} from '@angular/material';

declare var $;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  session = {
    'userId': '',
    'userName': '',
    'userLastName': '',
    'userType': '',
    'userState': '',
    'puntos': ''
  };
  eventos: any;

  constructor(private Event: Evento, private eventosService: EventosService, private dialog: MatDialog,
              private http: HttpClient, private globals: Globals, private toastr: ToastrService) {
  }


  ngOnInit() {
    AOS.init();

    this.http.get(this.globals.SERVER + '/getAllEventActiv').subscribe(data => {
        console.log(data);
        this.eventos = data;
      },
      () => {
        this.toastr.warning('No se pueden recuperar los eventos, por favor intente más tarde', 'Warning');
      });


    /*  this.eventosService.getAllEventos().subscribe((data: any[]) => {
        for (const event of data) {
          this.eventos.push(event);
        }
      });
    }*/
  }


  unirseEvento(event) {
    if (!sessionStorage.getItem('user') || sessionStorage.getItem('user') === 'null') {
      sessionStorage.setItem('url', window.location.pathname);
      const dialogRef = this.dialog.open(LoginComponent, {});
    } else {

      this.session = JSON.parse(sessionStorage.getItem('user'));
      if (this.session.userType === '1') {
        let data = {
          'eventId': event['Id'],
          'clientId': this.session['userId']
        }
        console.log(this.session);
        this.http.post(this.globals['SERVER'] + '/joinEvent', data).subscribe(data => {
        }, () => {
        }, () => {
          this.toastr.success('Uniste a Evento ' + event.Titulo + ' Correctamente', 'Success');
        });
      } else {
        this.toastr.warning('No es una cuenta con tipo cliente', 'Error');
      }
    }

  }
}






