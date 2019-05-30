import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {MatDialog} from '@angular/material';
import {ClaimDetailComponent} from '../claim-detail/claim-detail.component';
import {ContactosService} from '../service/contactos.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  t = new Subject();
  claims: any;

  /*claim:any={
        "Id":"",
        "Titulo":"",
        "Tipo":"",
        "IdTipo":"",
        "Descripcion":"",
        "IdCliente":"",
        "Estado":""
    }*/
  constructor(private http: HttpClient, private globals: Globals, private toastr: ToastrService,
              private dialog: MatDialog, private contactosService: ContactosService) {
  }

  ngOnInit() {

    this.contactosService.getAllConsultas().subscribe(data => {
        this.claims = data;
      }, () => {
        this.toastr.warning('Error intente de nuevo más tarde', 'Warning');
      }
    );

    /* this.contactosService.getAllConsultas.subscribe(data => {
      console.log(data);
      if (data.error) {
        // this.createStatud = false;
        // this.msgError = data['error'].text;
      } else {
        // this.createStatud = true;
        // this.msgError = null;
        this.claims = data;
        console.log(this.claims);
        this.t.next();
      }
    });*/
  }

  openDialog(claim)
    :
    void {
    const dialogRef = this.dialog.open(ClaimDetailComponent, {
      /*'width': '330px',
          'height': '400px',*/
      data: {
        claim: claim
      }
    });
  }
}
