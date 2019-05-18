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

  premios: Premio[] = [];

  a = this.premioService.getAllPremios().subscribe((data: any[]) => {
    for (const premio of data) {
      console.log(data);
      this.premios.push(premio);
    }
  });

  constructor(private premioService: PremiosService) {

  }

  ngOnInit(): void {
    AOS.init();
  }

  filterLibros() {
    this.premios = this.premios.filter(element => {
      return element.categoria === 3;
    });
    console.log(this.premios);
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
