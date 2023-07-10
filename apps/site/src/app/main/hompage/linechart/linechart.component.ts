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
  public chartOptions: Partial<any>;
  ChooseDate:any[]=[
    {id:1,Title:"7 Ngày",value:7},
    {id:2,Title:"30 Ngày",value:30},
  ]
  SelechDate:any={id:1,Title:"7 Ngày",value:7}
  constructor() {
    this.chartOptions = {
      // series: [
      //   {
      //     name: "Mua Vào",
      //     data: [28, 29, 33, 36, 32, 32, 33]
      //   },
      //   {
      //     name: "Bán Ra",
      //     data: [12, 11, 14, 18, 17, 13, 13]
      //   }
      // ],
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
        text: "Biểu Đồ Giá 7 ngày gần nhất",
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
      // xaxis: {
      //   categories: ["03/07", "04/07", "05/07", "06/07", "07/07", "08/07", "09/07"],
      //   title: {
      //     text: "Ngày"
      //   }
      // },
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
  ngOnInit(): void {
    this.chartOptions['series']= [
      {
        name: "Mua Vào",
        data: [28, 29, 33, 36, 32, 32, 33]
      },
      {
        name: "Bán Ra",
        data: [12, 11, 14, 18, 17, 13, 13]
      }
    ]
    this.chartOptions['xaxis']= {
      categories: ["03/07", "04/07", "05/07", "06/07", "07/07", "08/07", "09/07"],
      title: {
        text: "Ngày"
      }
    }
  }

  GetChart(data:any)
  {   
    if(data==7)
    {
      this.chartOptions['series']= [
        {
          name: "Mua Vào",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Bán Ra",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ]
      this.chartOptions['xaxis']= {
        categories: ["03/07", "04/07", "05/07", "06/07", "07/07", "08/07", "09/07"],
        title: {
          text: "7 Ngày"
        }
      }
    }
    else
    {
      this.chartOptions['series']= [
        {
          name: "Mua Vào",
          data: [28, 29, 33, 36, 32, 32, 33,28, 29, 33, 36, 32, 32, 33,28, 29, 33, 36, 32, 32, 33,28, 29, 33, 36, 32, 32, 33,65,75]
        },
        {
          name: "Bán Ra",
          data: [12, 11, 14, 18, 17, 13, 13,28, 29, 33, 36, 32, 32, 33,28, 29, 33, 36, 32, 32, 33,28, 29, 33, 36, 32, 32, 33,28, 29]
        }
      ]
      this.chartOptions['xaxis']= {
        categories: [
          "01/07", "02/07", "03/07", "04/07", "05/07", "06/07", "07/07", "08/07", "09/07","10/07",
          "11/07", "12/07", "13/07", "14/07", "15/07", "16/07", "17/07", "18/07", "19/07","20/07",
          "21/07", "22/07", "23/07", "24/07", "25/07", "26/07", "27/07", "28/07", "29/07","30/07",
        ],
        title: {
          text: "30 Ngày"
        }
      }
    }
  }
}
