import { DashboardService } from './../dashboard.service';
import { ViewChild, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import Stock from 'src/app/shared/models/stock-model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})

export class DashboardPageComponent implements AfterViewInit {
  @ViewChild('group') group;

  stocks: Stock[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngAfterViewInit(): void {
    this.group.value = "today";
    this.fetchStocks();
  }

  fetchStocks() {
    if (this.group.value == "today") {
      this.dashboardService.getTodayStocks().subscribe(
        stocks => {
          this.stocks = stocks as Stock[];
          console.log(this.stocks);
        }
       );
    } else {
      this.dashboardService.getAllStocks().subscribe(
        stocks => {
          this.stocks = stocks as Stock[];
          console.log(this.stocks);
        }
       );
    }
  }
}
