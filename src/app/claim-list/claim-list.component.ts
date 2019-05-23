import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	dtTrigger = new Subject();
	claims:any;
	/*claim:any={
		"Id":"",
		"Titulo":"",
		"Tipo":"",
		"IdTipo":"",
		"Descripcion":"",
		"IdCliente":"",
		"Estado":""
	}*/
  constructor(private http:HttpClient, private globals:Globals) { }

  ngOnInit() {
  	this.http.get(this.globals['SERVER']+"/getAllClaim").subscribe(data => {
  			console.log(data);
			if (data['error']) {
				//this.createStatud = false;
				//this.msgError = data['error'].text;
			}else{
				//this.createStatud = true;
				//this.msgError = null;
				this.claims = data;
				console.log(this.claims);
				this.dtTrigger.next();
			}
		});
  }

}
