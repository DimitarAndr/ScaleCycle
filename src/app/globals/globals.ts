import {Injectable} from '@angular/core';

@Injectable()
export class Globals {
  SERVER = 'http://192.168.17.67/M12';
  Key = "ScaleCycle";
  ScaleCycle = 'http://localhost:4200';
  PoinPlastic = 2;
  PoinPaperBoard = 1;
  PoinCrystal = 1;
  PoinMetal = 1;
  PoinOil = 5;
  PoinBattry = 5;
}

/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globals',
  templateUrl: './globals.component.html',
  styleUrls: ['./globals.component.css']
})
export class GlobalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/
