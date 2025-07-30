import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import Stock from 'src/app/shared/models/stock-model';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stocks: Stock[] = [];
  groupValue: string = "today";

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getTodayStocks();
  }

  changeView(value: string) {
    if (value == "today") {
      this.getTodayStocks();
    } else {
      this.getAllStocks();
    }
  }

  getTodayStocks() {
    this.dashboardService.getTodayStocks().subscribe(
      stocks => {
        this.stocks = stocks as Stock[];
      }
    );
  }

  getAllStocks() {
    this.dashboardService.getAllStocks().subscribe(
      stocks => {
        this.stocks = stocks as Stock[];
      }
    );
  }
}
