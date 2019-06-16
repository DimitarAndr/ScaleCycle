import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  qrText: string = null;
  user: User;

  constructor() {
  }

  ngOnInit() {
    this.user = (JSON.parse(localStorage.getItem('user')));
    this.qrText = JSON.stringify({
      userId: this.user._id,
      userType: this.user.role,
      userName: this.user.username,
      userLastName: this.user.apellido
    });
  }

}
