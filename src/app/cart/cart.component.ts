import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PremiosService} from '../service/premios.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  session: any = [['premios']];
  premiosCart = [];
  premioCart;
  enviarPremios = true;
  isValidPuntos = true;
  sum = 0;


  constructor(private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private premiosService: PremiosService) {
  }


  ngOnInit() {

    if (!this.session.premios || this.session.premios == null) {
      this.session.premios = [[]];
    }

    this.session = JSON.parse(sessionStorage.getItem('user'));
    for (let i = 0; i < this.session.premios.length; i++) {
      if (this.session.premios[0].length == 0) {
        i = 1;
      }
      this.premiosCart.push(this.session.premios[i]);
    }


    this.calcularSumTotal(this.premiosCart);

  }

  addOnePremioCart(premioCart) {
    this.premioCart = premioCart;
    if (this.premioCart[7] < this.premioCart[6]) {
      this.premioCart[7] += 1;

    } else {
      this.toastr.warning('No hay cantidad de ' + this.premioCart[2]);
    }

    this.saveToSessionStorage(premioCart);
    this.sum = this.calcularSumTotal(this.premiosCart);
  }

  remOnePremioCart(premioCart) {
    this.premioCart = premioCart;
    if (this.premioCart[7] > 0) {
      this.premioCart[7] -= 1;
    } else {
      this.premioCart[7] = 0;
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
    this.premiosCart.map(premio => this.premiosCart.find(premioCart => premioCart[0] === premio._id) || this.premiosCart);
    console.log(this.premiosCart);
    this.session.premios = this.premiosCart;
    sessionStorage.setItem('user', JSON.stringify(this.session));
  }

  calcularSumTotal(premiosCart) {
    this.sum = 0;
    this.premiosCart = premiosCart;
    this.premiosCart.forEach(premio => {
      this.sum += premio[5] * premio[7];
    });
    if (this.sum < this.session.puntos) {
      this.isValidPuntos = true;
      return this.sum;
    } else {
      this.toastr.warning('Puntos insuficientes');
      this.isValidPuntos = false;
      return this.sum;
    }

  }

  enviarPremio(premiosCart) {
    premiosCart.forEach(premio => {
      if (premio[6] - premio[7] > 0) {
        premio[6] = premio[6] - premio[7];
      } else {
        this.toastr.warning('No hay cantidad de ' + premio[2]);
        this.enviarPremios = false;
      }
    });
    if (this.enviarPremios) {
      this.premiosService.modificarPremios(premiosCart).subscribe(data => {
      }, () => {
        this.toastr.warning('Error intente de nuevo más tarde', 'Warning');
      }, () => {
        this.session.premios = [];
        sessionStorage.setItem('user', JSON.stringify(this.session));
        this.premiosCart = [];
        this.sum = 0;
        this.toastr.success('Su premio será enviado pronto!', 'Success');
      });
    }
  }
}


