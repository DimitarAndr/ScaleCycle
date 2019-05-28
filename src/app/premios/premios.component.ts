import {Component, OnInit} from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {PremiosService} from '../service/premios.service';
import {Premio} from '../model/Premio';


@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})


export class PremiosComponent implements OnInit {

  a: Premio[] = [];
  premios: Premio[] = [];
  numTazas = 0;
  numBolsas = 0;
  numLibros = 0;
  numBotellas = 0;
  numCamisetas = 0;
  numJugetes = 0;
  numPendrives = 0;
  all = 0;


  constructor(private premioService: PremiosService, private premio: Premio) {

  }


  ngOnInit(): void {
    AOS.init();

    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        this.premios.push(premio);
      }

      this.all = this.premios.filter(element => {
        return element.categoria;
      }).length;

      this.numTazas = this.premios.filter(element => {
        return element.categoria === 1;
      }).length;

      this.numBolsas = this.premios.filter(element => {
        return element.categoria === 2;
      }).length;

      this.numLibros = this.premios.filter(element => {
        return element.categoria === 3;
      }).length;

      this.numBotellas = this.premios.filter(element => {
        return element.categoria === 4;
      }).length;

      this.numCamisetas = this.premios.filter(element => {
        return element.categoria === 5;
      }).length;

      this.numJugetes = this.premios.filter(element => {
        return element.categoria === 6;
      }).length;

      this.numPendrives = this.premios.filter(element => {
        return element.categoria === 7;
      }).length;
    });
  }

  private getPremios() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        this.premios.push(premio);
      }
    });
    return this.premios;
  }

  todas() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        this.premios.push(premio);
      }
    });
  }


  filterTazas() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        if (premio.categoria == 1) {
          this.premios.push(premio);
        }
      }
    });
  }

  filterBolsas() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        if (premio.categoria == 2) {
          this.premios.push(premio);
        }
      }
    });
  }


  filterLibros() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        if (premio.categoria == 3) {
          this.premios.push(premio);
        }
      }
    });
  }

  filterBotellas() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        if (premio.categoria == 4) {
          this.premios.push(premio);
        }
      }
    });
  }

  filterCamisetas() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        if (premio.categoria == 5) {
          this.premios.push(premio);
        }
      }
    });
  }

  filterJuguetes() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        if (premio.categoria == 6) {
          this.premios.push(premio);
        }
      }
    });
  }

  filterPendrives() {
    this.premios = [];
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      for (const premio of data) {
        if (premio.categoria == 7) {
          this.premios.push(premio);
        }
      }
    });
  }
}



