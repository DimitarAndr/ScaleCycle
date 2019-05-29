import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
	qrText: string = null;
  constructor() { }

  ngOnInit() {
  	var session = (JSON.parse(sessionStorage.getItem('user')));
  	this.qrText = JSON.stringify({
  		userId : session.userId,
  		userType : session.userType,
  		userName: session.userName,
  		userLastName: session.userLastName
  	});
  }

}
