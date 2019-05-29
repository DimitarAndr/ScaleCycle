import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Premio} from '../model/Premio';

@Injectable({
  providedIn: 'root'
})
export class PremiosService {

  url = 'https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Premios/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllPremios(): Observable<Premio[]> {
    return this.http.get<Premio[]>(this.url, this.httpOptions);
  }

  modificarPremios(premiosCart) {
    let a;

    let putSuccess = true;

    for (const premio of premiosCart) {
      let putPremio = {
        'id': premio[1],
        'nombre': premio[2],
        'descripcion': premio[3],
        'categoria': premio[4],
        'puntos': premio[5],
        'cantidad': premio[6]
      }

      a = this.http.put<void>(this.url + premio[0], putPremio, this.httpOptions);
    }
    return a;
  }


}
