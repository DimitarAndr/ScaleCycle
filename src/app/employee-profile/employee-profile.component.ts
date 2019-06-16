import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  constructor() {
  }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')));
  }

}
