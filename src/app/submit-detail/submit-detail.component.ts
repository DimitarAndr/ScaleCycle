import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-submit-detail',
  templateUrl: './submit-detail.component.html',
  styleUrls: ['./submit-detail.component.css']
})
export class SubmitDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  submit:any;
  ngOnInit() {
  	this.submit=this.data['data'];
  }

}
