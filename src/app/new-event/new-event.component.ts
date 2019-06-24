import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Evento} from '../model/Evento';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {


  event: Evento;


  constructor(private http: HttpClient, private globals: Globals, private router: Router) {
  }

  @ViewChild('newEvent')
  newEvent: NgForm;

  ngOnInit() {

  }

  onSubmit() {
    const idEmpleado = JSON.parse(localStorage.getItem('user'))[0]._id;
    this.event = this.newEvent.value;
    this.event.idEmpleado = idEmpleado;

   //TODO
    /*Need to move adding new event to the service evento.service.ts */

    this.http.post(this.globals['SERVER'] + '/newEvnet', this.event).subscribe(data => {
      if (data['error']) {

      } else {
        window.location.replace(this.globals['ScaleCycle'] + '/EventAdmin');
        console.log('Correct');
      }
    });
  }

  /*  onFileChange(event) {

    }*/
}
