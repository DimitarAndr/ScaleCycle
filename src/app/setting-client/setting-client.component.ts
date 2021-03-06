import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals/globals';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-setting-client',
  templateUrl: './setting-client.component.html',
  styleUrls: ['./setting-client.component.css']
})
export class SettingClientComponent implements OnInit {


  @ViewChild('form')
  htmlForm: NgForm;


  /*client:any = {
        "Apellido":"",
        "Avatar":"",
        "Direccion":"",
        "Email":"",
        "FechaNacimiento":"",
        "Genero":"",
        "Id":"",
        "Identificador":"",
        "Localidad":"",
        "Nombre":"",
        "Oculto":"",
        "Password":"",
        "Puntos":"",
        "Telefono":"",
        "TipoIdentificador":"",
        "Username":""
    };*/
  client: any;
  identification: string;
  id: number;
  isId: boolean = true;
  type: string = '1';

  constructor(private http: HttpClient, private globals: Globals) {
  }

  ngOnInit() {
  }

  search() {
    if (this.type == '1') {
      this.http.get(this.globals['SERVER'] + '/getClientForId/' + this.id).subscribe(data => {
        if (data['error']) {
          //this.createStatud = false;
          //this.msgError = data['error'].text;
        } else {
          this.client = data[0];
          //this.createStatud = true;
          //this.msgError = null;
        }
      });
    } else if (this.type == '2') {
      this.http.get(this.globals['SERVER'] + '/getClientForIdentification/' + this.identification).subscribe(data => {
        if (data['error']) {
          //this.createStatud = false;
          //this.msgError = data['error'].text;
        } else {
          //this.createStatud = true;
          //this.msgError = null;
          this.client = data[0];
          console.log(this.client);
        }
      });
    }
  }

  changeCliente() {
    this.http.put(this.globals['SERVER'] + '/changeClient', this.client).subscribe(data => {
      if (data['error']) {
        //this.createStatud = false;
        //this.msgError = data['error'].text;
      } else {
        //this.createStatud = true;
        //this.msgError = null;
        console.log('Correct');
      }
    });
  }
}
