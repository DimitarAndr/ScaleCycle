import {Injectable} from '@angular/core';

@Injectable()
export class Globals {
  SERVER = 'http://localhost/M12';
  Key = "ScaleCycle";
  ScaleCycle = 'http://localhost:4200';
  PoinPlastic:number = 2;
  PoinPaperBoard:number = 1;
  PoinCrystal:number = 1;
  PoinMetal:number = 1;
  PoinOil:number = 5;
  PoinBattry:number = 5;
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
