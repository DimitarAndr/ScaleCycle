import {Component, OnInit} from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';

declare var $: any;


@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})


export class PremiosComponent implements OnInit {


  ngOnInit(): void {
    AOS.init();
  }

}

$(document).ready(function () {
  let $grid = $('.grid').isotope({
    itemSelector: '.grid-item'
  });

  $('.filters-button-group').on('click', 'button', function () {
    let filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    $grid.isotope({filter: filterValue});
  });
  // change is-checked class on buttons
  $('.button-group').each(function (i, buttonGroup) {
    let $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });
});
