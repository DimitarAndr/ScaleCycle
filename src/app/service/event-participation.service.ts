import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Participation} from '../model/Participation';


@Injectable({
  providedIn: 'root'
})
export class EventParticipationService {

  url = 'https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Participar/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
    })
  };

  constructor(private http: HttpClient) {
  }

  signInPersonToEvent(idEvent, idUser) {
    return this.http.post(this.url, {idEvento: idEvent, idCliente: idUser}, this.httpOptions);
  }


}
