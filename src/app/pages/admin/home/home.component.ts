import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExample2Data,
} from '../../../variables/charts';
import { BarangayDashboardService } from 'src/app/services/barangay-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AdminUsersService } from 'src/app/services/admin-users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cardNameVal: any = [
    {
      name: 'Total Crimes',
      value: 5,
    },
    {
      name: 'Total of Compliants',
      value: 10,
    },
    {
      name: 'Total of Users',
      value: 15,
    },
  ];

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  totalDashboardObj: any = {
    TotalOfCrimes: 0,
    TotalOfCompliant: 0,
    TotalOfUsers: 0,
  };

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  constructor(
    private barangayDashboardService: BarangayDashboardService,
    private adminUsersService: AdminUsersService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initialTotalDashboard();
    this.initialChart();
  }

  initialTotalDashboard() {
    this.spinner.show();

    this.barangayDashboardService.getTotalDashboardCount().subscribe(
      (res) => {
        let result: any = res;
        this.totalDashboardObj.TotalOfCrimes = result.TotalOfCrimes;
        this.totalDashboardObj.TotalOfCompliant = result.TotalOfCompliant;
        this.totalDashboardObj.TotalOfUsers = result.TotalOfUsers;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );
  }

  initialChart(): void {
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    let testing = [500, 20, 30, 22, 17, 29, 25, 20, 30, 22, 17, 100];
    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());
    this.adminUsersService.getTotalBarangayReportCount().subscribe(
      (res) => {
        let result: any = res;
        var ordersChart = new Chart(chartOrders, {
          type: 'bar',
          options: chartExample2.options,
          data: chartExample2Data(result),
        });
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data,
    });
  }
}
