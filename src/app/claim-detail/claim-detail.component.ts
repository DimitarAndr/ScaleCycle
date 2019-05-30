import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {ContactosService} from '../service/contactos.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private toastr: ToastrService,
              private globals: Globals, private contactosService: ContactosService) {
  }

  claim = this.data['claim'];

  ngOnInit() {
  }

  updateEstado(estado) {
    let estadoConsulta = '';
    if (estado >= 0 && estado <= 2) {
      this.claim['estado'] = estado;
      if (this.claim.estado == 0) {
        estadoConsulta = 'Pendiente';
      }
      if (this.claim.estado == 1) {
        estadoConsulta = 'En Tramite';
      }
      if (this.claim.estado == 2) {
        estadoConsulta = 'Finalizado';
      }

      this.contactosService.cambiarEstadoConsulta(this.claim).subscribe(data => {
        }, () => {
          this.toastr.warning('Error intente de nuevo más tarde', 'Warning');
        }, () => {
          this.toastr.success('El estado se ha actualizado a ' + estadoConsulta, 'Success');
        }
      );
    }
  }
}
