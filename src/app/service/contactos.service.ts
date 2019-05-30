import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contacto} from '../model/Contacto';
import {Observable} from 'rxjs';

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
    form.estado = 0;
    return this.http.post(this.url, form, this.httpOptions);
  }

  getAllConsultas(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.url, this.httpOptions);
  }

  cambiarEstadoConsulta(claim) {
    return this.http.put(this.url + claim._id, claim, this.httpOptions);
  }
}

