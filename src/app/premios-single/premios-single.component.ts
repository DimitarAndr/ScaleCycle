import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PremiosService} from '../service/premios.service';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-premios-single',
  templateUrl: './premios-single.component.html',
  styleUrls: ['./premios-single.component.css']
})
export class PremiosSingleComponent implements OnInit {


  constructor(private route: ActivatedRoute, private premioService: PremiosService, private dialog: MatDialog, private router: Router) {

  }

  similarPremios: any = [];
  premio: any;
  id;
  categoria;
  quantitatPremio = 1;
  session: any;
  premiosForSession: any = [];

  ngOnInit() {

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
    this.quantitatPremio += 1;
  }

  remOnePremio() {
    if (this.quantitatPremio > 0) {
      this.quantitatPremio -= 1;
    } else {
      this.quantitatPremio = 0;
    }
  }

  addPremio(premio) {

    const premioSession = [premio.id, premio.nombre, premio.descripcion, premio.puntos, premio.cantidad, this.quantitatPremio];
    this.premiosForSession.push(premioSession);
    localStorage.setItem('premio' + premio.id, this.premiosForSession);
    console.log(localStorage);

    /*if (sessionStorage.getItem('user') != null) {
      this.session = JSON.parse(sessionStorage.getItem('user'));
      this.session.premio += premioSession;


      sessionStorage.premio += sessionStorage.setItem('user', JSON.stringify(this.session));


      this.router.navigate(['/cart']);
    } else {
      const dialogRef = this.dialog.open(LoginComponent, {});
    }*/
  }


}
