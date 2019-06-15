import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  user: User;

  constructor() {

  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
