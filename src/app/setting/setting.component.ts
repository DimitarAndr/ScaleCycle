import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {User} from '../model/User';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {

  @ViewChild('form')
  htmlForm: NgForm;

  vistaForm = 'datoP';
  user: User;
  employee = {
    'Id': '',
    'Username': '',
    'Password': '',
    'Name': '',
    'LastName': ''
  };

  isClient: boolean;
  localidades = ['Barcelona', 'Hospitalet de Llobregat', 'Badalona'];

  constructor(private http: HttpClient, private globals: Globals, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    //Cliente
    if (this.user.role == 'Cliente') {
      this.isClient = true;
      this.http.get(this.globals['SERVER'] + '/getClient/' + this.user['userId']).subscribe(data => {
        if (data['error']) {
          this.toastr.warning('Falla Por Cargar Informacion De Usuario, Por Favor Volver a Loguearse', 'Warning');
        } else {
          this.user = data[0];
          this.user['Genero'] = data[0]['Genero'];
          this.user['TipoIdentificador'] = data[0]['TipoIdentificador'];
          //this.createStatud = true;
          //this.msgError = null;
        }
      });
      //Empleado
    } else if (this.user.role == 'Admin') {
      this.isClient = false;
      this.http.get(this.globals['SERVER'] + '/getEmployee/' + this.user['userId']).subscribe(data => {
        if (data['error']) {
          this.toastr.warning('Falla Por Cargar Informacion De Usuario, Por Favor Volver a Loguearse', 'Warning');
        } else {
          //this.createStatud = true;
          //this.msgError = null;
          this.employee['Id'] = data[0]['Id'];
          this.employee['Username'] = data[0]['Username'];
          this.employee['Password'] = data[0]['Password'];
          this.employee['Name'] = data[0]['Nombre'];
          this.employee['LastName'] = data[0]['Apellido'];
        }
      });
    }
  }

  changeCliente() {
    console.log(this.user);
    this.http.put(this.globals['SERVER'] + '/changeClient', this.user).subscribe(data => {
      if (data['error']) {
        this.toastr.warning('Fallo Modificacion, Intenta Otra Vez.', 'Warning');
      } else {
        this.toastr.success('Datos Modificado', 'Success');
      }
    });
  }

  changeEmployee() {
    console.log(this.employee);
    this.http.post(this.globals['SERVER'] + '/changeEmployee', this.employee).subscribe(data => {
      if (data['error']) {
        this.toastr.warning('Fallo Modificacion, Intenta Otra Vez.', 'Warning');
      } else {
        this.toastr.success('Datos Modificado', 'Success');
      }
    });
  }

  cambiarVistaDatosP() {
    this.vistaForm = 'datoP';
  }

  cambiarVistaContrasena() {
    this.vistaForm = 'contrasena';
  }
}
