import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Globals} from '../globals/globals';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {MatDialog} from '@angular/material';
import { ClaimDetailComponent } from '../claim-detail/claim-detail.component';
@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	t = new Subject();
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
  constructor(private http:HttpClient, private globals:Globals, private dialog:MatDialog) { }

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
				this.t.next();
			}
		});
  }
  openDialog(claim):void {
    let dialogRef = this.dialog.open(ClaimDetailComponent, {
      /*'width': '330px',
		  'height': '400px',*/
		  'data': {
		    'claim': claim
		  }
    });
  }
}
