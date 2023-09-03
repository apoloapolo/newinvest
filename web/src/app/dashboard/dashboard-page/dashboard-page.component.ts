import { DashboardService } from './../dashboard.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import News from 'src/app/shared/models/news-model';
import Simulation from 'src/app/shared/models/simulation-model';
import Stock from 'src/app/shared/models/stock-model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})

export class DashboardPageComponent implements OnInit {
  viewStocks: boolean = true;
  viewSimulator: boolean;
  viewBlog: boolean;
  viewStocksManager: boolean;
  viewBlogManager: boolean;

  messageCreate: string;
  showMessageSimulator: boolean;

  isLoading: boolean;

  stocks: Stock[] = [];
  news: News[] = [];
  simulation: Simulation;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getTodayStocks();
  }

  changeView(value: string) {
    this.messageCreate = "";
    this.simulation = null;
    this.showMessageSimulator = false;
    if (value == "today") {
      this.viewStocks = true;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.getTodayStocks();
    }
    if (value == "all") {
      this.viewStocks = true;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.getAllStocks();
    }
    if (value == "simulator") {
      this.viewStocks = false;
      this.viewSimulator = true;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.getAllStocks();
    }
    if (value == "blog") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = true;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.getAllNews();
    }
    if (value == "stocksManager") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = true;
      this.viewBlogManager = false;
      this.getAllStocks();
    }
    if (value == "blogManager") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = true;
      this.getAllNews();
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

  createStock(name: string, price: string, variation: string, date: string) {
    this.isLoading = true;
    this.messageCreate = "Adicionando...";
    const stock = {
      id: null,
      name: name,
      price: parseFloat(price),
      variation: parseFloat(variation),
      date: date
    }
    const next = (): void => {
      this.messageCreate = "Ação adicionada com sucesso!";
      this.getAllStocks();
    }
    const error = (): void => {
      this.messageCreate = "Erro ao adicionar a ação.";
    }
    this.dashboardService.createStock(stock)
    .subscribe({next, error})
    .add(() => {
      this.isLoading = false;
    });
  }

  updateStock(id: number, name: string, price: string, variation: string, date: string) {
    this.isLoading = true;
    const stock = {
      id: id,
      name: name,
      price: parseFloat(price),
      variation: parseFloat(variation),
      date: date
    }
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
      this.isLoading = false;
    });
  }

  deleteStock(id: number) {
    this.isLoading = true;
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
      this.isLoading = false;
    });
  }

  getAllNews() {
    this.dashboardService.getAllNews().subscribe(
      news => {
        this.news = news as News[];
        console.log(this.news);
      }
    );
  }

  createNews(titulo: string, descricao: string) {
    this.isLoading = true;
    this.messageCreate = "Adicionando...";
    const news = {
      id: null,
      titulo: titulo,
      descricao: descricao
    }
    const next = (): void => {
      this.messageCreate = "Notícia adicionada com sucesso!";
      this.getAllNews();
    }
    const error = (): void => {
      this.messageCreate = "Erro ao adicionar a notícia.";
    }
    this.dashboardService.createNews(news)
    .subscribe({next, error})
    .add(() => {
      this.isLoading = false;
    });
  }

  updateNews(id: number, titulo: string, descricao: string) {
    this.isLoading = true;
    const news = {
      id: id,
      titulo: titulo,
      descricao: descricao
    }
    const next = (): void => {
      console.log("Notícia atualizada com sucesso!");
      this.getAllNews();
    }
    const error = (): void => {
      console.log("Erro ao atualizar a notícia.");
    }
    this.dashboardService.updateNews(id, news)
    .subscribe({next, error})
    .add(() => {
      this.isLoading = false;
    });
  }

  deleteNews(id: number) {
    this.isLoading = true;
    const next = (): void => {
      console.log("Notícia deletada com sucesso!");
      this.getAllNews();
    }
    const error = (): void => {
      console.log("Erro ao deletar notícia.");
    }
    this.dashboardService.deleteNews(id)
    .subscribe({next, error})
    .add(() => {
      this.isLoading = false;
    });
  }

  doSimulation(id: number, days: string) {
    this.isLoading = true;
    this.dashboardService.getSimulation(id, parseInt(days)).subscribe(
      simulation => {
        this.simulation = simulation as Simulation;
        console.log(this.simulation);
        this.showMessageSimulator = true;
      }
    );
    this.isLoading = false;
  }
}
