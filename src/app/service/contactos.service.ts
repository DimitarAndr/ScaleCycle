import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {


  url = 'https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Contactos/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
    })
  };

  constructor(private http: HttpClient) {
  }

  addConsulta(form) {
    return this.http.post(this.url, form, this.httpOptions);
  }
}

