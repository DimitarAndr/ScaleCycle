import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ContactosService} from '../service/contactos.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {


  @ViewChild('form')
  htmlForm: NgForm;

  constructor(private contactosService: ContactosService, private toastr: ToastrService) {

  }

  ngOnInit(): void {


  }

  addConsulta(form: HTMLFormElement) {
    this.contactosService.addConsulta(form.value).subscribe(data => {
    }, () => {
      this.toastr.warning('Error al recibir la pregunta, por favor intente más tarde', 'Warning');
    }, () => {
      this.htmlForm.resetForm(), this.toastr.success('Su pregunta has ido recibida', 'Success');
    });

  }

}
