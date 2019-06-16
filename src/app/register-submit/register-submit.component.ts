import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {FormControl, NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from '../model/User';

@Component({
  selector: 'app-register-submit',
  templateUrl: './register-submit.component.html',
  styleUrls: ['./register-submit.component.css']
})
export class RegisterSubmitComponent implements OnInit {
  @ViewChild('form')
  htmlForm: NgForm;


  client: any = {
    Apellido: '',
    Avatar: '',
    Direccion: '',
    Email: '',
    FechaNacimiento: '',
    Genero: '',
    Id: '',
    Identificador: '',
    Localidad: '',
    Nombre: '',
    Oculto: '',
    Password: '',
    Puntos: '',
    Telefono: '',
    TipoIdentificador: '',
    Username: ''
  };

  identification: string;
  id: number;
  isId = true;
  type = '1';

  user: User = JSON.parse(localStorage.getItem('user'));

  submit = {
    plastic: 0,
    paperboard: 0,
    crystal: 0,
    metal: 0,
    oil: 0,
    battery: 0,
    points: 0
  };

  constructor(private http: HttpClient, private globals: Globals, private toastr: ToastrService) {
  }

  ngOnInit() {
    console.log(this.user);
  }

  search() {
    if (this.type == '1') {
      this.http.get(this.globals.SERVER + '/getClientForId/' + this.id).subscribe(data => {
        if (data) {
          this.toastr.warning('Error no se encuentra cliente', 'Warning');
        } else {
          this.client = data[0];
        }
      });
    } else if (this.type == '2') {
      this.http.get(this.globals.SERVER + '/getClientForIdentification/' + this.identification).subscribe(data => {
        if (data) {
          this.toastr.warning('Error no se encuentra cliente', 'Warning');
        } else {
          this.client = data[0];
        }
      });
    }
  }

  change() {
    this.submit.points = 0;
    this.submit.points = this.submit.plastic * this.globals.PoinPlastic;
    this.submit.points += this.submit.paperboard * this.globals.PoinPaperBoard;
    this.submit.points += this.submit.crystal * this.globals.PoinCrystal;
    this.submit.points += this.submit.metal * this.globals.PoinMetal;
    this.submit.points += this.submit.oil * this.globals.PoinOil;
    this.submit.points += this.submit.battery * this.globals.PoinBattry;
    this.submit.points = Math.round(this.submit.points * 100) / 100;
  }

  onSubmit() {
    const data = {
      client: this.client,
      submit: this.submit,
      employee: this.user._id
    };
    if (this.submit.points == 0 || !data.client) {
      this.toastr.warning('Error, entrega estan vacio o faltan cliente', 'Warning');
    } else {
      this.http.post(this.globals.SERVER + '/newRegisterSubmit', data).subscribe(data => {
        if (data) {
          this.toastr.warning('Error Entrega, Intenta Otra vez', 'Warning');
        } else {
          this.htmlForm.resetForm();
          this.submit.points = 0;
          this.toastr.success('Enviado con éxito', 'Success');
        }
      });
    }
  }

}
