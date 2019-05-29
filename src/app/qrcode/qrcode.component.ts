import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
	qrText: string = null;
	session:any;
  constructor() { }

  ngOnInit() {
  	this.session = (JSON.parse(sessionStorage.getItem('user')));
  	this.qrText = JSON.stringify({
  		userId : this.session.userId,
  		userType : this.session.userType,
  		userName: this.session.userName,
  		userLastName: this.session.userLastName
  	});
  }

}
