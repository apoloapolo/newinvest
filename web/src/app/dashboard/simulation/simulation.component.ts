import { Component, OnInit } from '@angular/core';
import Simulation from 'src/app/shared/models/simulation-model';
import { DashboardService } from '../dashboard.service';
import Stock from 'src/app/shared/models/stock-model';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  simulation: Simulation;
  stocks: Stock[] = [];
  showMessageSimulator: boolean;
  isLoading: boolean;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getAllStocks();
  }

  getAllStocks() {
    this.dashboardService.getAllStocks().subscribe(
      stocks => {
        this.stocks = stocks as Stock[];
      }
    );
  }

  doSimulation(id: number, days: string) {
    this.isLoading = true;
    this.dashboardService.getSimulation(id, parseInt(days)).subscribe(
      simulation => {
        this.simulation = simulation as Simulation;
        this.showMessageSimulator = true;
      }
    );
    this.isLoading = false;
  }

}
