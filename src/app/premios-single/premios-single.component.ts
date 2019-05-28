import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PremiosService} from '../service/premios.service';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';


@Component({
  selector: 'app-premios-single',
  templateUrl: './premios-single.component.html',
  styleUrls: ['./premios-single.component.css']
})
export class PremiosSingleComponent implements OnInit {


  constructor(private route: ActivatedRoute, private premioService: PremiosService,
              private dialog: MatDialog, private router: Router) {

  }

  similarPremios: any = [];
  premio: any;
  id;
  categoria;
  quantitatPremio = 1;
  array: any = ['1', '2'];
  session = {
    userId: '1',
    userName: 'a',
    userLastName: 'a',
    userType: '1',
    userState: '1',
    puntos: '500',
    premios: []
  };

  ngOnInit() {
    this.session = JSON.parse(sessionStorage.getItem('user'));
    sessionStorage.setItem('user', JSON.stringify(this.session));

    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.premioService.getAllPremios().subscribe((data: any[]) => {

      for (const prem of data) {
        if (prem.id == this.id) {
          this.premio = prem;
        }
      }
      for (const prem of data) {
        if (prem.categoria == this.premio.categoria) {
          this.similarPremios.push(prem);
          this.similarPremios.filter(element => {
            if (element == this.premio) {
              this.similarPremios.pop();
            }
          });
        }

      }
    });

  }

  changePremio(similiarPrem) {
    this.premio = similiarPrem;
  }

  addOnePremio() {
    if (this.quantitatPremio < this.premio.cantidad) {
      this.quantitatPremio += 1;
    } else {
      alert('No hay cantidad');
    }
  }

  remOnePremio() {
    if (this.quantitatPremio > 0) {
      this.quantitatPremio -= 1;
    } else {
      this.quantitatPremio = 0;
    }
  }

  addPremio(premio) {


    //Iniciar session: si no hay BBDD
    if (!sessionStorage.getItem('user') || sessionStorage.getItem('user') === 'null') {
      this.session = {
        userId: '1',
        userName: 'a',
        userLastName: 'a',
        userType: '1',
        userState: '1',
        puntos: '500',
        premios: []
      };
      sessionStorage.setItem('user', JSON.stringify(this.session));
    }

    const premioSession = [premio._id, premio.id, premio.nombre, premio.descripcion, premio.categoria, premio.puntos, premio.cantidad, this.quantitatPremio];

    if (sessionStorage.getItem('user') != null) {

      this.session = JSON.parse(sessionStorage.getItem('user'));

      if (!this.session.premios || this.session.premios == null) {
        this.session.premios = [[]];
      }

      for (let i = 0; i < this.session.premios.length; i++) {
        if (premioSession[0] === this.session.premios[i][0]) {
          const cantidad = this.session.premios[i][5];
          this.session.premios.splice(i, 1);
          premioSession[5] += cantidad * 1;
        }
      }

      this.session.premios.push(premioSession);
      sessionStorage.setItem('user', JSON.stringify(this.session));


      this.router.navigate(['/cart']);
    }
    /* else {
       const
         dialogRef = this.dialog.open(LoginComponent, {});
     }*/
  }
}
