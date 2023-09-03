import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Stock from '../shared/models/stock-model';
import { Observable } from 'rxjs';
import News from '../shared/models/news-model';
import Simulation from '../shared/models/simulation-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly stocksUrl = 'http://localhost:8080/stocks';
  readonly blogUrl = 'http://localhost:9090/noticias';
  readonly simulationUrl = 'http://localhost:1111/simulacao';

  constructor(private http: HttpClient) { }

  // Stocks
  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.stocksUrl}/stocks`);
  }

  getTodayStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.stocksUrl}/stocks/today`);
  }

  createStock(stock: Stock) {
    return this.http.post<Stock>(`${this.stocksUrl}/stocks`, stock);
  }

  updateStock(stock: Stock) {
    return this.http.put<Stock>(`${this.stocksUrl}/stocks`, stock);
  }

  deleteStock(id: number) {
    return this.http.delete<Stock>(`${this.stocksUrl}/stocks/${id}`);
  }

  // Blog (News)
  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>(`${this.blogUrl}`);
  }

  deleteNews(id: number) {
    return this.http.delete(`${this.blogUrl}/${id}`);
  }

  updateNews(id: number, news: News) {
    return this.http.put<News>(`${this.blogUrl}/${id}`, news);
  }

  createNews(news: News) {
    return this.http.post<News>(`${this.blogUrl}`, news);
  }

  getSimulation(id: number, days: number): Observable<Simulation> {
    return this.http.get<Simulation>(`${this.simulationUrl}/${id}/${days}`);
  }
}
