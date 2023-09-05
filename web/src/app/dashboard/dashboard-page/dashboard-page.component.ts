import { DashboardService } from './../dashboard.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import News from 'src/app/shared/models/news-model';
import Simulation from 'src/app/shared/models/simulation-model';
import Stock from 'src/app/shared/models/stock-model';
import User from 'src/app/shared/models/user-model';

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
  viewMinhaConta: boolean;
  viewDeletarConta: boolean;
  showMessageSimulator: boolean;
  isLoading: boolean;

  groupValue: string = "today";
  messageCreate: string;
  messageUpdateUser: string;

  stocks: Stock[] = [];
  news: News[] = [];
  simulation: Simulation;
  user: User;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
    ) {}

  ngOnInit(): void {
    if (localStorage.getItem("user") == null) {
      this.router.navigateByUrl('');
    } else {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.getTodayStocks();
    }
  }

  changeView(value: string) {
    this.messageCreate = "";
    this.messageUpdateUser = "";
    this.simulation = null;
    this.showMessageSimulator = false;
    if (value == "today") {
      this.viewStocks = true;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
      this.getTodayStocks();
    }
    if (value == "all") {
      this.viewStocks = true;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
      this.getAllStocks();
    }
    if (value == "simulator") {
      this.viewStocks = false;
      this.viewSimulator = true;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
      this.getAllStocks();
    }
    if (value == "blog") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = true;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
      this.getAllNews();
    }
    if (value == "stocksManager") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = true;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
      this.getAllStocks();
    }
    if (value == "blogManager") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = true;
      this.viewMinhaConta = false;
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
        this.showMessageSimulator = true;
      }
    );
    this.isLoading = false;
  }

  sair() {
    localStorage.removeItem("user");
    this.router.navigateByUrl('');
  }

  minhaConta() {
    this.messageUpdateUser = "";
    this.groupValue = null;
    this.viewDeletarConta = false;
    this.viewStocks = false;
    this.viewSimulator = false;
    this.viewBlog = false;
    this.viewStocksManager = false;
    this.viewBlogManager = false;
    this.viewMinhaConta = true;
  }

  updateUser(nome: string, email: string, senha: string) {
    this.isLoading = true;
    const user = {
      nome: nome,
      email: email,
      senha: senha,
      is_admin: this.user.is_admin
    }
    const next = (): void => {
      this.messageUpdateUser = "Dados atualizados com sucesso!";
    }
    const error = (): void => {
      this.messageUpdateUser = "Erro ao atualizar os dados.";
    }
    this.dashboardService.updateUser(this.user.id, user)
    .subscribe(
      user => {
        localStorage.setItem("user", JSON.stringify(user));
        this.user = user;
        this.messageUpdateUser = "Dados atualizados com sucesso!";
      },
      () => {
        this.messageUpdateUser = "Erro ao atualizar os dados.";
      }
    ).add(() => {
      this.isLoading = false;
    });
  }

  deleteUser(id: number) {
    this.isLoading = true;
    const next = (): void => {
      this.isLoading = false;
      this.sair();
    }
    const error = (): void => {
      this.messageUpdateUser = "Erro ao excluir a conta.";
      this.isLoading = false;
    }
    this.dashboardService.deleteUser(id)
    .subscribe({next, error})
  }
}
