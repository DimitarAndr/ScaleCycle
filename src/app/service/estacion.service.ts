import {Injectable} from '@angular/core';
import {Estacion} from '../model/Estacion';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  url = 'https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Estacion/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllEstaciones(): Observable<Estacion[]> {
    return this.http.get<Estacion[]>(this.url, this.httpOptions);
  }




}
