import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EstacionService} from '../service/estacion.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  options: string[] = [];
  a = this.estacionService.getAllEstaciones().subscribe((data: any[]) => {
    for (const estacion of data) {
      this.options.push(estacion.barrio);
    }
  });
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();

  constructor(private estacionService: EstacionService) {
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
