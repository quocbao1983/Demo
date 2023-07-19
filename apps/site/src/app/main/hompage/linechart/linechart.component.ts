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
  SelechDate:any=this.ChooseDate[0]
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
      this.charts=data[0].Chart.sort((a:any,b:any)=> new Date(a.Ngayformat).getTime() - new Date(b.Ngayformat).getTime())            
      this.GetChart(7)
    });
  }
  ngOnInit(): void {}
  averageDistance(arr1:any, arr2:any) {
    var totalDistance = 0;
    var count = 0;
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        var distance = Math.abs(arr1[i] - arr2[j]);
        totalDistance += distance;
        count++;
      }
    }
    return totalDistance / count;
  }
  GetChart(data:any)
  { 
    this.listDay = []  
    const now = new Date()
    const begin = new Date(now.setDate(now.getDate()+1))
    for (let index = 0; index < data; index++) {
          begin.setDate(begin.getDate()-1);
          const day = this.datePipe.transform(new Date(begin), 'dd/MM/yyyy');
          this.listDay.unshift(day);
    } 

    this.listBan = this.charts
    .filter(v => this.listDay
    .includes(v.Ngay)).map(v => v.Buy);   
    this.listMua = this.charts
    .filter(v => this.listDay
    .includes(v.Ngay)).map(v => v.Sell);
    const listDay = this.listDay.map(date => date.split('/').slice(0, 2).join('/'));
    let average = this.averageDistance(this.listMua,this.listBan)
    let min = Math.min(...this.listMua, ...this.listBan)-average;
    let max = Math.max(...this.listMua, ...this.listBan)+average;
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
        stacked: false,
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
        enabled: false
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
        categories: listDay,
        title: {
          //text: this.trans['chart_donvitinh']
        },

      },
      yaxis: {
        title: {
          text: ""
          // text: "Temperature"
        },
        min: min,
        max: max
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        floating: false,
        offsetY: 0,
        offsetX: 20, 
      }
    };
  }
}
