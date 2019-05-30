import {Component, OnInit} from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Evento} from '../model/Evento';
import {EventosService} from '../service/eventos.service';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {ToastrService} from 'ngx-toastr';

declare var $;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventos: any;

  constructor(private Event: Evento, private eventosService: EventosService,
              private http: HttpClient, private globals: Globals, private toastr: ToastrService) {
  }


  ngOnInit() {
    AOS.init();

    this.http.get(this.globals.SERVER + '/getAllEventActiv').subscribe(data => {
        console.log(data);
        this.eventos = data;
      },
      () => {
        this.toastr.warning('Error al recibir la pregunta, por favor intente más tarde', 'Warning');
      });


    /*  this.eventosService.getAllEventos().subscribe((data: any[]) => {
        for (const event of data) {
          this.eventos.push(event);
        }
      });
    }*/
  }
}






