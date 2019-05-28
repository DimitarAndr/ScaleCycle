import {Component, OnInit} from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Evento} from '../model/Evento';
import {EventosService} from '../service/eventos.service';

declare var $;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  eventos = [];

  constructor(private Event: Evento, private eventosService: EventosService) {
  }


  ngOnInit() {
    AOS.init();


    this.eventosService.getAllEventos().subscribe((data: any[]) => {
      for (const event of data) {
        this.eventos.push(event);
      }
    });

  }
}
