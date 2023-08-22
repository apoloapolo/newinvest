import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Stock from '../shared/models/stock-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly stocksUrl = 'http://localhost:8080/stocks';

  constructor(private http: HttpClient) { }

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
}
