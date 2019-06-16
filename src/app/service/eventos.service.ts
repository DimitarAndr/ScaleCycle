import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Evento} from '../model/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  url = 'https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Evento/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.url, this.httpOptions);
  }
}
