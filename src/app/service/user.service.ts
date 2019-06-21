import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {Cliente} from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url = 'https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Users/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
    })
  };


  constructor(private http: HttpClient) {
  }


  getUserById(idEmpleado): Observable<User> {
    return this.http.get<User>(this.url + idEmpleado, this.httpOptions);
  }

  getAllUsersWithGivenIds(idUsers): Observable<User[]> {
    return this.http.get <User[]>(this.url + '?query={"_id":{"$in":[' + idUsers + ']}}', this.httpOptions
    );
  }

}
