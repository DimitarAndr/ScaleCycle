import {Component, OnInit} from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {PremiosService} from '../service/premios.service';
import {Premio} from '../model/Premio';

declare var $: any;


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


  constructor(private premioService: PremiosService) {

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

  private getPremios(): any {
    this.premioService.getAllPremios().subscribe((data: any[]) => {
      this.a = [];
      for (const premio of data) {
        this.a.push(premio);
      }
    });
    return this.a;
  }

  todas() {
    this.a = this.getPremios();
    this.premios = this.a.filter(element => {
      return element;
    });
  }


  filterTazas() {
    this.a = this.getPremios();
    this.premios = this.a.filter(element => {
      return element.categoria === 1;
    });
  }

  filterBolsas() {
    this.premios = this.getPremios();
    this.premios = this.premios.filter(element => {
      return element.categoria === 2;
    });
  }


  filterLibros() {
    this.premios = this.getPremios();
    this.premios = this.premios.filter(element => {
      return element.categoria === 3;
    });
  }

  filterBotellas() {
    this.premios = this.getPremios();
    this.premios = this.premios.filter(element => {
      return element.categoria === 4;
    });
  }

  filterCamisetas() {
    this.premios = this.getPremios();
    this.premios = this.premios.filter(element => {
      return element.categoria === 5;
    });
  }

  filterJuguetes() {
    this.premios = this.getPremios();
    this.premios = this.premios.filter(element => {
      return element.categoria === 6;
    });
  }

  filterPendrives() {
    this.premios = this.getPremios();
    this.premios = this.premios.filter(element => {
      return element.categoria === 7;
    });
  }
}

$(document).ready(function () {
  const $grid = $('.grid').isotope({
    itemSelector: '.grid-item'
  });

  $('.filters-button-group').on('click', 'button', function () {
    const filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    $grid.isotope({filter: filterValue});
  });
  // change is-checked class on buttons
  $('.button-group').each(function (i, buttonGroup) {
    const $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });
});


