import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';

import {Globals} from '../globals/globals';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('register')
  htmlForm: NgForm;
  localidades = ['Barcelona', 'Hospitalet de Llobregat', 'Badalona'];

  Avatar: any;
  form: FormGroup;
  user = {
    'Username': '',
    'Password': '',
    'Name': '',
    'LastName': '',
    'Location': '',
    'Address': '',
    'Email': '',
    'Phone': '',
    'Identifier': '',
    'TypeIdentifier': '1',
    'Birthdate': '',
    'Gender': 'No definido',
    'Avatar': ''
  };
  createStatus: boolean;
  msgError: String;
  genders: any = ['Hombre', 'Mujer'];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public dialog: MatDialog, private globals: Globals, private toastr: ToastrService) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.msgError = '';
    this.http.post(this.globals['SERVER'] + '/createAccount', this.user).subscribe(data => {
      if (data['error']) {
        this.toastr.warning('Error Registrar', 'Warning');
      } else {
        this.createStatus = true;
        this.msgError = null;
        this.toastr.success('Enviado Correo Para Validacion', 'Success');
        this.htmlForm.resetForm();
      }
    });
  }

  onFileChange(event) {
    //this.user.Avatar = this.getBase64(event.target.files[0]);
    //this.user.Avatar = <string>this.getBase64(event.target.files[0]);

    console.log(this.user);
  }

  /*getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
   		console.log(reader.result);
   };
   return reader.result;
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
   //return "x";
	}*/
  getBase64(file) {
    /*return new Promise((resolve, reject) => {
        const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
              encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
          };
          reader.onerror = error => reject(error);
        });*/
  }

}
