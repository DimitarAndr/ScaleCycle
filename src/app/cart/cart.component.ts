import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


declare var $: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  session = {};
  premiosCart = [];
  premioCart;
  sum = 0;


  constructor(private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit() {
    this.session = JSON.parse(sessionStorage.getItem('user'));

    console.log(this.session);
    for (let i = 0; i < this.session.premios.length; i++) {
      if (this.premiosCart[0] == '') {
        i = 1;
      }
      this.premiosCart.push(this.session.premios[i]);
    }

    this.calcularSumTotal(this.premiosCart);

  }

  addOnePremioCart(premioCart) {
    this.premioCart = premioCart;
    if (this.premioCart[5] < this.premioCart[4]) {
      this.premioCart[5] += 1;

    } else {
      alert('No hay cantidad');
    }

    this.saveToSessionStorage(premioCart);
    this.sum = this.calcularSumTotal(this.premiosCart);
  }

  remOnePremioCart(premioCart) {
    this.premioCart = premioCart;
    if (this.premioCart[5] > 0) {
      this.premioCart[5] -= 1;
    } else {
      this.premioCart[5] = 0;
    }
    this.saveToSessionStorage(premioCart);
    this.sum = this.calcularSumTotal(this.premiosCart);
  }

  eliminarPremio(premioCart) {
    this.premioCart = premioCart;
    this.premiosCart = this.premiosCart.filter(premio => premio[0] != this.premioCart[0]);
    this.calcularSumTotal(this.premiosCart);
    this.session.premios = this.premiosCart;
    this.sum = this.calcularSumTotal(this.premiosCart);
    sessionStorage.setItem('user', JSON.stringify(this.session));
  }

  saveToSessionStorage(premioCart) {
    this.premiosCart.map(premio => this.premiosCart.find(premioCart => premioCart[0] === premio.id) || this.premiosCart);
    console.log(this.premiosCart);
    this.session.premios = this.premiosCart;
    sessionStorage.setItem('user', JSON.stringify(this.session));
  }

  calcularSumTotal(premiosCart) {
    this.sum = 0;
    this.premiosCart = premiosCart;
    this.premiosCart.forEach(premio => {
      this.sum += premio[3] * premio[5];
    });
    return this.sum;
  }

}


