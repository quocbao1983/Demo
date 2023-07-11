import { Component, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { ConfigService } from "../../../shared/config.service";
import { DatePipe } from "@angular/common";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  trans:any=JSON.parse(localStorage.getItem('Translate') || '{}');
  public chartOptions: Partial<any>;
  ChooseDate:any[]=[
    {id:1,Title:"7",value:7},
    {id:2,Title:"30",value:30},
  ]
  SelechDate:any={id:1,Title:"7",value:7}
  charts:any[]=[]
  listDay:any[]=[]
  listMua:any[]=[]
  listBan:any[]=[]
  constructor(
    private _ConfigService: ConfigService,
    private datePipe: DatePipe,
  ) {
    this.chartOptions={}
    this._ConfigService.getAll().subscribe((data)=>
    {
      this.charts=data[0].Chart
      this.GetChart(7)
    });
  }
  ngOnInit(): void {}
  GetChart(data:any)
  { 
    this.listDay = []  
    const now = new Date()
    for (let index = 0; index < data; index++) {
          now.setDate(now.getDate() - 1);
         const day = this.datePipe.transform(new Date(now), 'dd/MM/yyyy');
          this.listDay.push(day);
    } 
    this.listMua = this.charts
    .filter(v => this.listDay
    .includes(v.Ngay)).map(v => v.Buy);
    this.listBan = this.charts
    .filter(v => this.listDay
    .includes(v.Ngay)).map(v => v.Sell);

    this.chartOptions = {
      series: [
        {
          name: this.trans['chart_mua'],
          data: this.listBan
        },
        {
          name: this.trans['chart_ban'],
          data: this.listMua
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#008000", "#ff0000"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        // text: "Average High & Low Temperature",
        text: this.trans['chart_tieude_1']+data+this.trans['chart_tieude_2'],
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: this.listDay,
        title: {
          text: this.trans['chart_donvitinh']
        }
      },
      yaxis: {
        title: {
          text: ""
          // text: "Temperature"
        },
        min: 5,
        max: 40
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }
}
