import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/shared/models/user-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  viewStocks: boolean = true;
  viewSimulator: boolean;
  viewBlog: boolean;
  viewStocksManager: boolean;
  viewBlogManager: boolean;
  viewMinhaConta: boolean;
  viewDeletarConta: boolean;
  groupValue: string = "stocks";

  user: User;

  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") == null) {
      this.router.navigateByUrl('');
    } else {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }

  changeView(value: string) {
    if (value == "stocks") {
      this.viewStocks = true;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
    }
    if (value == "simulator") {
      this.viewStocks = false;
      this.viewSimulator = true;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
    }
    if (value == "blog") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = true;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
    }
    if (value == "stocksManager") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = true;
      this.viewBlogManager = false;
      this.viewMinhaConta = false;
    }
    if (value == "blogManager") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = true;
      this.viewMinhaConta = false;
    }
    if (value == "myAccount") {
      this.viewStocks = false;
      this.viewSimulator = false;
      this.viewBlog = false;
      this.viewStocksManager = false;
      this.viewBlogManager = false;
      this.viewMinhaConta = true;
    }
  }

  sair() {
    localStorage.removeItem("user");
    this.router.navigateByUrl('');
  }
}
