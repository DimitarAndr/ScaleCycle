import {Component, OnInit} from '@angular/core';
import {Estacion} from '../model/Estacion';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {EstacionService} from '../service/estacion.service';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  private estaciones = [];
  filteredUsers: Observable<Estacion>;
  usersForm: FormGroup;


  constructor(private estacion: Estacion, private http: HttpClient,
              private buscarEstacion: FormBuilder, private estacionService: EstacionService) {
  }


  ngOnInit() {
    /* this.http.get('https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Estacion/', {
       headers: {
         'Content-Type': 'application/json',
         Authorization: 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
       }
     }).subscribe((data: any[]) => {
       for (const estacion of data) {
         this.estaciones.push(estacion);
       }
     });*/


    this.usersForm = this.buscarEstacion.group({
      userInput: null
    });

    this.filteredUsers = this.usersForm.get('userInput').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.estacionService.search({name: value}))
      );
  }

  displayFn(estacion: Estacion) {
    if (estacion) {
      return this.estacion.barrio;
    }
  }
}
