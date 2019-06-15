import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialogRef} from '@angular/material';
import {Globals} from '../globals/globals';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../service/login.service';
import {User} from '../model/User';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<LoginComponent>, private route: ActivatedRoute,
              private http: HttpClient, private router: Router, private  authService: AuthenticationService,
              private globals: Globals, private toastr: ToastrService) {
  }


  ifTakesUser: User[];

  @ViewChild('loginForm')
  htmlForm: NgForm;
  user = {
    'username': '',
    'password': '',
    'type': '1' //default login client
  };
  //user:any = {};
  loginStatud: boolean;
  msgError: string;
  typeUser = 'Cliente';
  session = {
    'userId': '',
    'userName': '',
    'userLastName': '',
    'userType': '',
    'userState': '',
    'puntos': ''
  };

  ngOnInit() {

  }

  changeType() {
    if (this.user['type'] == '1') {
      this.typeUser = 'Cliente';
    } else if (this.user['type'] == '2') {
      this.typeUser = 'Empleado';
    }
  }

  onSubmit() {
    this.http.post(this.globals['SERVER'] + '/login', this.user).subscribe(data => {
      if (data['error']) {
        this.loginStatud = false;
        this.toastr.warning('Contraseña Incorrecta o No Existe Usuario', 'Warning');
      } else {
        this.loginStatud = true;
        this.msgError = null;

        this.session.userId = data[0]['Id'];
        this.session.userName = data[0]['Nombre'];
        this.session.userLastName = data[0]['Apellido'];
        this.session.userType = this.user['type'];
        this.session.userState = data[0]['Estado'];
        this.session.puntos = data[0]['Puntos'];
        sessionStorage.setItem('user', JSON.stringify(this.session));
        //console.log(JSON.parse(sessionStorage.getItem('user')));
        if (this.user.type == '1') {
          switch (data[0]['Estado']) {
            //Client Locked
            case '0':
              this.toastr.warning('Cuenta Bloqueado', 'Warning');
              //kill all session!!!!!!!!
              //this.router.navigateByUrl('/userLocked');
              //OR
              //this.loginStatud = true;
              //this.msgError = 'User Locked';
              break;
            //Client Activado con Email
            case '1':
              this.toastr.warning('Cuenta No Activado', 'Warning');
              break;
            case '2':
              this.dialogRef.close();
              sessionStorage.setItem('user', JSON.stringify(this.session));
              if (sessionStorage.getItem('url')) {
                window.location.replace(this.globals['ScaleCycle'] + sessionStorage.getItem('url'));
              } else {
                window.location.replace(this.globals['ScaleCycle'] + '/Client');
              }

              break;
            default:
              this.toastr.warning('Estado Desconocido', 'Warning');
              break;
          }
        } else if (this.user.type == '2') {
          switch (data[0]['Estado']) {
            //Empleado bloqueado
            case '0':
              this.toastr.warning('Cuenta Bloqueado', 'Warning');
              //this.router.navigateByUrl('/userLocked');
              //OR
              //this.loginStatud = true;
              //this.msgError = 'User Locked';
              break;
            //Employee
            case '1':
              this.dialogRef.close();
              sessionStorage.setItem('user', JSON.stringify(this.session));
              window.location.replace(this.globals['ScaleCycle'] + '/Employee');
              break;
            //Administrator
            case '2':
              this.dialogRef.close();
              sessionStorage.setItem('user', JSON.stringify(this.session));
              window.location.replace(this.globals['ScaleCycle'] + '/Admin');
              break;
            default:
              this.toastr.warning('Estado Desconocido', 'Warning');
              break;
          }
        }
        //sessionStorage.setItem('userState',"1");
      }
    });
  }

  checkUser() {
    this.authService.login('gogo', 'gogo').subscribe((data) => {
      console.log(data);
    });
  }
}
