import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  session = {};
  premios = [];

  constructor(private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {

    console.log(localStorage);
    /*
        this.session = JSON.parse(localStorage.getItem('premio'));
        console.log(this.session);

        this.premios = this.session;*/

  }

}
