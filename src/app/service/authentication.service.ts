import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/User';
import {Router} from '@angular/router';


@Injectable({providedIn: 'root'})
export class AuthenticationService {

  url = 'https://baas.kinvey.com/appdata/kid_BkbjwXQ5N/Users/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic a2lkX0JrYmp3WFE1TjpkZjc2OTZjOTQyN2I0Njk0YmQzMzcyY2E2ZjVhZjFkZA=='
    })
  };

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
   return this.http.get<User>(this.url + '?query={"username":"' + username + '","password":"' + password + '"}',
      this.httpOptions);

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
