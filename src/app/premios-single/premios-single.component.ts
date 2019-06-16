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
  user = {
    premios: []
  };

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify(this.user));

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

    //Iniciar user: si no hay BBDD
    if (!localStorage.getItem('user') || localStorage.getItem('user') === 'null') {

      localStorage.setItem('url', window.location.pathname);


      const dialogRef = this.dialog.open(LoginComponent, {});

      localStorage.setItem('user', JSON.stringify(this.user));
    } else {
      const premioSession = [premio._id, premio.id, premio.nombre, premio.descripcion, premio.categoria, premio.puntos, premio.cantidad, this.quantitatPremio];


      if (localStorage.getItem('user') != null) {

        this.user = JSON.parse(localStorage.getItem('user'));

        if (!this.user.premios || this.user.premios == null) {
          this.user.premios = [[]];
        }

        for (let i = 0; i < this.user.premios.length; i++) {
          if (premioSession[0] === this.user.premios[i][0]) {
            const cantidad = this.user.premios[i][5];
            this.user.premios.splice(i, 1);
            premioSession[5] += cantidad * 1;
          }
        }

        this.user.premios.push(premioSession);
        localStorage.setItem('user', JSON.stringify(this.user));


        this.router.navigate(['/cart']);
      }
    }
  }
}
