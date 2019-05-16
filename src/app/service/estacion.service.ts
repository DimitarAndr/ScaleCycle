import {Injectable} from '@angular/core';
import {Estacion} from '../model/Estacion';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  constructor(private http: HttpClient) {
  }

  search(filter: { name: string } = {name: ''}, page = 1): Observable<Estacion> {
    this.http.get('https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Estacion/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
      }
    })
      .pipe(
        tap((response: Estacion) => {
          console.log(response);
        })
      );
  }
}
