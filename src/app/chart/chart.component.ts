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
    {data: [65, 79, 80, 81, 56, 55, 49, 65, 73, 59, 82, 74], label: 'Plastico'},
    {data: [58, 58, 50, 65, 86, 57, 67, 45, 54, 32, 65, 70], label: 'Carton'},
    {data: [38, 18, 30, 16, 84, 42, 70, 48, 39, 65, 58, 72], label: 'Cristal'},
    {data: [48, 38, 82, 77, 46, 57, 60, 81, 73, 49, 67, 59], label: 'Metal'},
    {data: [78, 28, 20, 62, 74, 67, 45, 65, 78, 46, 71, 65], label: 'Aceite'},
    {data: [64, 32, 51, 47, 68, 47, 39, 48, 53, 39, 45, 58], label: 'Pilas'}
  ];


}
