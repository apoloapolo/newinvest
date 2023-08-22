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
  viewStocks: boolean;
  viewSimulator: boolean;
  viewBlog: boolean;
  viewStocksManager: boolean;

  messageCreate: string;

  isChanging: boolean;

  @ViewChild('group') group;

  stocks: Stock[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngAfterViewInit(): void {
    this.changeView();
  }

  changeView() {
    this.messageCreate = "";
    if (this.group.value == "today") {
      this.viewStocks = true;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.getTodayStocks();
    }
    if (this.group.value == "all") {
      this.viewStocks = true;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.getAllStocks();
    }
    if (this.group.value == "simulator") {
      this.viewStocks = false;
      this.viewSimulator = true;
      this.viewBlog = false;
      this.viewStocksManager = false;
    }
    if (this.group.value == "blog") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = true;
      this.viewStocksManager = false;
    }
    if (this.group.value == "stocksManager") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = true;
      this.getAllStocks();
    }
  }

  print(stock: Stock) {
    console.log(stock.name)
  }

  getTodayStocks() {
    this.dashboardService.getTodayStocks().subscribe(
      stocks => {
        this.stocks = stocks as Stock[];
        console.log(this.stocks);
      }
    );
  }

  getAllStocks() {
    this.dashboardService.getAllStocks().subscribe(
      stocks => {
        this.stocks = stocks as Stock[];
        console.log(this.stocks);
      }
    );
  }

  createStock(name: string, price: string, variation: string, date: string) {
    this.isChanging = true;
    this.messageCreate = "Adicionando...";
    const stock = {
      id: null,
      name: name,
      price: parseFloat(price),
      variation: parseFloat(variation),
      date: date
    }
    console.log(stock);
    const next = (): void => {
      this.messageCreate = "Ação adicionada com sucesso!";
      // Arrumar um jeito de limpar o form
      this.getAllStocks();
    }
    const error = (): void => {
      this.messageCreate = "Erro ao adicionar a ação.";
    }
    this.dashboardService.createStock(stock)
    .subscribe({next, error})
    .add(() => {
      this.isChanging = false;
    });
  }

  updateStock(id: number, name: string, price: string, variation: string, date: string) {
    this.isChanging = true;
    const stock = {
      id: id,
      name: name,
      price: parseFloat(price),
      variation: parseFloat(variation),
      date: date
    }
    console.log(stock);
    const next = (): void => {
      console.log("Ação atualizada com sucesso!");
      this.getAllStocks();
    }
    const error = (): void => {
      console.log("Erro ao atualizar a ação.");
    }
    this.dashboardService.updateStock(stock)
    .subscribe({next, error})
    .add(() => {
      this.isChanging = false;
    });
  }

  deleteStock(id: number) {
    this.isChanging = true;
    const next = (): void => {
      console.log("Ação deletada com sucesso!");
      this.getAllStocks();
    }
    const error = (): void => {
      console.log("Erro ao deletar ação.");
    }
    this.dashboardService.deleteStock(id)
    .subscribe({next, error})
    .add(() => {
      this.isChanging = false;
    });
  }
}
