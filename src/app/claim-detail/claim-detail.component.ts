import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private globals:Globals) { }
  claim = this.data['claim'];
  ngOnInit() {
  	console.log(this.claim);
  }
  updateEstado(estado){
		if(estado >=0 && estado <=2){
  		this.claim['Estado'] = estado;
			var data = {
				'id':this.claim['Id'],
				'statud':this.claim['Estado']
			}
			console.log(data);
			this.http.put(this.globals['SERVER']+'/updateStatudClaim', data).subscribe(data => {
				if (data['error']) {
					//this.createStatud = false;
					//this.msgError = data['error'].text;
				}else{
					//this.createStatud = true;
					//this.msgError = null;
				}
			});
		}
	}
}
