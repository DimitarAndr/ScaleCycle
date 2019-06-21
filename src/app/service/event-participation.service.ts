import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Participation} from '../model/Participation';
import {role} from './role.service';
import {User} from '../model/User';
import {UserService} from './user.service';


var subject = new Subject<User[]>();

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

  participantes: Participation[];
  users: User[];

  constructor(private http: HttpClient, private userService: UserService) {
  }

  signInPersonToEvent(idEvent, idUser) {
    return this.http.post(this.url, {idEvento: idEvent, idCliente: idUser}, this.httpOptions);
  }

  getParticipantsByEventId(idEvent): Observable<Participation[]> {
    return this.http.get<Participation[]>(this.url + '?query={"idEvento":"' + idEvent + '"}',
      this.httpOptions);
  }

  public getUsersParticipating(participantes: Participation[]): Observable<User[]> {
    const participantesIds = [];
    participantes.forEach((participant) => {
      participantesIds.push('"' + participant.idCliente + '"');
    });
    return this.userService.getAllUsersWithGivenIds(participantesIds);

  }


}
