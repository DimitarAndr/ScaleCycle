import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  constructor() {
  }

  session: any;

  ngOnInit() {
    this.session = JSON.parse(sessionStorage.getItem('user'));
    console.log(JSON.parse(sessionStorage.getItem('user')));
  }

}
