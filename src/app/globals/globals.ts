import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  SERVER: string = 'http://localhost/M12';
  ScaleCycle : string = "http://localhost:4200"
  
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