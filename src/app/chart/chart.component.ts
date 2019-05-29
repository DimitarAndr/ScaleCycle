import {Component} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartType} from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  constructor() {
  }

  title = 'app';
  public barChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    {data: [65, 79, 80, 81, 56, 55, 40], label: 'Plastico'},
    {data: [58, 58, 50, 65, 86, 27, 90], label: 'Series B'},
    {data: [38, 18, 30, 16, 86, 27, 90], label: 'Series C'},
    {data: [78, 28, 20, 77, 86, 27, 90], label: 'Series D'}
  ];


}
